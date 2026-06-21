//import { argv, exit } from 'node:process';

import { handlerLogin } from "./commands/handler_login.js"
import { registerCommand, runCommand } from "./commands/commands";
import { CommandsRegistry } from "./commands/commands";
import { handlerRegister } from './commands/handler_register';
import { handlerReset } from "./commands/handler_reset.js";
import { handlerUsers } from "./commands/handler_users.js";

async function main() {
  const commands:CommandsRegistry = {};
  // Registering all commands
  registerCommand(commands,"login",handlerLogin);
  registerCommand(commands,"register",handlerRegister);
  registerCommand(commands,"reset",handlerReset);
  registerCommand(commands,"users",handlerUsers);

  const input = process.argv.slice(2);
  if (!input) {
    console.error("faulty command");
    process.exit(1);
  }

  const command = input[0];
  const userName = input[1];

  await runCommand(commands,command,userName);
  process.exit(0);
}

main();