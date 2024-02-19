import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { search } from "../youtube-data-api/youtube";

const data = new SlashCommandBuilder()
    .setName("ytsearch")
    .setDescription("Finds videos on YouTube for a given query")
        .addStringOption(option => option
            .setName("query")
            .setDescription("A search query"));

const execute = async (interaction: CommandInteraction) => {    
    try {
        const response = await search(interaction.options.get("query")?.value as string);

        if (response.data.items?.length === 0) {
            await interaction.reply("No results");
        }

        const video = response.data.items![0];

        await interaction.reply(`Found: ${video.snippet?.title}`);
    } catch (error) {
        await interaction.reply("An error occured");
    }
};

export const ytsearch = {
    data: data,
    execute: execute
};