import { setUser } from "src/config";

export function handlerLogin(cmdName: string, ...args: string[]) {
    if (!args[0]) {
        throw new Error("Expected a username");
    }
    setUser(args[0]);
    console.log(`User has been set to ${args[0]}`);
}