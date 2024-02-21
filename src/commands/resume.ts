import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { playerManager } from "../player";

const data = new SlashCommandBuilder()
    .setName("resume")
    .setDescription("Plays music");

const execute = async (interaction: CommandInteraction) => {
    const player = playerManager.getPlayer(interaction.guildId!);

    if (player.resume()) {
        await interaction.reply("Playing again...");
    } else {
        await interaction.reply("Already playing");
    }
};

export const resume = {
    data: data,
    execute: execute,
};