import { resetUsers } from "../lib/db/queries/users";

export async function handlerReset(cmdName: string, ...args: string[]): Promise<void> {
    await resetUsers();
    console.log("users table has been reset");
}