import { CommandInteraction, Guild } from "discord.js";
import { client } from "..";

export const getGuild = (interaction: CommandInteraction): Guild | undefined => {
    return client.guilds.cache.get(interaction.guildId!);
};