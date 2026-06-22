import { getFeeds } from "../lib/db/queries/feeds";
import { getUserById } from "../lib/db/queries/users";


export async function handlerFeeds(cmdName: string, ...args: string[]): Promise<void> {
    const feeds = await getFeeds();
    if (feeds){
        for (let feed of feeds) {
            let creator = await getUserById(feed.userId);
            console.log(`* ${feed.name}
    URL: ${feed.url}
    Created by: ${creator ? creator.name : "creator not found (deleted?)"}`);

        }
    } else {
        throw new Error("no users found in db");

    }
}