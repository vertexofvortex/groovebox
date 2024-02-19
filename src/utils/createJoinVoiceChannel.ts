import { CommandInteraction } from "discord.js";
import { client } from "..";
import { VoiceConnection, joinVoiceChannel } from "@discordjs/voice";

export const createJoinVoiceChannel = (interaction: CommandInteraction): () => VoiceConnection => {
    const guild = client.guilds.cache.get(interaction.guildId!);
    const member = guild?.members.cache.get(interaction.member?.user.id!);
    const channel = member?.voice.channel;

    return () => joinVoiceChannel({
        guildId: guild?.id!,
        channelId: channel?.id!,
        adapterCreator: guild?.voiceAdapterCreator!
    });
};