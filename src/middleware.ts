import { readConfig } from "./config";
import { getUserByName } from "./lib/db/queries/users";
import { runCommand } from "./commands/commands";
import { UserCommandHandler,CommandHandler } from "./commands/commands";

export function middlewareLoggedIn(handler: UserCommandHandler): CommandHandler {
  return async (cmdName: string, ...args: string[]): Promise<void> => {
    // 1. read config to get current username
    const cfg = await readConfig();
    // 2. throw if no username
    if (!cfg.currentUserName) {
        throw new Error("must be logged in")
    }
    // 3. fetch user from db
    const user = await getUserByName(cfg.currentUserName);
    // 4. throw if user not found
    if (!user) {
        throw new Error("user with that name not found")
    }
    // 5. call handler(cmdName, user, ...args)
    await handler(cmdName,user,...args);
  };
}