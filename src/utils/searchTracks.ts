import { CommandInteraction } from "discord.js";
import { GrooveboxAudioResource } from "../player";
import youtubeAPIWrapper from "../youtube";
import logger from "../logger";
import yandexMusicAPIWrapper from "../yandex/yandex";

export const searchTracks = async (query: string, interaction: CommandInteraction) => {
    const results: GrooveboxAudioResource[] = [];

    try {
        const youtubeResults = await youtubeAPIWrapper.find(query);

        youtubeResults?.map(result => results.push({
            title: result.snippet?.title!,
            addedBy: interaction.user,
            source: result.id?.videoId!,
            type: "youtube"
        }));
    } catch (error) {
        logger.error(error);
    }
    
    try {
        const yandexResults = await yandexMusicAPIWrapper.find(query);

        yandexResults?.map(result => results.push({
            title: `${result.artists.map(artist => artist.name).join(", ")} - ${result.title}`,
            addedBy: interaction.user,
            source: result.id,
            type: "yandex"
        }));
    } catch (error) {
        logger.error(error);
    }

    return results;
};