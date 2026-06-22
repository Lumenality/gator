import { db } from "..";
import { feeds } from "../schema";
import { eq } from "drizzle-orm";

export async function createFeed(name: string, url:string, userId:string) {
  const tryFeedName = await getFeedByName(name);
  if (tryFeedName) {
    throw new Error("feed already exists");
  }
  const [result] = await db.insert(feeds).values({ name: name, url: url, userId: userId }).returning();
  return result;
}

export async function getFeeds() {
    const result = await db.select().from(feeds);
    return result;
}

export async function getFeedById(id:string) {
    const [result] = await db.select()
        .from(feeds)
        .where(
            eq(feeds.id, id)
        )
        .limit(1);
    return result;
}
export async function getFeedByName(name:string) {
    const [result] = await db.select()
        .from(feeds)
        .where(
            eq(feeds.name, name)
        )
        .limit(1);
    return result;
}
export async function getFeedByURL(url:string) {
    const [result] = await db.select()
        .from(feeds)
        .where(
            eq(feeds.url, url)
        )
        .limit(1);
    return result;
}

export async function resetFeeds() {
    await db.delete(feeds);

}