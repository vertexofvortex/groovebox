import { google } from "googleapis";
import "dotenv/config";
import ytdl from "ytdl-core";
import { Readable } from "stream";
import { GrooveboxAudioResource } from "../../player";
import BaseMusicService from "../BaseMusicService";
import { CommandInteraction } from "discord.js";
import logger from "@/utils/logger";

class YouTubeService implements BaseMusicService {
    // TODO: pass options to the class constructor
    youtube = google.youtube({
        version: "v3",
        auth: process.env.YOUTUBE_TOKEN,
    });

    find = async (query: string, interaction: CommandInteraction) => {
        try {
            const response = await this.youtube.search.list({
                part: ["snippet"],
                type: ["video"],
                q: query,
            });

            if (response.data.items?.length == 0 || !response.data.items) return undefined;

            const results = response.data.items;
            const audioResources: GrooveboxAudioResource[] = results.map(result => ({
                title: result.snippet?.title || "Undefined",
                addedBy: interaction.user,
                source: result.id?.videoId || "Undefined",
                type: {
                    name: "youtube",
                    displayName: "YouTube",
                },
            }));
            
            return audioResources;
        } catch (error) {
            return undefined;
        }
    };

    findFirst = async (query: string, interaction: CommandInteraction) => {
        const result = await this.find(query, interaction);

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

export default YouTubeService;