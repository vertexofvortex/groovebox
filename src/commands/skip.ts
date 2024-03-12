import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { playerManager } from "../player";
import reply from "@utils/reply";

const data = new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skips current playing track");

const execute = async (interaction: CommandInteraction) => {
    const player = playerManager.getPlayer(interaction.guildId!);

    player.skip();

    await reply(interaction, "Skipping...");
};

export const skip = {
    data: data,
    execute: execute,
};