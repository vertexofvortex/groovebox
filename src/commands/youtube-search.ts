import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import youtubeAPIWrapper from "../youtube";

const data = new SlashCommandBuilder()
    .setName("ytsearch")
    .setDescription("Finds videos on YouTube for a given query")
        .addStringOption(option => option
            .setName("query")
            .setDescription("A search query"));

const execute = async (interaction: CommandInteraction) => {    
    const videos = await youtubeAPIWrapper.find(interaction.options.get("query")?.value?.toString()!);

    if (!videos) {
        await interaction.reply("Cannot find anything =(");

        return;
    }

    await interaction.reply(`Found something. Take a look at this results:\n\n${videos.map((video, index) => `[${index+1}] ${video.snippet?.title}`).join("\n")}`);
};

export const ytsearch = {
    data: data,
    execute: execute
};