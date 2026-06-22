
import { createFeedFollow, deleteFeedFollow } from "../lib/db/queries/feedFollows";
import { getFeedByURL } from "../lib/db/queries/feeds";
import { User } from "../lib/db/schema";

export async function handlerUnfollow(cmdName: string, user: User, ...args: string[]): Promise<void> {
    const url = args[0];
    const feed = await getFeedByURL(url)
    const feedId = feed.id;
    if (!url) {
        throw new Error("please provide a valid url");
    }
    await deleteFeedFollow(user.id,feedId);

    console.log(`${user.name} is no longer following following ${feed.name}`);
}