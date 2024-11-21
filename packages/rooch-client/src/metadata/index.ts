import {
  getRoochNodeUrl,
  ModuleABIView,
  NetWorkType,
} from '@roochnetwork/rooch-sdk';
import { RoochInteractor } from '../libs/roochInteractor';

export async function loadMetadata(
  networkType: NetWorkType,
  packageId: string,
  modules: string[],
  fullnodeUrls?: string[]
): Promise<ModuleABIView[] | undefined> {
  // Init the rpc provider
  fullnodeUrls = fullnodeUrls ?? [getRoochNodeUrl(networkType)];
  const roochInteractor = new RoochInteractor(fullnodeUrls);
  if (packageId !== undefined) {
    const jsonData = await roochInteractor.getModuleAbis(packageId, modules);
    return jsonData;
  } else {
    console.error('please set your package id.');
  }
}
