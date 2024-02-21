import { CommandInteraction } from "discord.js";
import { GrooveboxAudioResource } from "../player";
import services from "@services/index";
import logger from "@utils/logger";

export const searchTracks = async (query: string, interaction: CommandInteraction) => {
    const searchResults: GrooveboxAudioResource[] = [];

    for (const [name, service] of Object.entries(services)) {
        logger.debug("Searching via", name);

        const serviceSearchResults = await service.find(query, interaction);

        if (!serviceSearchResults) return;

        searchResults.push(...serviceSearchResults);
    }

    logger.debug(searchResults.length);

    return searchResults;
};