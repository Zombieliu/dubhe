import keccak256 from 'keccak256';
import { getFullnodeUrl } from '@mysten/sui/client';
import { Transaction, TransactionResult } from '@mysten/sui/transactions';
import { BcsType, fromHex, SerializedBcs, toHex } from '@mysten/bcs';
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
  // SuiTxArgument,
  SuiObjectArg,
  SuiVecTxArg,
} from './types';
import { normalizeHexAddress, numberToAddressHex } from './utils';
import { bcs, fromHEX, toHEX } from '@mysten/bcs';
import { ContractDataParsingError } from './errors';

export function isUndefined(value?: unknown): value is undefined {
  return value === undefined;
}

export function withMeta<T extends { meta: SuiMoveMoudleFuncType }>(
  meta: SuiMoveMoudleFuncType,
  creator: Omit<T, 'meta'>
): T {
  (creator as T).meta = meta;

  return creator as T;
}

function createQuery(
  meta: SuiMoveMoudleFuncType,
  fn: (
    tx: Transaction,
    params?: (TransactionArgument | SerializedBcs<any>)[],
    typeArguments?: string[],
    isRaw?: boolean
  ) => Promise<DevInspectResults | TransactionResult>
): ContractQuery {
  return withMeta(
    meta,
    async ({
      tx,
      params,
      typeArguments,
      isRaw,
    }: {
      tx: Transaction;
      params?: (TransactionArgument | SerializedBcs<any>)[];
      typeArguments?: string[];
      isRaw?: boolean;
    }): Promise<DevInspectResults | TransactionResult> => {
      const result = await fn(tx, params, typeArguments, isRaw);
      return result;
    }
  );
}

