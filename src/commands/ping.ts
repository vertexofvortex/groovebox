import { CommandInteraction, SlashCommandBuilder } from "discord.js";

const data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("pong");

const execute = async (interaction: CommandInteraction) => {
    const sent = await interaction.reply({
        content: "Pinging...",
        fetchReply: true,
    });

    await interaction.editReply(`Roundtrip latency: \`${sent.createdTimestamp - interaction.createdTimestamp}ms\``);
};

export const ping = {
    data: data,
    execute: execute,
};