
import { readConfig } from "../config";
import { createFeedFollow } from "../lib/db/queries/feedFollows";
import { getUserByName } from "../lib/db/queries/users";
import { getFeedByURL } from "../lib/db/queries/feeds";

export async function handlerFollow(cmdName: string, ...args: string[]): Promise<void> {
    const url = args[0];
    const cfg = await readConfig()
    if (cfg.currentUserName === null) {
        throw new Error("must be logged in to follow feed")
    }
    const user = await getUserByName(cfg.currentUserName);
    const feed = await getFeedByURL(url)
    const userId = user.id;
    const feedId = feed.id;
    if (!url) {
        throw new Error("please provide a valid url");
    }
    const feedFollow = await createFeedFollow(userId,feedId);

    console.log(`${feedFollow.users.name} is now following ${feedFollow.feeds.name}`)
}