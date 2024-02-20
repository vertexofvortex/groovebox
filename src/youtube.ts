import { google } from "googleapis";
import "dotenv/config";

class YouTubeAPIWrapper {
    // TODO: pass options to the class constructor
    youtube = google.youtube({
        version: "v3",
        auth: process.env.YOUTUBE_TOKEN
    });

    find = async (query: string) => {
        try {
            const response = await this.youtube.search.list({
                part: ["snippet"],
                q: query
            });

            if (response.data.items?.length == 0) return undefined;

            return response.data.items;
            
        } catch (error) {
            return undefined;
        }
    };

    findFirst = async (query: string) => {
        const result = await this.find(query);

        if (!result) {
            return undefined;
        }

        return result[0];
    };
}

const youtubeAPIWrapper = new YouTubeAPIWrapper();

export default youtubeAPIWrapper