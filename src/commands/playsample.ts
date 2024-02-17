import { AudioPlayerStatus, NoSubscriberBehavior, VoiceConnectionStatus, createAudioPlayer, createAudioResource, joinVoiceChannel } from "@discordjs/voice";
import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import logger from "../logger";
import { client } from "..";

const data = new SlashCommandBuilder()
    .setName("playsample")
    .setDescription("Plays a music sample (testing voice features)");

const execute = async (interaction: CommandInteraction) => {
    const guild = client.guilds.cache.get(interaction.guildId!);
    const member = guild?.members.cache.get(interaction.member?.user.id!);
    const channel = member?.voice.channel;
    
    const connection = joinVoiceChannel({
        guildId: guild?.id!,
        channelId: channel?.id!,
        adapterCreator: guild?.voiceAdapterCreator!
    });

    connection.on(VoiceConnectionStatus.Ready, async () => {
        await interaction.reply("Playing Rozgi - Заложные!");
        logger.info(`Voice connection to the channel "${channel?.name}" is ready`);

        const player = createAudioPlayer({
            behaviors: { noSubscriber: NoSubscriberBehavior.Pause }
        });
        const subscription = connection.subscribe(player);
        const resource = createAudioResource("/home/vertex/Music/Rozgi - Заложные.mp3");

        player.play(resource);

        player.on(AudioPlayerStatus.Playing, () => {
            logger.info('The audio player has started playing!');
        });
    });
};

export const playsample = {
    data: data,
    execute: execute
};