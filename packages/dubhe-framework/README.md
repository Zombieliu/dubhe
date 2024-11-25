## Obelisk Framework

### Testnet
```txt
PackageID: 0x417ad1864a56a29ad0b5aaddd2e11bac1eeab6a68883ef53184a4cc5c293fec6                 
Version: 1                                                                                    
Digest: 82AxMudWanFzYGgDoQgiudzxadV1fygDaB2GUfqpqfRi                                        
Modules: dapp_metadata, dapps_schema, dapps_system, root_schema, root_system, storage_double_map, storage_map, storage_value

ObjectID: 0xeecb3a6cd374bae300aa731d57745a267e7f7c98a9ecd2f6646db4231d24bfec
ObjectType: 0x2::package::UpgradeCap

ObjectID: 0xf1b8d53c26b2de48d0a4729000e956318e7dcb1fbb32e8d9510a92445999047c
ObjectType: 0x417ad1864a56a29ad0b5aaddd2e11bac1eeab6a68883ef53184a4cc5c293fec6::root_schema::Root

ObjectID: 0x181befc40b3dafe2740b41d5a970e49bed2cca20205506ee6be2cfb73ff2d3e9
ObjectType: 0x417ad1864a56a29ad0b5aaddd2e11bac1eeab6a68883ef53184a4cc5c293fec6::dapps_schema::Dapps
```

```shell
# upgrade
sui client upgrade --gas-budget 1000000000 --upgrade-capability 0x9f4cd3e0aa5587b2d9191fa20ea877a0d66c6eb6a4f49ec34328122b29d1d9c6
```

