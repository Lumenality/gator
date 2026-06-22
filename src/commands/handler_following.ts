import { getFeedFollowsForUser } from "../lib/db/queries/feedFollows";
import { readConfig } from "../config";
import { getUserByName } from "../lib/db/queries/users";

export async function handlerFollowing(cmdName: string, ...args: string[]): Promise<void> {
    const cfg = await readConfig();
    if (!cfg.currentUserName){
        throw new Error("log in to see list of followed feeds");
    }
    const user = await getUserByName(cfg.currentUserName);
    const userId = user.id;
    const feedFollows = await getFeedFollowsForUser(userId);
    for (let feedFollow of feedFollows) {
        console.log(`* ${feedFollow.feedName}`);
    }
}