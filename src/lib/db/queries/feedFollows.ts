import { db } from "..";
import { feedFollows, feeds, users} from "../schema";
import { eq, and } from "drizzle-orm";

export async function createFeedFollow(userId:string, feedId:string) {
  const [newFeedFollow] = await db.insert(feedFollows)
    .values({
        userId: userId,
        feedId: feedId
    })
    .returning();

  const [result] = await db.select().from(feedFollows)
    .innerJoin(users, eq(users.id, feedFollows.userId))
    .innerJoin(feeds, eq(feeds.id, feedFollows.feedId))
    .where(eq(feedFollows.id, newFeedFollow.id))
  return result;

}
export async function getFeedFollowsForUser (userId:string) {
    const result = await db.select({
            id: feedFollows.id,
            createdAt: feedFollows.createdAt,
            updatedAt: feedFollows.updatedAt,
            userId: feedFollows.userId,
            feedId: feedFollows.feedId,
            feedName: feeds.name,
            userName: users.name
        })
        .from(feedFollows)
        .innerJoin(users, eq(users.id, feedFollows.userId))
        .innerJoin(feeds, eq(feeds.id, feedFollows.feedId))
        .where(
            eq(feedFollows.userId, userId)
        );
    return result;
}

// This will surely almost never get use
export async function getFeedFollowById(id:string) {
    const [result] = await db.select()
        .from(feedFollows)
        .where(
            eq(feedFollows.id, id)
        )
        .limit(1);
    return result;
}

export async function deleteFeedFollow(userId:string,feedId:string){
    await db.delete(feedFollows)
        .where(and(
            eq(feedFollows.userId, userId),
            eq(feedFollows.feedId, feedId)
        ));
}

export async function resetFeedFollows() {
    await db.delete(feedFollows);

}