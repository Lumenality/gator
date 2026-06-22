
import { createFeedFollow } from "../lib/db/queries/feedFollows";
import { getFeedByURL } from "../lib/db/queries/feeds";
import { User } from "../lib/db/schema";

export async function handlerFollow(cmdName: string, user: User, ...args: string[]): Promise<void> {
    const url = args[0];
    const feed = await getFeedByURL(url)
    const userId = user.id;
    const feedId = feed.id;
    if (!url) {
        throw new Error("please provide a valid url");
    }
    const feedFollow = await createFeedFollow(userId,feedId);

    console.log(`${feedFollow.users.name} is now following ${feedFollow.feeds.name}`);
}