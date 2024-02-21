import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { playerManager } from "../player";

const data = new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Shows current queue");

const execute = async (interaction: CommandInteraction) => {
    const player = playerManager.getPlayer(interaction.guildId!);
    const queue = player.getQueue();

    await interaction.reply(
        `Current queue:\n${queue.map((t, i) => `[${i+1}] ${t.title} (by ${t.addedBy.tag})`).join("\n")}`
    );
};

export const queue = {
    data: data,
    execute: execute,
};