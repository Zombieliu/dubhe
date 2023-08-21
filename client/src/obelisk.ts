import {
  RawSigner,
  TransactionBlock,
  DevInspectResults,
  SuiTransactionBlockResponse, JsonRpcProvider, testnetConnection,
  SuiMoveNormalizedModules, DynamicFieldPage, DynamicFieldName,
} from '@mysten/sui.js';
import { SuiAddress } from "@mysten/sui.js/src/types";
import { SuiAccountManager } from './libs/suiAccountManager';
import { SuiRpcProvider } from './libs/suiRpcProvider';
import { SuiTxBlock } from './libs/suiTxBuilder';
import { SuiContractFactory } from './libs/suiContractFactory';
import { SuiMoveMoudleValueType } from './libs/suiContractFactory/types';
import { ObeliskParams, DerivePathParams, SuiTxArg, SuiVecTxArg, ComponentContentType } from './types';
import * as fs from 'fs';
import {ObjectArg, obj, pure} from "./framework/util";

export function isUndefined (value?: unknown): value is undefined {
  return value === undefined;
}
type SuiTxArgument = {
  kind: "Input";
  index: number;
  type?: "object" | "pure" | undefined;
  value?: any;
} | {
  kind: "GasCoin";
} | {
  kind: "Result";
  index: number;
} | {
  kind: "NestedResult";
  index: number;
  resultIndex: number;
}
export interface AbiParam {
  name: string;
  type: string;
}

export interface AbiMessage {
  args: AbiParam[];
  docs: string[];
  // fromU8a: (data: Uint8Array) => DecodedMessage;
  identifier: string;
  index: number;
  isConstructor?: boolean;
  isDefault?: boolean;
  isMutating?: boolean;
  isPayable?: boolean;
  method: string;
  path: string[];
  returnType?: string | null;
  selector: string;
  toU8a: (params: SuiTxArgument[]) => Uint8Array;
}

export interface MessageMeta {
  readonly meta: AbiMessage;
}

type ContractOptions = {
    showEffects: boolean;
    showEvents: boolean;
    showObjectChanges: boolean
}

export interface ContractQuery extends MessageMeta {
  (moudleName: string, funcName: string, params: SuiTxArgument[]): DevInspectResults;
}

export interface ContractTx {
  (options: ContractOptions, ...params: SuiTxArgument[]): SuiTransactionBlockResponse;
}

export type MapMessageTx = Record<string, ContractTx>;

export type MapMessageQuery = Record<string, ContractQuery>;


export type MapMoudleFuncTx = Record<string, MapMessageTx>;
export type MapMoudleFuncTest = Record<string, Record<string, string>>;

export type MapMoudleFuncQuery = Record<string, MapMessageQuery>;


// export function withMeta <T> (creator: Omit<T, 'meta'>): T {
//   return creator as T;
// }


// function createQuery (fn: (moudleName: string, funcName: string, params: SuiTxArgument[]) => Promise<DevInspectResults>): ContractQuery {
//   return withMeta((moudleName: string, funcName: string, params: SuiTxArgument[]): Promise<DevInspectResults> =>
//     fn(moudleName, funcName, params)
//   );
// }


export function withMeta<T>(creator: Omit<T, 'meta'>): T {
  return creator as T;
}

function createQuery(
  fn: (moduleName: string, funcName: string, params: SuiTxArgument[]) => Promise<DevInspectResults>
): ContractQuery {
  return withMeta(async (moduleName: string, funcName: string, params: SuiTxArgument[]): Promise<DevInspectResults> => {
    return await fn(moduleName, funcName, params);
  });
}

/**
 * @class Obelisk
 * @description This class is used to aggregate the tools that used to interact with SUI network.
 */
export class Obelisk {
  public accountManager: SuiAccountManager;
  public rpcProvider: SuiRpcProvider;
  public contractFactory: SuiContractFactory;
  public packageId: string | undefined;
  // public needLoad: boolean | undefined;
  public metadata: SuiMoveNormalizedModules | undefined;
  public epsId: string;
  public componentsId: string;