function createTx(
  meta: SuiMoveMoudleFuncType,
  fn: (
    tx: Transaction,
    params?: (TransactionArgument | SerializedBcs<any>)[],
    typeArguments?: string[],
    isRaw?: boolean
  ) => Promise<SuiTransactionBlockResponse | TransactionResult>
): ContractTx {
  return withMeta(
    meta,
    async ({
      tx,
      params,
      typeArguments,
      isRaw,
    }: {
      tx: Transaction;
      params?: (TransactionArgument | SerializedBcs<any>)[];
      typeArguments?: string[];
      isRaw?: boolean;
    }): Promise<SuiTransactionBlockResponse | TransactionResult> => {
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
      // To change the input type, you need to provide a type definition for the input
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
        // To change the input type, you need to provide a type definition for the input
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
    '0x1::option::Option<vector<address>>': bcs.option(
      bcs.vector(
        bcs.bytes(32).transform({
          // To change the input type, you need to provide a type definition for the input
          input: (val: string) => fromHex(val),
          output: (val) => toHex(val),
        })
      )
    ),
    '0x1::option::Option<vector<u8>>': bcs.option(bcs.vector(bcs.u8())),
    '0x1::option::Option<vector<u16>>': bcs.option(bcs.vector(bcs.u16())),
    '0x1::option::Option<vector<u32>>': bcs.option(bcs.vector(bcs.u32())),
    '0x1::option::Option<vector<u64>>': bcs.option(bcs.vector(bcs.u64())),
    '0x1::option::Option<vector<u128>>': bcs.option(bcs.vector(bcs.u128())),
    '0x1::option::Option<vector<u256>>': bcs.option(bcs.vector(bcs.u256())),
    '0x1::option::Option<vector<bool>>': bcs.option(bcs.vector(bcs.bool())),
    'vector<address>': bcs.vector(
      bcs.bytes(32).transform({
        // To change the input type, you need to provide a type definition for the input
        input: (val: string) => fromHex(val),
        output: (val) => toHex(val),
      })
    ),
    'vector<u8>': bcs.vector(bcs.u8()),
    'vector<u16>': bcs.vector(bcs.u16()),
    'vector<u32>': bcs.vector(bcs.u32()),
    'vector<u64>': bcs.vector(bcs.u64()),
    'vector<u128>': bcs.vector(bcs.u128()),
    'vector<u256>': bcs.vector(bcs.u256()),
    'vector<bool>': bcs.vector(bcs.bool()),
    'vector<vector<address>>': bcs.vector(
      bcs.vector(
        bcs.bytes(32).transform({
          // To change the input type, you need to provide a type definition for the input
          input: (val: string) => fromHex(val),
          output: (val) => toHex(val),
        })
      )
    ),
    'vector<vector<u8>>': bcs.vector(bcs.vector(bcs.u8())),
    'vector<vector<u16>>': bcs.vector(bcs.vector(bcs.u16())),
    'vector<vector<u32>>': bcs.vector(bcs.vector(bcs.u32())),
    'vector<vector<u64>>': bcs.vector(bcs.vector(bcs.u64())),
    'vector<vector<u128>>': bcs.vector(bcs.vector(bcs.u128())),
    'vector<vector<u256>>': bcs.vector(bcs.vector(bcs.u256())),
    'vector<vector<bool>>': bcs.vector(bcs.vector(bcs.bool())),
    '0x2::coin::Coin<T>': bcs.struct('Coin', {
      id: bcs.fixedArray(32, bcs.u8()).transform({
        input: (id: string) => fromHex(id),
        output: (id) => toHex(Uint8Array.from(id)),
      }),
      balance: bcs.struct('Balance', {
        value: bcs.u64(),
      }),
    }),
    '0x2::balance::Balance<T>': bcs.struct('Balance', {
      value: bcs.u64(),
    }),
  };

  /**
   * Support the following ways to init the DubheClient:
   * 1. mnemonics
   * 2. secretKey (base64 or hex)
   * If none of them is provided, will generate a random mnemonics with 24 words.
   *
   * @param mnemonics, 12 or 24 mnemonics words, separated by space
   * @param secretKey, base64 or hex string or bech32, when mnemonics is provided, secretKey will be ignored
   * @param networkType, 'testnet' | 'mainnet' | 'devnet' | 'localnet', default is 'devnet'
   * @param fullnodeUrl, the fullnode url, default is the preconfig fullnode url for the given network type
   * @param packageId
   */
  constructor({
    mnemonics,
    secretKey,
    networkType,
    fullnodeUrls,
    packageId,
    metadata,
  }: DubheParams = {}) {
    // Init the account manager
    this.accountManager = new SuiAccountManager({ mnemonics, secretKey });
    // Init the rpc provider
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
              // if (isUndefined(this.#object[objectId])) {
              let bcsObj = this.#bcs(bcsmeta);
              if (bcsObj.loopFlag === true) {
                loopFlag = bcsObj.loopFlag;
              }

              this.#object[objectId] = bcsObj.bcs;

              this.#object[`vector<${objectId}>`] = bcs.vector(bcsObj.bcs);
              this.#object[`0x1::option::Option<${objectId}>`] = bcs.option(
                bcsObj.bcs
              );
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

  public get query(): MapMoudleFuncQuery {
    return this.#query;
  }

  public get tx(): MapMoudleFuncTx {
    return this.#tx;
  }

  public get object(): MapObjectStruct {
    return this.#object;
  }

  #exec = async (
    meta: SuiMoveMoudleFuncType,
    tx: Transaction,
    params?: (TransactionArgument | SerializedBcs<any>)[],
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

  #read = async (
    meta: SuiMoveMoudleFuncType,
    tx: Transaction,
    params?: (TransactionArgument | SerializedBcs<any>)[],
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

  #bcs = (bcsmeta: MoveStructType) => {
    let loopFlag = false;
    const bcsJson: Record<string, BcsType<any, any>> = {};
    Object.entries(bcsmeta.objectType.fields).forEach(([index, type]) => {
      const objName = type.name;
      const objType: SuiMoveNormalizedType = type.type;
      switch (typeof objType) {
        case 'object':
          for (const [key, value] of Object.entries(objType)) {
            switch (key) {
              case 'Struct':
                const structType = value as {
                  address: string;
                  module: string;
                  name: string;
                  typeArguments: SuiMoveNormalizedType[];
                };
                if (
                  structType.address === '0x1' &&
                  structType.module === 'ascii' &&
                  structType.name === 'String'
                ) {
                  bcsJson[objName] = bcs.string();
                  return;
                } else if (
                  structType.address === '0x2' &&
                  structType.module === 'object' &&
                  structType.name === 'UID'
                ) {
                  bcsJson[objName] = bcs.fixedArray(32, bcs.u8()).transform({
                    input: (id: string) => fromHEX(id),
                    output: (id) => toHEX(Uint8Array.from(id)),
                  });
                  return;
                } else if (
                  structType.address === '0x2' &&
                  structType.module === 'object' &&
                  structType.name === 'ID'
                ) {
                  bcsJson[objName] = bcs.fixedArray(32, bcs.u8()).transform({
                    input: (id: string) => fromHEX(id),
                    output: (id) => toHEX(Uint8Array.from(id)),
                  });
                  return;
                } else if (
                  structType.address === '0x2' &&
                  structType.module === 'bag' &&
                  structType.name === 'Bag'
                ) {
                  bcsJson[objName] = bcs.fixedArray(32, bcs.u8()).transform({
                    input: (id: string) => fromHEX(id),
                    output: (id) => toHEX(Uint8Array.from(id)),
                  });
                  return;
                } else if (
                  structType.address === '0x1' &&
                  structType.module === 'option' &&
                  structType.name === 'Option'
                ) {
                  switch (structType.typeArguments[0]) {
                    case 'U8':
                      bcsJson[objName] = bcs.option(bcs.u8());
                      return;
                    case 'U16':
                      bcsJson[objName] = bcs.option(bcs.u16());
                      return;
                    case 'U32':
                      bcsJson[objName] = bcs.option(bcs.u32());
                      return;
                    case 'U64':
                      bcsJson[objName] = bcs.option(bcs.u64());
                      return;
                    case 'U128':
                      bcsJson[objName] = bcs.option(bcs.u128());
                      return;
                    case 'U256':
                      bcsJson[objName] = bcs.option(bcs.u256());
                      return;
                    case 'Bool':
                      bcsJson[objName] = bcs.option(bcs.bool());
                      return;
                    case 'Address':
                      bcsJson[objName] = bcs.option(
                        bcs.bytes(32).transform({
                          // To change the input type, you need to provide a type definition for the input
                          input: (val: string) => fromHEX(val),
                          output: (val) => toHEX(val),
                        })
                      );
                      return;
                    default:
                    // throw new Error('Unsupported type');
                  }
                } else {
                  if (
                    this.object[
                      `${structType.address}::${structType.module}::${structType.name}`
                    ] === undefined
                  ) {
                    loopFlag = true;
                  } else {
                    bcsJson[objName] =
                      this.object[
                        `${structType.address}::${structType.module}::${structType.name}`
                      ];
                    return;
                  }
                }
                return;
              case 'Vector':
                switch (value) {
                  case 'U8':
                    bcsJson[objName] = bcs.vector(bcs.u8());
                    return;
                  case 'U16':
                    bcsJson[objName] = bcs.vector(bcs.u16());
                    return;
                  case 'U32':
                    bcsJson[objName] = bcs.vector(bcs.u32());
                    return;
                  case 'U64':
                    bcsJson[objName] = bcs.vector(bcs.u64());
                    return;
                  case 'U128':
                    bcsJson[objName] = bcs.vector(bcs.u128());
                    return;
                  case 'U256':
                    bcsJson[objName] = bcs.vector(bcs.u256());
                    return;
                  case 'Bool':
                    bcsJson[objName] = bcs.vector(bcs.bool());
                    return;
                  case 'Address':
                    bcsJson[objName] = bcs.vector(
                      bcs.bytes(32).transform({
                        // To change the input type, you need to provide a type definition for the input
                        input: (val: string) => fromHEX(val),
                        output: (val) => toHEX(val),
                      })
                    );
                    return;
                  default:
                  // throw new Error('Unsupported type');
                }
              case 'TypeParameter':
                bcsJson[objName] = bcs.u128();
                return;
              // case 'Reference':

              // case 'MutableReference':

              default:
                throw new Error('Unsupported type');
            }
          }
          return;
        case 'string':
          switch (objType) {
            case 'U8':
              bcsJson[objName] = bcs.u8();
              return;
            case 'U16':
              bcsJson[objName] = bcs.u16();
              return;
            case 'U32':
              bcsJson[objName] = bcs.u32();
              return;
            case 'U64':
              bcsJson[objName] = bcs.u64();
              return;
            case 'U128':
              bcsJson[objName] = bcs.u128();
              return;
            case 'U256':
              bcsJson[objName] = bcs.u256();
              return;
            case 'Bool':
              bcsJson[objName] = bcs.bool();
              return;
            case 'Address':
              bcsJson[objName] = bcs.bytes(32).transform({
                // To change the input type, you need to provide a type definition for the input
                input: (val: string) => fromHEX(val),
                output: (val) => toHEX(val),
              });
              return;
            default:
              return;
          }
        default:
          throw new Error('Unsupported type');
      }
    });

    return {
      bcs: bcs.struct(bcsmeta.objectName, bcsJson),
      loopFlag,
    };
  };

  view(dryResult: DevInspectResults) {
    let returnValues = [];

    if (dryResult.effects.status.status === 'success') {
      const resultList = dryResult.results![0].returnValues!;

      for (const res of resultList) {
        let baseValue = res[0];
        let baseType = res[1];
        const value = Uint8Array.from(baseValue);

        const storageValueMatch = baseType.match(
          /^.*::storage_value::StorageValue<(.+)>$/
        );
        if (storageValueMatch) {
          const innerType = storageValueMatch[1];
          if (this.#object[innerType]) {
            const storageValueBcs = bcs.struct('StorageValue', {
              contents: bcs.vector(
                bcs.struct('Entry', {
                  value: this.#object[innerType],
                })
              ),
            });
            returnValues.push(storageValueBcs.parse(value));
            continue;
          }
        }

        const storageMapMatch = baseType.match(
          /^.*::storage_map::StorageMap<(.+)>$/
        );
        if (storageMapMatch) {
          const innerType = storageMapMatch[1];
          const [keyType, valueType] = innerType
            .split(',')
            .map((type) => type.trim());
          if (this.#object[keyType] && this.#object[valueType]) {
            const storageMapBcs = bcs.struct('StorageMap', {
              contents: bcs.vector(
                bcs.struct('Entry', {
                  key: this.#object[keyType],
                  value: this.#object[valueType],
                })
              ),
            });
            returnValues.push(storageMapBcs.parse(value));
            continue;
          }
        }

        const storageDoubleMapMatch = baseType.match(
          /^.*::storage_double_map::StorageDoubleMap<(.+)>$/
        );
        if (storageDoubleMapMatch) {
          const innerType = storageDoubleMapMatch[1];
          const [key1, key2, valueType] = innerType
            .split(',')
            .map((type) => type.trim());
          if (
            this.#object[key1] &&
            this.#object[key2] &&
            this.#object[valueType]
          ) {
            const storageDoubleMapBcs = bcs.struct('StorageDoubleMap', {
              contents: bcs.vector(
                bcs.struct('Entry', {
                  key1: this.#object[key1],
                  key2: this.#object[key2],
                  value: this.#object[valueType],
                })
              ),
            });
            returnValues.push(storageDoubleMapBcs.parse(value));
            continue;
          }
        }

        if (this.#object[baseType]) {
          returnValues.push(this.#object[baseType].parse(value));
          continue;
        }

        const genericMatch = baseType.match(/^([^<]+)<(.+)>$/);
        if (genericMatch) {
          const [_, genericBase, _genericParam] = genericMatch;
          const genericKey = `${genericBase}<T>`;

          if (this.#object[genericKey]) {
            returnValues.push(this.#object[genericKey].parse(value));
            continue;
          }
        }

        console.log(
          '\n\x1b[41m\x1b[37m ERROR \x1b[0m \x1b[31mUnsupported Type\x1b[0m'
        );
        console.log('\x1b[90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\x1b[0m');
        console.log(`\x1b[95m•\x1b[0m Type: \x1b[33m"${baseType}"\x1b[0m`);
        if (genericMatch) {
          console.log(
            `\x1b[95m•\x1b[0m Generic Base Type: \x1b[33m"${genericMatch[1]}<T>"\x1b[0m`
          );
        }
        console.log('\x1b[95m\n✨ Available Types:\x1b[0m');
        Object.keys(this.#object).forEach((type) => {
          console.log(`  \x1b[36m◆\x1b[0m ${type}`);
        });
        console.log('\n\x1b[34m💡 How to Add Custom Type:\x1b[0m');
        console.log(
          `  You can add custom type by extending the #object map in your code:`
        );
        console.log(
          `  \x1b[32mdubhe.object["${baseType}"] = bcs.struct("YourTypeName", {\n    field1: bcs.string(),\n    field2: bcs.u64(),\n    // ... other fields\n  });\x1b[0m`
        );
        console.log('\x1b[90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\x1b[0m\n');
        throw new Error(`Unsupported type: ${baseType}`);
      }
      return returnValues;
    } else {
      throw new ContractDataParsingError(dryResult);
    }
  }

  async state({
    schema,
    struct,
    objectId,
    storageType,
    params,
  }: {
    schema: string;
    struct: string;
    objectId: string;
    storageType: string; // 'StorageValue<V>' | 'StorageMap<K, V>' | 'StorageDoubleMap<K1, K2, V>'
    params: any[];
  }) {
    const tx = new Transaction();
    const moduleName = `${schema}_schema`;
    const functionName = `get_${struct}`;
    const schemaObject = tx.object(objectId);
    // Parse storage type
    const storageValueMatch = storageType.match(/^StorageValue<(.+)>$/);
    const storageMapMatch = storageType.match(/^StorageMap<(.+),\s*(.+)>$/);
    const storageDoubleMapMatch = storageType.match(
      /^StorageDoubleMap<(.+),\s*(.+),\s*(.+)>$/
    );

    let processedParams: (TransactionArgument | SerializedBcs<any>)[] = [
      schemaObject,
    ];

    if (storageValueMatch) {
      // StorageValue only needs the object ID
      if (params.length > 0) {
        console.warn(
          'StorageValue does not require additional parameters. Extra parameters will be ignored.'
        );
      }
    } else if (storageMapMatch) {
      // StorageMap needs one key
      if (params.length !== 1) {
        throw new Error('StorageMap requires exactly one key parameter');
      }
      const keyType = storageMapMatch[1].trim();
      processedParams.push(this.#processKeyParameter(tx, keyType, params[0]));
    } else if (storageDoubleMapMatch) {
      // StorageDoubleMap needs two keys
      if (params.length !== 2) {
        throw new Error('StorageDoubleMap requires exactly two key parameters');
      }
      const key1Type = storageDoubleMapMatch[1].trim();
      const key2Type = storageDoubleMapMatch[2].trim();
      processedParams.push(this.#processKeyParameter(tx, key1Type, params[0]));
      processedParams.push(this.#processKeyParameter(tx, key2Type, params[1]));
    } else {
      throw new Error(
        `Invalid storage type: ${storageType}. Must be StorageValue<V>, StorageMap<K,V>, or StorageDoubleMap<K1,K2,V>`
      );
    }
    const queryResponse = (await this.query[moduleName][functionName]({
      tx,
      params: processedParams,
    })) as DevInspectResults;
    return this.view(queryResponse);
  }

  #processKeyParameter(tx: Transaction, keyType: string, value: any) {
    // Handle basic types
    switch (keyType.toLowerCase()) {
      case 'u8':
        return tx.pure.u8(value);
      case 'u16':
        return tx.pure.u16(value);
      case 'u32':
        return tx.pure.u32(value);
      case 'u64':
        return tx.pure.u64(value);
      case 'u128':
        return tx.pure.u128(value);
      case 'u256':
        return tx.pure.u256(value);
      case 'bool':
        return tx.pure.bool(value);
      case 'address':
        return tx.pure.address(value);
      default:
        // Check if it's an object type
        if (keyType.includes('::')) {
          // Assuming it's an object ID if the type contains '::'
          return tx.object(value);
        }

        // If we reach here, the key type is not supported
        console.log(
          '\n\x1b[41m\x1b[37m ERROR \x1b[0m \x1b[31mUnsupported Key Type\x1b[0m'
        );
        console.log('\x1b[90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\x1b[0m');
        console.log(`\x1b[95m•\x1b[0m Type: \x1b[33m"${keyType}"\x1b[0m`);
        console.log('\x1b[95m•\x1b[0m Supported Types:\x1b[0m');
        console.log('  \x1b[36m◆\x1b[0m u8, u16, u32, u64, u128, u256');
        console.log('  \x1b[36m◆\x1b[0m bool');
        console.log('  \x1b[36m◆\x1b[0m address');
        console.log(
          '  \x1b[36m◆\x1b[0m object (format: package::module::type)'
        );
        console.log('\x1b[90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\x1b[0m\n');
        throw new Error(`Unsupported key type: ${keyType}`);
    }
  }

  /**
   * if derivePathParams is not provided or mnemonics is empty, it will return the keypair.
   * else:
   * it will generate signer from the mnemonic with the given derivePathParams.
   * @param derivePathParams, such as { accountIndex: 2, isExternal: false, addressIndex: 10 }, comply with the BIP44 standard
   */
  getKeypair(derivePathParams?: DerivePathParams) {
    return this.accountManager.getKeyPair(derivePathParams);
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

  getPackageId() {
    return this.contractFactory.packageId;
  }

  getMetadata() {
    return this.contractFactory.metadata;
  }

  getNetwork() {
    return this.suiInteractor.network;
  }
  /**
   * Request some SUI from faucet
   * @Returns {Promise<boolean>}, true if the request is successful, false otherwise.
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
    // const addr = this.accountManager.getAddress(derivePathParams);
    return this.suiInteractor.requestFaucet(address, network);
  }

  async getBalance(coinType?: string, derivePathParams?: DerivePathParams) {
    const owner = this.accountManager.getAddress(derivePathParams);
    return this.suiInteractor.currentClient.getBalance({ owner, coinType });
  }

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

  client() {
    return this.suiInteractor.currentClient;
  }

  async getObject(objectId: string) {
    return this.suiInteractor.getObject(objectId);
  }

  async getObjects(objectIds: string[]) {
    return this.suiInteractor.getObjects(objectIds);
  }

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

  async signAndSendTxn(
    tx: Uint8Array | Transaction | SuiTx,
    derivePathParams?: DerivePathParams
  ): Promise<SuiTransactionBlockResponse> {
    const { bytes, signature } = await this.signTxn(tx, derivePathParams);
    return this.suiInteractor.sendTx(bytes, signature);
  }

  async sendTxn(
    transactionBlock: Uint8Array | string,
    signature: string | string[]
  ): Promise<SuiTransactionBlockResponse> {
    return this.suiInteractor.sendTx(transactionBlock, signature);
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
    const tx = new SuiTx();
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
    const tx = new SuiTx();
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
    objects: SuiObjectArg[],
    recipient: string,
    derivePathParams?: DerivePathParams
  ) {
    const tx = new SuiTx();
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
    const tx = new SuiTx();
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
    const coins = await this.suiInteractor.selectCoins(owner, amount, coinType);
    return coins.map((c) => c.objectId);
  }

  async selectObjectsWithType(objectType: string, owner?: string) {
    owner = owner || this.accountManager.currentAddress;
    const objects = await this.suiInteractor.selectObjects(owner, objectType);
    return objects.map((c) => c.objectId);
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
    const tx = new SuiTx();
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
    tx: Uint8Array | Transaction | SuiTx,
    derivePathParams?: DerivePathParams
  ): Promise<DevInspectResults> {
    const txBlock = tx instanceof SuiTx ? tx.tx : tx;
    return this.suiInteractor.currentClient.devInspectTransactionBlock({
      transactionBlock: txBlock,
      sender: this.getAddress(derivePathParams),
    });
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
