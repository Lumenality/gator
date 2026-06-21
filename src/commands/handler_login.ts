import { setUser } from "../config";
import { getUserByName } from "../lib/db/queries/users";

export async function handlerLogin(cmdName: string, ...args: string[]): Promise<void> {
    if (!args[0]) {
        throw new Error("Expected a username");
    }
    const userName = args[0];
    //const user = getUserByName(userName);
    if (!await getUserByName(userName)){
        throw new Error("invalid user name (non-registered user)");
    }
    setUser(userName);
    console.log(`User has been set to ${userName}`);
}