  readonly #query: MapMoudleFuncQuery = {};
  readonly #tx: MapMoudleFuncTx = {};
  readonly #test: MapMoudleFuncTest = {};
  /**
   * Support the following ways to init the SuiToolkit:
   * 1. mnemonics
   * 2. secretKey (base64 or hex)
   * If none of them is provided, will generate a random mnemonics with 24 words.
   *
   * @param mnemonics, 12 or 24 mnemonics words, separated by space
   * @param secretKey, base64 or hex string, when mnemonics is provided, secretKey will be ignored
   * @param networkType, 'testnet' | 'mainnet' | 'devnet' | 'localnet', default is 'devnet'
   * @param fullnodeUrl, the fullnode url, default is the preconfig fullnode url for the given network type
   * @param faucetUrl, the faucet url, default is the preconfig faucet url for the given network type
   * @param packageId
   */
  constructor({
    mnemonics,
    secretKey,
    networkType,
    fullnodeUrl,
    faucetUrl,
    packageId,
    // needLoad,
  }: ObeliskParams = {}) {
    // Init the account manager
    this.accountManager = new SuiAccountManager({ mnemonics, secretKey });
    // Init the rpc provider
    this.rpcProvider = new SuiRpcProvider({
      fullnodeUrl,
      faucetUrl,
      networkType,
    });
    this.contractFactory = new SuiContractFactory({ 
      packageId: packageId, 
      metadata: undefined
    })

    this.epsId = "0xf2196f638c3174e18c0e31aa630a02fd516c2c5deec1ded72c0fea864c9f091a"
    this.componentsId = "0x3bc407eb543149e42846ade59ac2a3c901584af4339dc1ecd0affd090529545f"
    // this.packageId = packageId;
    // this.needLoad = needLoad;

    // this.init().then((metadata: any) => {
    //   this.metadata = metadata as SuiMoveNormalizedModules;
    // });
  }

  async initialize() {
    const metadata = await this.loadData();
    this.metadata = metadata as SuiMoveNormalizedModules;
    this.contractFactory = new SuiContractFactory({ 
      packageId: this.packageId, 
      metadata: this.metadata
    })
    
    console.log(this.metadata)
    console.log("-==============")
    Object.values(this.metadata as SuiMoveNormalizedModules).forEach(value => {
      let data = value as SuiMoveMoudleValueType;
      let moduleName = data.name;
      Object.entries(data.exposedFunctions).forEach(([funcName, value]) => {
          // Object.values(value.parameters).forEach(values => {
              // console.log(values)
              // console.log(`\t\targs: ${values}`)
              // if (isUndefined(this.#tx[moduleName])) {
              //   if (isUndefined(this.#tx[moduleName][funcName])) {
              //     this.#tx[moduleName][funcName] = createTx(this.metadata, (o, p) => this.#exec(this.metadata, o, p));
              //   }
              // }
              console.log(moduleName)
              console.log(funcName)
              // if (this.#query[moduleName] && this.#query[moduleName][funcName]) {

              //   if (isUndefined(this.#query[moduleName]) || isUndefined(this.#query[moduleName][funcName])) {
                  // this.#query[moduleName][funcName] = createQuery(async (p) => this.#read(moduleName, funcName, p));
                  // this.#query[moduleName] = 
                  //   {
                  //     funcName: createQuery((moduleName, funcName, p) => this.#read(moduleName, funcName, p))
                  //   }
                  console.log("-------- here")
                  console.log(moduleName, funcName);
                  // this.#query[moduleName][funcName] = () => this.#read(moduleName, funcName, p);
                  this.#test[moduleName][funcName] = "hello";
              //   }
              // }
          // })
      });
    });
  }

  public get query (): MapMoudleFuncQuery {
    return this.#query;
  }

  public get tx (): MapMoudleFuncTx {
    return this.#tx;
  }

