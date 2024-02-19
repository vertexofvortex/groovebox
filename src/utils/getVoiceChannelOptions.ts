import { CommandInteraction } from "discord.js";
import { client } from "..";
import { CreateVoiceConnectionOptions, JoinVoiceChannelOptions } from "@discordjs/voice";

export const getVoiceChannelOptions = (interaction: CommandInteraction): CreateVoiceConnectionOptions & JoinVoiceChannelOptions => {
    const guild = client.guilds.cache.get(interaction.guildId!);
    const member = guild?.members.cache.get(interaction.member?.user.id!);
    const channel = member?.voice.channel;

    return {
        guildId: guild?.id!,
        channelId: channel?.id!,
        adapterCreator: guild?.voiceAdapterCreator!
    };
};