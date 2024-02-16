import { CommandInteraction, SlashCommandBuilder } from "discord.js";

const data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("pong");

const execute = async (interaction: CommandInteraction) => {
    await interaction.reply("pong");
};

export const ping = {
    data: data,
    execute: execute
};