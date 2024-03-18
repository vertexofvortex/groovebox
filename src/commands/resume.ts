import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { playerManager } from "../player";
import reply from "@/utils/reply";

const data = new SlashCommandBuilder()
    .setName("resume")
    .setDescription("Plays music");

const execute = async (interaction: CommandInteraction) => {
    const player = playerManager.getPlayer(interaction.guildId!);

    if (player.resume()) {
        await reply(interaction, "Playing again...");
    } else {
        await reply(interaction, "Already playing");
    }
};

export const resume = {
    data: data,
    execute: execute,
};