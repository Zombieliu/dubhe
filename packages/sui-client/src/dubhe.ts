import keccak256 from 'keccak256';
import { getFullnodeUrl } from '@mysten/sui/client';
import { Transaction, TransactionResult } from '@mysten/sui/transactions';
import { BcsType, SerializedBcs } from '@mysten/bcs';
import type { TransactionArgument } from '@mysten/sui/transactions';
import type {
  SuiTransactionBlockResponse,
  DevInspectResults,
  SuiMoveNormalizedModules,
  SuiMoveNormalizedType,
  SuiObjectData,
} from '@mysten/sui/client';
import { SuiAccountManager } from './libs/suiAccountManager';
import { SuiTx } from './libs/suiTxBuilder';
import { SuiInteractor } from './libs/suiInteractor';
import {
  MapObjectStruct,
  MoveStructType,
  DubheObjectContent,
  SuiDubheReturnType,
} from './types';
import { SuiContractFactory } from './libs/suiContractFactory';
import {
  SuiMoveMoudleFuncType,
  SuiMoveMoudleValueType,
} from './libs/suiContractFactory/types';
import {
  ContractQuery,
  ContractTx,
  DerivePathParams,
  FaucetNetworkType,
  MapMoudleFuncQuery,
  MapMoudleFuncTx,
  DubheParams,
  SuiTxArg,
  SuiObjectArg,
  SuiVecTxArg,
} from './types';
import { normalizeHexAddress, numberToAddressHex } from './utils';
import { bcs, fromHEX, toHEX } from '@mysten/bcs';
import { TypeTagSerializer } from '@mysten/sui/bcs';

// Check if a value is undefined
export function isUndefined(value?: unknown): value is undefined {
  return value === undefined;
}

// Add metadata to a function
export function withMeta<T extends { meta: SuiMoveMoudleFuncType }>(
  meta: SuiMoveMoudleFuncType,
  creator: Omit<T, 'meta'>
): T {
  (creator as T).meta = meta;
  return creator as T;
}

// Create a query function with metadata
function createQuery(
  meta: SuiMoveMoudleFuncType,
  fn: (
    tx: Transaction,
    params: (TransactionArgument | SerializedBcs<any>)[],
    typeArguments?: string[],
    isRaw?: boolean
  ) => Promise<DevInspectResults | TransactionResult>
): ContractQuery {
  return withMeta(
    meta,
    async (
      tx: Transaction,
      params: (TransactionArgument | SerializedBcs<any>)[],
      typeArguments?: string[],
      isRaw?: boolean
    ): Promise<DevInspectResults | TransactionResult> => {
      const result = await fn(tx, params, typeArguments, isRaw);
      return result;
    }
  );
}

// Create a transaction function with metadata
function createTx(
  meta: SuiMoveMoudleFuncType,
  fn: (
    tx: Transaction,
    params: (TransactionArgument | SerializedBcs<any>)[],
    typeArguments?: string[],
    isRaw?: boolean
  ) => Promise<SuiTransactionBlockResponse | TransactionResult>
): ContractTx {
  return withMeta(
    meta,
    async (
      tx: Transaction,
      params: (TransactionArgument | SerializedBcs<any>)[],
      typeArguments?: string[],
      isRaw?: boolean
    ): Promise<SuiTransactionBlockResponse | TransactionResult> => {
      return await fn(tx, params, typeArguments, isRaw);
    }
  );
}

/**
 * @class Dubhe
 * @description This class is used to aggregate the tools that used to interact with SUI network.
 */
export class Dubhe {
  public accountManager: SuiAccountManager;
  public suiInteractor: SuiInteractor;
  public contractFactory: SuiContractFactory;
  public packageId: string | undefined;
  public metadata: SuiMoveNormalizedModules | undefined;

