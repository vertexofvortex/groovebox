import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { playerManager } from "../player";

const data = new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Sets the player on pause");

const execute = async (interaction: CommandInteraction) => {
    const player = playerManager.getPlayer(interaction.guildId!);

    if (player.pause()) {
        await interaction.reply("Paused. Use `/resume` command when you're ready to listen music again");
    } else {
        await interaction.reply("Already paused");
    }    
};

export const pause = {
    data: data,
    execute: execute,
};