  // #exec = (messageOrId: AbiMessage | string | number, { gasLimit = BN_ZERO, storageDepositLimit = null, value = BN_ZERO }: ContractOptions, params: unknown[]): SubmittableExtrinsic<ApiType> => {
  //   return this.api.tx.contracts.call(
  //     this.address,
  //     value,
  //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //     // @ts-ignore jiggle v1 weights, metadata points to latest
  //     this._isWeightV1
  //       ? convertWeight(gasLimit).v1Weight
  //       : convertWeight(gasLimit).v2Weight,
  //     storageDepositLimit,
  //     this.abi.findMessage(messageOrId).toU8a(params)
  //   ).withResultTransform((result: ISubmittableResult) =>
  //     // ContractEmitted is the current generation, ContractExecution is the previous generation
  //     new ContractSubmittableResult(result, applyOnEvent(result, ['ContractEmitted', 'ContractExecution'], (records: EventRecord[]) =>
  //       records
  //         .map(({ event: { data: [, data] } }): DecodedEvent | null => {
  //           try {
  //             return this.abi.decodeEvent(data as Bytes);
  //           } catch (error) {
  //             l.error(`Unable to decode contract event: ${(error as Error).message}`);

  //             return null;
  //           }
  //         })
  //         .filter((decoded): decoded is DecodedEvent => !!decoded)
  //     ))
  //   );
  // };
  


  #read = async (moudleName: string, funcName: string, params: SuiTxArgument[]) => {
    // #read = async (moudleName: string, funcName: string, params: SuiTxArgument[]) => {
    const tx = new TransactionBlock();

