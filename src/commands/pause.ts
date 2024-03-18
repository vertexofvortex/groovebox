import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { playerManager } from "../player";
import reply from "@/utils/reply";

const data = new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Sets the player on pause");

const execute = async (interaction: CommandInteraction) => {
    const player = playerManager.getPlayer(interaction.guildId!);

    if (player.pause()) {
        await reply(interaction, "Paused. Use `/resume` command when you're ready to listen music again");
    } else {
        await reply(interaction, "Already paused");
    }    
};

export const pause = {
    data: data,
    execute: execute,
};