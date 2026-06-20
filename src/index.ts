import { argv, exit } from 'node:process';

import { readConfig } from "./config";
import { handlerLogin } from "./commands/users.js"
import { registerCommand, runCommand } from "./commands/commands";
import { CommandsRegistry,CommandHandler } from "./commands/commands";

function main() {
  const commands:CommandsRegistry = {};
  registerCommand(commands,"login",handlerLogin)

  const input = process.argv.slice(2);
  if (!input) {
    console.error("faulty command");
    process.exit(1);
  }

  const command = input[0];
  const userName = input[1];

  runCommand(commands,command,userName);
}

main();