    tx.moveCall({
      // target: `0x12b216923e5454e1f076ccb5fc638b59f8aba2175c34df9899de71124d66badd::status_system::get_pet_state`,
      target: `${this.contractFactory.packageId}::${moudleName}::${funcName}`,
      arguments: params,
    })
    return await this.inspectTxn(tx);
  };
  /**
   * if derivePathParams is not provided or mnemonics is empty, it will return the currentSigner.
   * else:
   * it will generate signer from the mnemonic with the given derivePathParams.
   * @param derivePathParams, such as { accountIndex: 2, isExternal: false, addressIndex: 10 }, comply with the BIP44 standard
   */
  getSigner(derivePathParams?: DerivePathParams) {
    const keyPair = this.accountManager.getKeyPair(derivePathParams);
    return new RawSigner(keyPair, this.rpcProvider.provider);
  }

  /**
   * @description Switch the current account with the given derivePathParams
   * @param derivePathParams, such as { accountIndex: 2, isExternal: false, addressIndex: 10 }, comply with the BIP44 standard
   */
  switchAccount(derivePathParams: DerivePathParams) {
    this.accountManager.switchAccount(derivePathParams);
  }

  /**
   * @description Get the address of the account for the given derivePathParams
   * @param derivePathParams, such as { accountIndex: 2, isExternal: false, addressIndex: 10 }, comply with the BIP44 standard
   */
  getAddress(derivePathParams?: DerivePathParams) {
    return this.accountManager.getAddress(derivePathParams);
  }
  currentAddress() {
    return this.accountManager.currentAddress;
  }

  provider() {
    return this.rpcProvider.provider;
  }

  getPackageId() {
    return this.contractFactory.packageId;
  }

  getMetadata() {
    return this.contractFactory.metadata
  }
  /**
   * Request some SUI from faucet
   * @Returns {Promise<boolean>}, true if the request is successful, false otherwise.
   */
  async requestFaucet(derivePathParams?: DerivePathParams) {
    const addr = this.accountManager.getAddress(derivePathParams);
    return this.rpcProvider.requestFaucet(addr);
  }

  async getBalance(coinType?: string, derivePathParams?: DerivePathParams) {
    const owner = this.accountManager.getAddress(derivePathParams);
    return this.rpcProvider.getBalance(owner, coinType);
  }

  async getObject(objectId: string) {
    return this.rpcProvider.getObject(objectId);
  }

  async getObjects(objectIds: string[]) {
    return this.rpcProvider.getObjects(objectIds);
  }

  async signTxn(
    tx: Uint8Array | TransactionBlock | SuiTxBlock,
    derivePathParams?: DerivePathParams
  ) {
    tx = tx instanceof SuiTxBlock ? tx.txBlock : tx;
    const signer = this.getSigner(derivePathParams);
    return signer.signTransactionBlock({ transactionBlock: tx });
  }

  async signAndSendTxn(
    tx: Uint8Array | TransactionBlock | SuiTxBlock,
    derivePathParams?: DerivePathParams
  ): Promise<SuiTransactionBlockResponse> {
    tx = tx instanceof SuiTxBlock ? tx.txBlock : tx;
    const signer = this.getSigner(derivePathParams);
    return signer.signAndExecuteTransactionBlock({
      transactionBlock: tx,
      options: {
        showEffects: true,
        showEvents: true,
        showObjectChanges: true,
      },
    });
  }

  /**
   * Transfer the given amount of SUI to the recipient
   * @param recipient
   * @param amount
   * @param derivePathParams
   */
  async transferSui(
    recipient: string,
    amount: number,
    derivePathParams?: DerivePathParams
  ) {
    const tx = new SuiTxBlock();
    tx.transferSui(recipient, amount);
    return this.signAndSendTxn(tx, derivePathParams);
  }

  /**
   * Transfer to mutliple recipients
   * @param recipients the recipients addresses
   * @param amounts the amounts of SUI to transfer to each recipient, the length of amounts should be the same as the length of recipients
   * @param derivePathParams
   */
  async transferSuiToMany(
    recipients: string[],
    amounts: number[],
    derivePathParams?: DerivePathParams
  ) {
    const tx = new SuiTxBlock();
    tx.transferSuiToMany(recipients, amounts);
    return this.signAndSendTxn(tx, derivePathParams);
  }

  /**
   * Transfer the given amounts of coin to multiple recipients
   * @param recipients the list of recipient address
   * @param amounts the amounts to transfer for each recipient
   * @param coinType any custom coin type but not SUI
   * @param derivePathParams the derive path params for the current signer
   */
  async transferCoinToMany(
    recipients: string[],
    amounts: number[],
    coinType: string,
    derivePathParams?: DerivePathParams
  ) {
    const tx = new SuiTxBlock();
    const owner = this.accountManager.getAddress(derivePathParams);
    const totalAmount = amounts.reduce((a, b) => a + b, 0);
    const coins = await this.rpcProvider.selectCoins(
      owner,
      totalAmount,
      coinType
    );
    tx.transferCoinToMany(
      coins.map((c) => c.objectId),
      owner,
      recipients,
      amounts
    );
    return this.signAndSendTxn(tx, derivePathParams);
  }

  async transferCoin(
    recipient: string,
    amount: number,
    coinType: string,
    derivePathParams?: DerivePathParams
  ) {
    return this.transferCoinToMany(
      [recipient],
      [amount],
      coinType,
      derivePathParams
    );
  }

  async transferObjects(
    objects: string[],
    recipient: string,
    derivePathParams?: DerivePathParams
  ) {
    const tx = new SuiTxBlock();
    tx.transferObjects(objects, recipient);
    return this.signAndSendTxn(tx, derivePathParams);
  }

  async moveCall(callParams: {
    target: string;
    arguments?: (SuiTxArg | SuiVecTxArg)[];
    typeArguments?: string[];
    derivePathParams?: DerivePathParams;
  }) {
    const {
      target,
      arguments: args = [],
      typeArguments = [],
      derivePathParams,
    } = callParams;
    const tx = new SuiTxBlock();
    tx.moveCall(target, args, typeArguments);
    return this.signAndSendTxn(tx, derivePathParams);
  }

  /**
   * Select coins with the given amount and coin type, the total amount is greater than or equal to the given amount
   * @param amount
   * @param coinType
   * @param owner
   */
  async selectCoinsWithAmount(
    amount: number,
    coinType: string,
    owner?: string
  ) {
    owner = owner || this.accountManager.currentAddress;
    const coins = await this.rpcProvider.selectCoins(owner, amount, coinType);
    return coins.map((c) => c.objectId);
  }

  /**
   * stake the given amount of SUI to the validator
   * @param amount the amount of SUI to stake
   * @param validatorAddr the validator address
   * @param derivePathParams the derive path params for the current signer
   */
  async stakeSui(
    amount: number,
    validatorAddr: string,
    derivePathParams?: DerivePathParams
  ) {
    const tx = new SuiTxBlock();
    tx.stakeSui(amount, validatorAddr);
    return this.signAndSendTxn(tx, derivePathParams);
  }

  /**
   * Execute the transaction with on-chain data but without really submitting. Useful for querying the effects of a transaction.
   * Since the transaction is not submitted, its gas cost is not charged.
   * @param tx the transaction to execute
   * @param derivePathParams the derive path params
   * @returns the effects and events of the transaction, such as object changes, gas cost, event emitted.
   */
  async inspectTxn(
    tx: Uint8Array | TransactionBlock | SuiTxBlock,
    derivePathParams?: DerivePathParams
    // sender: string
  ): Promise<DevInspectResults> {
    
    tx = tx instanceof SuiTxBlock ? tx.txBlock : tx;
    console.log(this.getAddress(derivePathParams))
    return this.rpcProvider.provider.devInspectTransactionBlock({
      transactionBlock: tx,
      sender: this.getAddress(derivePathParams),
    });
  }

  async getBirthTime(objectId: string, derivePathParams?: DerivePathParams) {
    const tx = new TransactionBlock();

    tx.moveCall({
      // target: `0x12b216923e5454e1f076ccb5fc638b59f8aba2175c34df9899de71124d66badd::status_system::get_pet_state`,
      target: `0x6afbf113a5872b781a2a0068b95c0d9d0ee89428518fdd65f862c841eab45b82::pet_system::get_pet_basic_info`,
      arguments: [
        // tx.pure("0x6fa43c68221960f942572905f3c198a5bccaa0700506b3b6bd83dd9b007e6324"),
        // tx.pure("0xbf64721f0961a0426ccde6b8d9343e2cb2c26a105a5c33e57074580fd98b2cb1"),
        // tx.pure("0x6"),
        
        obj(tx, "0x26804211486be597a89c46c16b929d7031fb7c701ecf89d4c750e49459b4bea2"), 
        pure(tx, "0x35ba3bfb8590dbd060f41cd58c7b140d67efd2126648409cd231c74cff2828b8", `0x2::object::ID`), 
        obj(tx, "0x6")
      ],
    })
    return await this.inspectTxn(tx, derivePathParams);
  }

  async saveGenToml() {
    
  }


  async getWorld(worldObjectId: string) {
    return this.rpcProvider.getObject(worldObjectId)
  }

  async getAllEntities(worldId: string, cursor?: string, limit?: number) {
    const parentId = (await this.rpcProvider.getObject(worldId)).objectFields.entities.fields.id.id;
    return await this.rpcProvider.getDynamicFields(parentId, cursor, limit) as DynamicFieldPage;
  }

  async getEntity(worldId: string, entityId: string) {
    const parentId = (await this.rpcProvider.getObject(worldId)).objectFields.entities.fields.id.id;

    const name = {
      type: "0x2::object::ID",
      value: entityId
    } as DynamicFieldName
    return await this.rpcProvider.getDynamicFieldObject(parentId, name);
  }

  async getEntityComponents(worldId: string, entityId: string, cursor?: string, limit?: number) {
    const parentContent = (await this.getEntity(worldId, entityId)).data!.content as ComponentContentType;
    const parentId = parentContent.fields.value.fields.components.fields.id.id;
    return await this.rpcProvider.getDynamicFields(parentId, cursor, limit) as DynamicFieldPage;
  }

  async getEntityComponent(entityId: string, componentId: string) {
    const parentId = (await this.rpcProvider.getObject(entityId)).objectFields.id.id;

    const name = {
      type: "0x2::object::ID",
      value: componentId
    } as DynamicFieldName
    return await this.rpcProvider.getDynamicFieldObject(parentId, name);
  }


  async loadData() {
    const jsonFileName = `metadata/${this.contractFactory.packageId}.json`;

    try {
      const data = await fs.promises.readFile(jsonFileName, 'utf-8');
      const jsonData = JSON.parse(data);

      return jsonData as SuiMoveNormalizedModules;
    } catch (error) {
      if (this.contractFactory.packageId !== undefined) {
        const jsonData = await this.rpcProvider.getNormalizedMoveModulesByPackage(this.contractFactory.packageId);

        fs.writeFile(jsonFileName, JSON.stringify(jsonData, null, 2), (err) => {
          if (err) {
            console.error('写入文件时出错:', err);
          } else {
            console.log('JSON 数据已保存到文件:', jsonFileName);
          }
        });

        return jsonData as SuiMoveNormalizedModules;
      } else {
        console.error('please set your package id.');
      }
    }
  }
}