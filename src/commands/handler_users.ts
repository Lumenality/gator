import { executionAsyncResource } from "node:async_hooks";
import { getUsers, resetUsers } from "../lib/db/queries/users";
import { readConfig } from "../config";

export async function handlerUsers(cmdName: string, ...args: string[]): Promise<void> {
    const users = await getUsers();
    const cfg = readConfig()
    if (users){
        for (let user of users) {
            console.log(`* ${user.name}${user.name === cfg.currentUserName ? ' (current)' : '' }`);
        }
    } else {
        throw new Error("no users found in db");
    }
}