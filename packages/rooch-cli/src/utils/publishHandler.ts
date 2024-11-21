import fs from 'fs';
import { execSync } from 'child_process';
import chalk from 'chalk';
import pkg from '@roochnetwork/rooch-sdk';

import { DubheCliError } from './errors';
import { saveContractData, validatePrivateKey } from './utils';
import { DubheConfig } from '@0xobelisk/sui-common';

const { getRoochNodeUrl, RoochClient, Secp256k1Keypair } = pkg;

export async function publishHandler(
	dubheConfig: DubheConfig,
	network: pkg.NetWorkType
) {
	const privateKey = process.env.PRIVATE_KEY;
	if (!privateKey)
		throw new DubheCliError(
			`Missing PRIVATE_KEY environment variable.
  Run 'echo "PRIVATE_KEY=YOUR_PRIVATE_KEY" > .env'
  in your contracts directory to use the default aptos private key.`
		);

	const privateKeyFormat = validatePrivateKey(privateKey);
	if (privateKeyFormat === false) {
		throw new DubheCliError(`Please check your privateKey.`);
	}

	const keypair = Secp256k1Keypair.fromSecretKey(privateKeyFormat);

	const client = new RoochClient({
		url: getRoochNodeUrl(network),
	});

	const path = process.cwd();
	let modulesInfo;
	let compileResult;

	let packageId = '';
	let version = 0;

	try {
		const output = execSync(
			`rooch move publish --sender-account ${keypair
				.getRoochAddress()
				.toHexAddress()} --json --path ${path}/contracts/${
				dubheConfig.name
			}`,
			{
				encoding: 'utf-8',
			}
		);
		const jsonOutput = JSON.parse(output);
		if (jsonOutput.execution_info.status.type !== 'executed') {
			throw new DubheCliError(`Publish failed: ${jsonOutput.error_info}`);
		}
		compileResult = jsonOutput.execution_info;
		modulesInfo = compileResult;

		packageId = keypair.getRoochAddress().toHexAddress();
		version = 1;
		const txHash = jsonOutput['execution_info']['tx_hash'];
		console.log(chalk.blue(`${dubheConfig.name} PackageId: ${packageId}`));
		saveContractData(dubheConfig.name, network, packageId, version);
		console.log(chalk.green(`Publish Transaction Digest: ${txHash}`));
	} catch (error: any) {
		console.error(chalk.red(`Failed to execute publish, please republish`));
		console.error(error.stdout);
		process.exit(1);
	}

	// try {
	// 	const packageMetadata = fs.readFileSync(
	// 		`${path}/contracts/${projectName}/build/${projectName}/package-metadata.bcs`
	// 	);

	// 	let modulesData: Module[] = [];
	// 	modulesInfo.forEach(value => {
	// 		const moduleName = value.split('::')[1];
	// 		const moduleData = fs.readFileSync(
	// 			`${path}/contracts/${projectName}/build/${projectName}/bytecode_modules/${moduleName}.mv`
	// 		);

	// 		modulesData.push(
	// 			new TxnBuilderTypes.Module(
	// 				new HexString(moduleData.toString('hex')).toUint8Array()
	// 			)
	// 		);
	// 	});

	// 	let txnHash = await client.publishPackage(
	// 		keypair,
	// 		new HexString(packageMetadata.toString('hex')).toUint8Array(),
	// 		modulesData as Seq<Module>
	// 	);
	// 	await client.waitForTransaction(txnHash, { checkSuccess: true }); // <:!:publish
	// } catch (error: any) {
	// 	console.error(error.message);
	// 	process.exit(1);
	// }

	// console.log('Executing the deployHook: ');
	// const delay = (ms: number) =>
	// 	new Promise(resolve => setTimeout(resolve, ms));
	// await delay(5000);

	// const payload: Types.EntryFunctionPayload = {
	// 	function: `${packageId}::deploy_hook::run`,
	// 	type_arguments: [],
	// 	arguments: [],
	// };

	// const deployHookRawTxn = await client.generateTransaction(
	// 	keypair.address(),
	// 	payload
	// );
	// const deployHookBcsTxn = AptosClient.generateBCSTransaction(
	// 	keypair,
	// 	deployHookRawTxn
	// );
	// try {
	// 	const deployTxnHash = await client.submitSignedBCSTransaction(
	// 		deployHookBcsTxn
	// 	);
	// 	console.log(
	// 		chalk.green(
	// 			`Successful auto-execution of deployHook, please check the transaction digest: ${deployTxnHash.hash}`
	// 		)
	// 	);
	// } catch (error: any) {
	// 	console.error(
	// 		chalk.red(
	// 			`Failed to execute deployHook, please republish or manually call deploy_hook::run`
	// 		)
	// 	);
	// 	console.error(error.message);
	// 	process.exit(1);
	// }
}
