import type { CommandModule } from "yargs";
import { execSync } from "child_process";
import chalk from "chalk";
import { DubheConfig, loadConfig } from '@0xobelisk/sui-common';

type Options = {
  'config-path': string;
  'test'?: string;
};

const commandModule: CommandModule<Options, Options> = {
  command: "test",

  describe: "Run tests in Dubhe contracts",

  builder(yargs) {
    return yargs.options({
      'config-path': {
        type: "string",
        default: "dubhe.config.ts",
        description: "Options to pass to forge test",
      },
      test: {
        type: 'string',
        desc: 'Run a specific test',
      },
    });
  },

  async handler({ 'config-path': configPath, test }) {
    // Start an internal anvil process if no world address is provided
    try {
      console.log('🚀 Running move test');
      const dubheConfig = (await loadConfig(configPath)) as DubheConfig;
      const path = process.cwd();
      const projectPath = `${path}/contracts/${dubheConfig.name}`;
      const command = `sui move test --path ${projectPath} ${test ? ` --test ${test}` : ''}`;
      const output =  execSync(command, { encoding: "utf-8" });
      console.log(output);
    } catch (error: any) {
      console.error(chalk.red("Error executing sui move test:"));
      console.log(error.stdout);
      process.exit(0);
    }
  },
};

export default commandModule;
