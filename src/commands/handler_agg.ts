import { resetUsers } from "../lib/db/queries/users";
import { fetchFeed } from "../rss_feed";

export async function handlerAgg(cmdName: string, ...args: string[]): Promise<void> {
    const rssFeed = await fetchFeed();
    console.log(JSON.stringify(rssFeed, null, 2));
}