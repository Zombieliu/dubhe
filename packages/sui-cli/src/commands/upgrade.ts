import type { CommandModule } from "yargs";
import { logError } from "../utils/errors";
import { upgradeHandler } from "../utils/upgradeHandler";
import { DubheConfig, loadConfig } from "@0xobelisk/sui-common";

type Options = {
  network: any;
  configPath: string;
};

const commandModule: CommandModule<Options, Options> = {
  command: "upgrade",

  describe: "Upgrade your move contracts",

  builder(yargs) {
    return yargs.options({
      network: {
        type: "string",
        choices: ["mainnet", "testnet", "devnet", "localnet"],
        desc: "Network of the node (mainnet/testnet/devnet/localnet)",
      },
      configPath: {
        type: "string",
        default: "dubhe.config.ts",
        decs: "Path to the config file",
      },
    });
  },

  async handler({ network, configPath }) {
    try {
      const dubheConfig = (await loadConfig(configPath)) as DubheConfig;
      await upgradeHandler(dubheConfig, dubheConfig.name, network);
    } catch (error: any) {
      logError(error);
      process.exit(1);
    }
    process.exit(0);
  },
};

export default commandModule;
