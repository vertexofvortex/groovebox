import { CommandInteraction } from "discord.js";
import { GrooveboxAudioResource } from "../player";
import services from "@services/index";

export const searchTracks = async (query: string, interaction: CommandInteraction) => {
    const searchResults: GrooveboxAudioResource[] = [];

    for (const [, service] of Object.entries(services)) {
        const serviceSearchResults = await service.find(query, interaction);

        if (!serviceSearchResults) break;

        searchResults.push(...serviceSearchResults);
    }

    return searchResults;
};