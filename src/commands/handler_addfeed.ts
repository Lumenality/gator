import { createFeed } from "../lib/db/queries/feeds";
import { createFeedFollow } from "../lib/db/queries/feedFollows";
import { User } from "../lib/db/schema";

export async function handlerAddFeed(cmdName: string, user: User, ...args: string[]): Promise<void> {
    const feedName = args[0];
    const feedUrl = args[1];
    const rssFeed = await createFeed(feedName, feedUrl, user.id);
    await createFeedFollow(user.id,rssFeed.id)

    //console.log(JSON.stringify(rssFeed, null, 2));
    console.log(`User ${user.name} added feed ${rssFeed.name}`)
}