import reply from "@/utils/reply";
import { CommandInteraction, SlashCommandBuilder } from "discord.js";

const data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("pong");

const execute = async (interaction: CommandInteraction) => {
    const sent = await reply(interaction, {
        content: "Pinging...",
        fetchReply: true,
    });

    await interaction.editReply(`Roundtrip latency: \`${sent.createdTimestamp - interaction.createdTimestamp}ms\``);
};

export const ping = {
    data: data,
    execute: execute,
};