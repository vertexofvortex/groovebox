import { google } from "googleapis";
import "dotenv/config";
import ytdl from "ytdl-core";
import { GrooveboxAudioResource } from "./player";
import { Readable } from "stream";
import logger from "./logger";

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

    fetchAudioResource = async (resource: GrooveboxAudioResource): Promise<Readable | undefined> => {
        /* TODO: get rid of ytdl because it sometimes randomly
        throws "AudioPlayerError: aborted" exception: 
        https://github.com/discordjs/voice/issues/202 */
        try {
            const track = ytdl(resource.source.toString(), { quality: "highestaudio", dlChunkSize: 0 });

            return track;
        } catch (error) {
            logger.error(error);

            return undefined;
        }
    };
}

const youtubeAPIWrapper = new YouTubeAPIWrapper();

export default youtubeAPIWrapper