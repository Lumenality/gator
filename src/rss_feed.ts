import { XMLParser } from "fast-xml-parser";

type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    item: RSSItem[];
  };
};

type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};
const DEFAULT_URL = "https://www.wagslane.dev/index.xml"; 

export async function fetchFeed(feedURL: string = DEFAULT_URL) {
    try {
        const response = await fetch(feedURL, {
            //credentials: "include",
            method: "GET",
            headers: {
                "User-Agent": "gator"
            }
        })

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const data = await response.text();        
        const parser = new XMLParser({
            processEntities: false,
        });
        
        let jObj = parser.parse(data);

        //console.log(jObj.rss.channel);
        if (!jObj.rss.channel) {
            throw new Error("no channel found in feed");
        }
        if (typeof jObj.rss.channel.title !== "string" ||
            typeof jObj.rss.channel.link !== "string" ||
            typeof jObj.rss.channel.description !== "string") {
            throw new Error("data corrupted")
        }

        const feed:RSSFeed = {
            "channel": {
                "title":jObj.rss.channel.title,
                "link": jObj.rss.channel.link,
                "description": jObj.rss.channel.description,
                "item": []
            }
        }
        const items:RSSItem[] = [];
        if (Array.isArray(jObj.rss.channel.item)) {
            for (let item of jObj.rss.channel.item) {
                let itemToPush:RSSItem = {
                    "title":item.title,
                    "link":item.link,
                    "description":item.description,
                    "pubDate":item.pubDate
                }
                if (!itemToPush.title || !itemToPush.title || !itemToPush.description || !itemToPush.pubDate) {
                    continue;
                }
                items.push(itemToPush);
            }
        } else {
            let itemToPush:RSSItem = {
                    "title":jObj.rss.channel.item.title,
                    "link":jObj.rss.channel.item.link,
                    "description":jObj.rss.channel.item.description,
                    "pubDate":jObj.rss.channel.item.pubDate
                }
                if (!itemToPush.title || !itemToPush.link || !itemToPush.description || !itemToPush.pubDate) {
                    throw new Error("no valid items in feed")
                }
                items.push(itemToPush);
        }

        feed.channel.item = items
        return feed;

    } catch (err:any) {
        console.error(err.message);
    }
}

//console.log(await fetchFeed(DEFAULT_URL));