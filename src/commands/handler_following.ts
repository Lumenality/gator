import { getFeedFollowsForUser } from "../lib/db/queries/feedFollows";
import { User } from "../lib/db/schema";

export async function handlerFollowing(cmdName: string, user: User, ...args: string[]): Promise<void> {
    const userId = user.id;
    const feedFollows = await getFeedFollowsForUser(userId);
    for (let feedFollow of feedFollows) {
        console.log(`* ${feedFollow.feedName}`);
    }
}