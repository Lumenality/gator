import { db } from "..";
import { users } from "../schema";
import { eq } from "drizzle-orm";

export async function createUser(name: string) {
  const tryUserName = await getUserByName(name);
  if (tryUserName) {
    throw new Error("user already exists");
  }
  const [result] = await db.insert(users).values({ name: name }).returning();
  return result;
}
export async function getUsers() {
    const result = await db.select().from(users);
    return result;
}

export async function getUserByName(name:string) {
    const [result] = await db.select()
        .from(users)
        .where(
            eq(users.name, name)
        )
        .limit(1);
    return result;
}

export async function resetUsers() {
    await db.delete(users);

}