import { createFeed, getFeedByURL } from "../lib/db/queries/feeds";
import { readConfig } from "../config";
import { getUserByName } from "../lib/db/queries/users";
import { createFeedFollow } from "../lib/db/queries/feedFollows";

export async function handlerAddFeed(cmdName: string, ...args: string[]): Promise<void> {
    if (!args[0] || !args[1]) {
        throw new Error("please specify feed name and url")
    }
    const feedName = args[0];
    const feedUrl = args[1];
    
    const cfg = await readConfig();
    if (cfg.currentUserName === null) {
        throw new Error("you have to be logged in to add feed")
    }
    const currentUser = await getUserByName(cfg.currentUserName);
    const userId = currentUser.id;
    const rssFeed = await createFeed(feedName,feedUrl,userId);
    await createFeedFollow(userId,rssFeed.id)

    console.log(JSON.stringify(rssFeed, null, 2));
}