  readonly #query: MapMoudleFuncQuery = {};
  readonly #tx: MapMoudleFuncTx = {};
  readonly #object: MapObjectStruct = {
    address: bcs.bytes(32).transform({
      input: (val: string) => fromHEX(val),
      output: (val) => toHEX(val),
    }),
    u8: bcs.u8(),
    u16: bcs.u16(),
    u32: bcs.u32(),
    u64: bcs.u64(),
    u128: bcs.u128(),
    u256: bcs.u256(),
    bool: bcs.bool(),
    '0x1::ascii::String': bcs.string(),
    '0x1::string::String': bcs.string(),
    '0x1::option::Option<address>': bcs.option(
      bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val) => toHEX(val),
      })
    ),
    '0x1::option::Option<u8>': bcs.option(bcs.u8()),
    '0x1::option::Option<u16>': bcs.option(bcs.u16()),
    '0x1::option::Option<u32>': bcs.option(bcs.u32()),
    '0x1::option::Option<u64>': bcs.option(bcs.u64()),
    '0x1::option::Option<u128>': bcs.option(bcs.u128()),
    '0x1::option::Option<u256>': bcs.option(bcs.u256()),
    '0x1::option::Option<bool>': bcs.option(bcs.bool()),
    'vector<address>': bcs.vector(
      bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val) => toHEX(val),
      })
    ),
    'vector<u8>': bcs.vector(bcs.u8()),
    'vector<u16>': bcs.vector(bcs.u16()),
    'vector<u32>': bcs.vector(bcs.u32()),
    'vector<u64>': bcs.vector(bcs.u64()),
    'vector<u128>': bcs.vector(bcs.u128()),
    'vector<u256>': bcs.vector(bcs.u256()),
    'vector<bool>': bcs.vector(bcs.bool()),
  };

  /**
   * Initialize the Dubhe client
   * @param {DubheParams} params - Configuration parameters
   */
  constructor({
    mnemonics,
    secretKey,
    networkType,
    fullnodeUrls,
    packageId,
    metadata,
  }: DubheParams = {}) {
    // Initialize account manager
    this.accountManager = new SuiAccountManager({ mnemonics, secretKey });
    // Initialize RPC provider
    fullnodeUrls = fullnodeUrls || [getFullnodeUrl(networkType ?? 'mainnet')];
    this.suiInteractor = new SuiInteractor(fullnodeUrls, networkType);

    this.packageId = packageId;
    if (metadata !== undefined) {
      this.metadata = metadata as SuiMoveNormalizedModules;

      const maxLoopNum = 5;
      let loopNum = 0;
      let stillNeedFormat = true;
      while (stillNeedFormat === true && loopNum <= maxLoopNum) {
        let loopFlag = false;
        Object.values(metadata as SuiMoveNormalizedModules).forEach(
          (moudlevalue) => {
            const data = moudlevalue as SuiMoveMoudleValueType;
            const moduleName = data.name;
            const objMoudleId = `${packageId}::${moduleName}`;

            Object.entries(data.structs).forEach(([objectName, objectType]) => {
              const objectId = `${objMoudleId}::${objectName}`;
              const bcsmeta: MoveStructType = {
                objectId,
                objectName,
                objectType,
              };
              let bcsObj = this.#bcs(bcsmeta);
              if (bcsObj.loopFlag === true) {
                loopFlag = bcsObj.loopFlag;
              }
            });

            Object.entries(data.exposedFunctions).forEach(
              ([funcName, funcvalue]) => {
                const meta = funcvalue as SuiMoveMoudleFuncType;
                meta.moduleName = moduleName;
                meta.funcName = funcName;
                if (isUndefined(this.#query[moduleName])) {
                  this.#query[moduleName] = {};
                }
                if (isUndefined(this.#query[moduleName][funcName])) {
                  this.#query[moduleName][funcName] = createQuery(
                    meta,
                    (tx, p, typeArguments, isRaw) =>
                      this.#read(meta, tx, p, typeArguments, isRaw)
                  );
                }

                if (isUndefined(this.#tx[moduleName])) {
                  this.#tx[moduleName] = {};
                }
                if (isUndefined(this.#tx[moduleName][funcName])) {
                  this.#tx[moduleName][funcName] = createTx(
                    meta,
                    (tx, p, typeArguments, isRaw) =>
                      this.#exec(meta, tx, p, typeArguments, isRaw)
                  );
                }
              }
            );
          }
        );

        stillNeedFormat = loopFlag;
        loopNum++;
      }
    }
    this.contractFactory = new SuiContractFactory({
      packageId,
      metadata,
    });
  }

  // Getters for query, tx, and object
  public get query(): MapMoudleFuncQuery {
    return this.#query;
  }

  public get tx(): MapMoudleFuncTx {
    return this.#tx;
  }

  public get object(): MapObjectStruct {
    return this.#object;
  }

  // Execute a transaction
  #exec = async (
    meta: SuiMoveMoudleFuncType,
    tx: Transaction,
    params: (TransactionArgument | SerializedBcs<any>)[],
    typeArguments?: string[],
    isRaw?: boolean
  ) => {
    if (isRaw === true) {
      return tx.moveCall({
        target: `${this.contractFactory.packageId}::${meta.moduleName}::${meta.funcName}`,
        arguments: params,
        typeArguments,
      });
    }

    tx.moveCall({
      target: `${this.contractFactory.packageId}::${meta.moduleName}::${meta.funcName}`,
      arguments: params,
      typeArguments,
    });
    return await this.signAndSendTxn(tx);
  };

  // Read data from the blockchain
  #read = async (
    meta: SuiMoveMoudleFuncType,
    tx: Transaction,
    params: (TransactionArgument | SerializedBcs<any>)[],
    typeArguments?: string[],
    isRaw?: boolean
  ) => {
    if (isRaw === true) {
      return tx.moveCall({
        target: `${this.contractFactory.packageId}::${meta.moduleName}::${meta.funcName}`,
        arguments: params,
        typeArguments,
      });
    }

    tx.moveCall({
      target: `${this.contractFactory.packageId}::${meta.moduleName}::${meta.funcName}`,
      arguments: params,
      typeArguments,
    });

    return await this.inspectTxn(tx);
  };

  // Create BCS (Binary Canonical Serialization) for a struct
  #bcs = (bcsmeta: MoveStructType) => {
    let loopFlag = false;
    const bcsJson: Record<string, BcsType<any, any>> = {};
    if (
      bcsmeta.objectId ===
      '0x9233ea7cd6abd1a2ea5e7a5a54d9eab96a8c704a682e6981413edcfdd3a6b389::assets_account::Account'
    ) {
      console.log('bcsmeta:', JSON.stringify(bcsmeta));
    }
    const registerType = (typeId: string, bcsType: BcsType<any, any>) => {
      this.#object[typeId] = bcsType;
      this.#object[`vector<${typeId}>`] = bcs.vector(bcsType);
      this.#object[`0x1::option::Option<${typeId}>`] = bcs.option(bcsType);
    };

    const handleStructType = (structType: any) => {
      if (
        structType.address === '0x1' &&
        structType.module === 'option' &&
        structType.name === 'Option'
      ) {
        const innerType = structType.typeArguments[0];
        if (typeof innerType === 'object' && 'Struct' in innerType) {
          const customType = `${innerType.Struct.address}::${innerType.Struct.module}::${innerType.Struct.name}`;
          return this.#object[`0x1::option::Option<${customType}>`];
        }
      }

      if (typeof structType === 'object' && 'Vector' in structType) {
        const innerType = structType.Vector;
        if (typeof innerType === 'object' && 'Struct' in innerType) {
          const customType = `${innerType.Struct.address}::${innerType.Struct.module}::${innerType.Struct.name}`;
          return this.#object[`vector<${customType}>`];
        }
      }

      if (typeof structType === 'object' && 'Struct' in structType) {
        const customType = `${structType.Struct.address}::${structType.Struct.module}::${structType.Struct.name}`;
        if (!this.#object[customType]) {
          loopFlag = true;
          return undefined;
        }
        return this.#object[customType];
      }

      return undefined;
    };

    Object.entries(bcsmeta.objectType.fields).forEach(([index, type]) => {
      const objName = type.name;
      const objType: SuiMoveNormalizedType = type.type;

      if (typeof objType === 'object') {
        const bcsType = handleStructType(objType);

        if (bcsType) {
          bcsJson[objName] = bcsType;
        }
      } else if (typeof objType === 'string') {
        switch (objType) {
          case 'U8':
            bcsJson[objName] = bcs.u8();
            break;
          case 'U16':
            bcsJson[objName] = bcs.u16();
            break;
          case 'U32':
            bcsJson[objName] = bcs.u32();
            break;
          case 'U64':
            bcsJson[objName] = bcs.u64();
            break;
          case 'U128':
            bcsJson[objName] = bcs.u128();
            break;
          case 'U256':
            bcsJson[objName] = bcs.u256();
            break;
          case 'Bool':
            bcsJson[objName] = bcs.bool();
            break;
          case 'Address':
            bcsJson[objName] = bcs.bytes(32).transform({
              input: (val: string) => fromHEX(val),
              output: (val) => toHEX(val),
            });
            break;
        }
      }
    });

    const structBcs = bcs.struct(bcsmeta.objectName, bcsJson);
    const structTypeId = bcsmeta.objectId;
    // console.log('Registering type:', structTypeId);

    registerType(structTypeId, structBcs);

    return {
      bcs: structBcs,
      loopFlag,
    };
  };

  // Parse and view the result of a dry run
  view(dryResult: DevInspectResults) {
    let returnValues = [];

    if (dryResult.effects.status.status === 'success') {
      const resultList = dryResult.results![0].returnValues!;

      for (const res of resultList) {
        let baseValue = res[0];
        let baseType = res[1];

        const value = Uint8Array.from(baseValue);
        returnValues.push(this.object[baseType].parse(value));
      }
      return returnValues;
    } else {
      return undefined;
    }
  }

  /**
   * Get the keypair for the given derive path params
   * @param derivePathParams - Derive path parameters
   * @returns The keypair
   */
  getKeypair(derivePathParams?: DerivePathParams) {
    return this.accountManager.getKeyPair(derivePathParams);
  }

  /**
   * Switch the current account with the given derive path params
   * @param derivePathParams - Derive path parameters
   */
  switchAccount(derivePathParams: DerivePathParams) {
    this.accountManager.switchAccount(derivePathParams);
  }

  /**
   * Get the address for the given derive path params
   * @param derivePathParams - Derive path parameters
   * @returns The address
   */
  getAddress(derivePathParams?: DerivePathParams) {
    return this.accountManager.getAddress(derivePathParams);
  }

  /**
   * Get the current address
   * @returns The current address
   */
  currentAddress() {
    return this.accountManager.currentAddress;
  }

  /**
   * Get the package ID
   * @returns The package ID
   */
  getPackageId() {
    return this.contractFactory.packageId;
  }

  /**
   * Get the metadata
   * @returns The metadata
   */
  getMetadata() {
    return this.contractFactory.metadata;
  }

  /**
   * Get the current network
   * @returns The current network
   */
  getNetwork() {
    return this.suiInteractor.network;
  }

  /**
   * Request some SUI from faucet
   * @param address - The address to receive SUI
   * @param network - The network type
   * @param derivePathParams - Derive path parameters
   * @returns {Promise<boolean>} True if the request is successful, false otherwise
   */
  async requestFaucet(
    address?: string,
    network?: FaucetNetworkType,
    derivePathParams?: DerivePathParams
  ) {
    if (address === undefined) {
      address = this.accountManager.getAddress(derivePathParams);
    }
    if (network === undefined) {
      network = this.getNetwork() as
        | FaucetNetworkType
        | 'devnet' as FaucetNetworkType;
    }
    return this.suiInteractor.requestFaucet(address, network);
  }

  /**
   * Get the balance for the current account
   * @param coinType - The coin type
   * @param derivePathParams - Derive path parameters
   * @returns The balance
   */
  async getBalance(coinType?: string, derivePathParams?: DerivePathParams) {
    const owner = this.accountManager.getAddress(derivePathParams);
    return this.suiInteractor.currentClient.getBalance({ owner, coinType });
  }

  /**
   * Get the balance for a specific account
   * @param accountAddress - The account address
   * @param coinType - The coin type
   * @param derivePathParams - Derive path parameters
   * @returns The balance
   */
  async balanceOf(
    accountAddress?: string,
    coinType?: string,
    derivePathParams?: DerivePathParams
  ) {
    if (accountAddress === undefined) {
      accountAddress = this.accountManager.getAddress(derivePathParams);
    }
    const owner = accountAddress;
    return this.suiInteractor.currentClient.getBalance({ owner, coinType });
  }

  /**
   * Get the current client
   * @returns The current client
   */
  client() {
    return this.suiInteractor.currentClient;
  }

  /**
   * Get an object by its ID
   * @param objectId - The object ID
   * @returns The object
   */
  async getObject(objectId: string) {
    return this.suiInteractor.getObject(objectId);
  }

  /**
   * Get multiple objects by their IDs
   * @param objectIds - The object IDs
   * @returns The objects
   */
  async getObjects(objectIds: string[]) {
    return this.suiInteractor.getObjects(objectIds);
  }

  /**
   * Sign a transaction
   * @param tx - The transaction to sign
   * @param derivePathParams - Derive path parameters
   * @returns The signed transaction
   */
  async signTxn(
    tx: Uint8Array | Transaction | SuiTx,
    derivePathParams?: DerivePathParams
  ) {
    if (tx instanceof SuiTx || tx instanceof Transaction) {
      tx.setSender(this.getAddress(derivePathParams));
    }
    const txBlock = tx instanceof SuiTx ? tx.tx : tx;
    const txBytes =
      txBlock instanceof Transaction
        ? await txBlock.build({ client: this.client() })
        : txBlock;
    const keyPair = this.getKeypair(derivePathParams);
    return await keyPair.signTransaction(txBytes);
  }

  /**
   * Sign and send a transaction
   * @param tx - The transaction to sign and send
   * @param derivePathParams - Derive path parameters
   * @returns The transaction response
   */
  async signAndSendTxn(
    tx: Uint8Array | Transaction | SuiTx,
    derivePathParams?: DerivePathParams
  ): Promise<SuiTransactionBlockResponse> {
    const { bytes, signature } = await this.signTxn(tx, derivePathParams);
    return this.suiInteractor.sendTx(bytes, signature);
  }

  /**
   * Send a transaction
   * @param transactionBlock - The transaction block
   * @param signature - The signature
   * @returns The transaction response
   */
  async sendTxn(
    transactionBlock: Uint8Array | string,
    signature: string | string[]
  ): Promise<SuiTransactionBlockResponse> {
    return this.suiInteractor.sendTx(transactionBlock, signature);
  }

  /**
   * Transfer SUI to a recipient
   * @param recipient - The recipient address
   * @param amount - The amount to transfer
   * @param derivePathParams - Derive path parameters
   * @returns The transaction response
   */
  async transferSui(
    recipient: string,
    amount: number,
    derivePathParams?: DerivePathParams
  ) {
    const tx = new SuiTx();
    tx.transferSui(recipient, amount);
    return this.signAndSendTxn(tx, derivePathParams);
  }

  /**
   * Transfer SUI to multiple recipients
   * @param recipients - The recipient addresses
   * @param amounts - The amounts to transfer to each recipient
   * @param derivePathParams - Derive path parameters
   * @returns The transaction response
   */
  async transferSuiToMany(
    recipients: string[],
    amounts: number[],
    derivePathParams?: DerivePathParams
  ) {
    const tx = new SuiTx();
    tx.transferSuiToMany(recipients, amounts);
    return this.signAndSendTxn(tx, derivePathParams);
  }

  /**
   * Transfer coins to multiple recipients
   * @param recipients - The recipient addresses
   * @param amounts - The amounts to transfer to each recipient
   * @param coinType - The coin type
   * @param derivePathParams - Derive path parameters
   * @returns The transaction response
   */
  async transferCoinToMany(
    recipients: string[],
    amounts: number[],
    coinType: string,
    derivePathParams?: DerivePathParams
  ) {
    const tx = new SuiTx();
    const owner = this.accountManager.getAddress(derivePathParams);
    const totalAmount = amounts.reduce((a, b) => a + b, 0);
    const coins = await this.suiInteractor.selectCoins(
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

  /**
   * Transfer coins to a single recipient
   * @param recipient - The recipient address
   * @param amount - The amount to transfer
   * @param coinType - The coin type
   * @param derivePathParams - Derive path parameters
   * @returns The transaction response
   */
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

  /**
   * Transfer objects to a recipient
   * @param objects - The objects to transfer
   * @param recipient - The recipient address
   * @param derivePathParams - Derive path parameters
   * @returns The transaction response
   */
  async transferObjects(
    objects: SuiObjectArg[],
    recipient: string,
    derivePathParams?: DerivePathParams
  ) {
    const tx = new SuiTx();
    tx.transferObjects(objects, recipient);
    return this.signAndSendTxn(tx, derivePathParams);
  }

  /**
   * Execute a Move call
   * @param callParams - The call parameters
   * @returns The transaction response
   */
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
    const tx = new SuiTx();
    tx.moveCall(target, args, typeArguments);
    return this.signAndSendTxn(tx, derivePathParams);
  }

  /**
   * Select coins with a given amount and coin type
   * @param amount - The amount
   * @param coinType - The coin type
   * @param owner - The owner address
   * @returns The selected coin object IDs
   */
  async selectCoinsWithAmount(
    amount: number,
    coinType: string,
    owner?: string
  ) {
    owner = owner || this.accountManager.currentAddress;
    const coins = await this.suiInteractor.selectCoins(owner, amount, coinType);
    return coins.map((c) => c.objectId);
  }

  /**
   * Select objects with a given type
   * @param objectType - The object type
   * @param owner - The owner address
   * @returns The selected object IDs
   */
  async selectObjectsWithType(objectType: string, owner?: string) {
    owner = owner || this.accountManager.currentAddress;
    const objects = await this.suiInteractor.selectObjects(owner, objectType);
    return objects.map((c) => c.objectId);
  }

  /**
   * Stake SUI to a validator
   * @param amount - The amount to stake
   * @param validatorAddr - The validator address
   * @param derivePathParams - Derive path parameters
   * @returns The transaction response
   */
  async stakeSui(
    amount: number,
    validatorAddr: string,
    derivePathParams?: DerivePathParams
  ) {
    const tx = new SuiTx();
    tx.stakeSui(amount, validatorAddr);
    return this.signAndSendTxn(tx, derivePathParams);
  }

  /**
   * Inspect a transaction without submitting it
   * @param tx - The transaction to inspect
   * @param derivePathParams - Derive path parameters
   * @returns The inspection results
   */
  async inspectTxn(
    tx: Uint8Array | Transaction | SuiTx,
    derivePathParams?: DerivePathParams
  ): Promise<DevInspectResults> {
    const txBlock = tx instanceof SuiTx ? tx.tx : tx;
    return this.suiInteractor.currentClient.devInspectTransactionBlock({
      transactionBlock: txBlock,
      sender: this.getAddress(derivePathParams),
    });
  }

  /**
   * Get a world object
   * @param worldObjectId - The world object ID
   * @returns The world object
   */
  async getWorld(worldObjectId: string) {
    return this.suiInteractor.getObject(worldObjectId);
  }

  /**
   * List schema names for a world
   * @param worldId - The world ID
   * @returns The list of schema names
   */
  async listSchemaNames(worldId: string) {
    const worldObject = await this.getObject(worldId);
    const newObjectContent = worldObject.content;
    if (newObjectContent != null) {
      const objectContent = newObjectContent as DubheObjectContent;
      const objectFields = objectContent.fields as Record<string, any>;
      return objectFields['schema_names'];
    } else {
      return [];
    }
  }

  /**
   * Get an entity from a world
   * @param worldId - The world ID
   * @param schemaName - The schema name
   * @param entityId - The entity ID (optional)
   * @returns The entity data
   */
  async getEntity(
    worldId: string,
    schemaName: string,
    entityId?: string
  ): Promise<any[] | undefined> {
    const schemaModuleName = `${schemaName}_schema`;
    const tx = new Transaction();
    const params = [tx.object(worldId)] as TransactionArgument[];

    if (entityId !== undefined) {
      params.push(tx.object(entityId));
    }

    const dryResult = (await this.query[schemaModuleName].get(
      tx,
      params
    )) as DevInspectResults;
    return this.view(dryResult);
  }

  /**
   * Check if an entity exists in a world
   * @param worldId - The world ID
   * @param schemaName - The schema name
   * @param entityId - The entity ID (optional)
   * @returns True if the entity exists, false otherwise
   */
  async containEntity(
    worldId: string,
    schemaName: string,
    entityId?: string
  ): Promise<boolean | undefined> {
    const schemaModuleName = `${schemaName}_schema`;
    const tx = new Transaction();
    const params = [tx.object(worldId)] as TransactionArgument[];

    if (entityId !== undefined) {
      params.push(tx.object(entityId));
    }

    const dryResult = (await this.query[schemaModuleName].contains(
      tx,
      params
    )) as DevInspectResults;

    return this.view(dryResult) as boolean | undefined;
  }

  async getOwnedObjects(owner: string, cursor?: string, limit?: number) {
    const ownedObjects = await this.suiInteractor.getOwnedObjects(
      owner,
      cursor,
      limit
    );
    const ownedObjectsRes: SuiObjectData[] = [];

    for (const object of ownedObjects.data) {
      const objectDetail = await this.getObject(object.data!.objectId);
      if (
        objectDetail.type!.split('::')[0] === this.contractFactory.packageId
      ) {
        ownedObjectsRes.push(objectDetail);
      }
    }

    return ownedObjectsRes;
  }

  async entity_key_from_object(objectId: string) {
    const checkObjectId = normalizeHexAddress(objectId);
    if (checkObjectId !== null) {
      objectId = checkObjectId;
      return objectId;
    } else {
      return undefined;
    }
  }

  async entity_key_from_bytes(bytes: Uint8Array | Buffer | string) {
    const hashBytes = keccak256(bytes);
    const hashU8Array: number[] = Array.from(hashBytes);
    const value = Uint8Array.from(hashU8Array);
    const Address = bcs.bytes(32).transform({
      // To change the input type, you need to provide a type definition for the input
      input: (val: string) => fromHEX(val),
      output: (val) => toHEX(val),
    });
    const data = Address.parse(value);
    return '0x' + data;
  }

  async entity_key_from_address_with_seed(objectId: string, seed: string) {
    const checkObjectId = normalizeHexAddress(objectId);
    if (checkObjectId !== null) {
      objectId = checkObjectId;
      const bytes = Buffer.from(objectId.slice(2), 'hex');
      const newBuffer = Buffer.concat([bytes, Buffer.from(seed, 'utf-8')]);
      return this.entity_key_from_bytes(newBuffer);
    } else {
      return undefined;
    }
  }

  async entity_key_from_address_with_u256(objectId: string, x: number) {
    const checkObjectId = normalizeHexAddress(objectId);
    if (checkObjectId !== null) {
      objectId = checkObjectId;
      const bytes = Buffer.from(objectId.slice(2), 'hex');

      const numberBytes = bcs.u256().serialize(x).toBytes();

      return this.entity_key_from_bytes(Buffer.concat([bytes, numberBytes]));
    } else {
      return undefined;
    }
  }

  async entity_key_from_u256(x: number) {
    return numberToAddressHex(x);
  }

  // async formatData(type: string, value: Buffer | number[] | Uint8Array) {
  //   const u8Value = Uint8Array.from(value);
  //   return bcs.de(type, u8Value);
  // }
}
