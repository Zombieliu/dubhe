import type { CommandModule } from 'yargs';
import { schemaGen, loadConfig, DubheConfig } from '@0xobelisk/sui-common';
import chalk from 'chalk';

type Options = {
	'config-path'?: string;
	network?: 'mainnet' | 'testnet' | 'devnet' | 'localnet';
};

const commandModule: CommandModule<Options, Options> = {
	command: 'schemagen',

	describe: 'Autogenerate Dubhe schemas based on the config file',

	builder: {
		'config-path': {
			type: 'string',
			default: 'dubhe.config.ts',
			desc: 'Path to the config file',
		},
		network: {
			type: 'string',
			choices: ['mainnet', 'testnet', 'devnet', 'localnet'] as const,
			desc: 'Node network (mainnet/testnet/devnet/localnet)',
		},
	},

	async handler({ 'config-path': configPath, network }) {
		try {
			const dubheConfig = (await loadConfig(configPath)) as DubheConfig;
			await schemaGen(dubheConfig, undefined, network);
			process.exit(0);
		} catch (error: any) {
			console.log(chalk.red('Schemagen failed!'));
			console.error(error.message);
		}
	},
};

export default commandModule;
