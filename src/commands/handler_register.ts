import { setUser } from "../config";
import { handlerLogin } from "./handler_login";
import { createUser } from "../lib/db/queries/users";

export async function handlerRegister(cmdName: string, ...args: string[]): Promise<void> {
    const name = args[0];
    if (!name) {
        
    };
    const createdUser = await createUser(name);
    if (!createdUser.name) {
        throw new Error("Expected a username");

    }
    setUser(name);
    console.log(`User has been set to ${name}`);
}