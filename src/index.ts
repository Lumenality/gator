//import { argv, exit } from 'node:process';


import { registerCommand, runCommand } from "./commands/commands";
import { CommandsRegistry } from "./commands/commands";
import { middlewareLoggedIn } from "./middleware";
import { handlerLogin } from "./commands/handler_login.js"
import { handlerRegister } from './commands/handler_register';
import { handlerReset } from "./commands/handler_reset.js";
import { handlerUsers } from "./commands/handler_users.js";
import { handlerAgg } from "./commands/handler_agg.js";
import { handlerAddFeed } from "./commands/handler_addfeed.js";
import { handlerFeeds } from "./commands/handler_feeds.js";
import { handlerFollow } from "./commands/handler_follow.js";
import { handlerFollowing } from "./commands/handler_following.js";
import { handlerUnfollow } from "./commands/hander_unfollow";

async function main() {
  const commands:CommandsRegistry = {};
  // Registering all commands

  // No login required
  registerCommand(commands,"login",handlerLogin);
  registerCommand(commands,"register",handlerRegister);
  registerCommand(commands,"reset",handlerReset);
  registerCommand(commands,"users",handlerUsers);
  registerCommand(commands,"agg",handlerAgg);
  registerCommand(commands,"feeds",handlerFeeds);
  // Login required
  registerCommand(commands,"addfeed",middlewareLoggedIn(handlerAddFeed));
  registerCommand(commands,"follow",middlewareLoggedIn(handlerFollow));
  registerCommand(commands,"following",middlewareLoggedIn(handlerFollowing));
  registerCommand(commands,"unfollow",middlewareLoggedIn(handlerUnfollow));

  const input = process.argv.slice(2);
  if (!input) {
    console.error("faulty command");
    process.exit(1);
  }

  const commandName = input[0];
  const args = input.slice(1);
  await runCommand(commands,commandName,...args)

  process.exit(0);
}

main();