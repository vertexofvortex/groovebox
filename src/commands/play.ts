import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { VoiceConnectionStatus, getVoiceConnection } from "@discordjs/voice";
import { playerManager } from "../player";
import { createJoinVoiceChannel } from "../utils/createJoinVoiceChannel";
import youtubeAPIWrapper from "../youtube";

const data = new SlashCommandBuilder()
    .setName("play")
    .setDescription("Plays a track")
        .addStringOption(option => option
            .setName("name")
            .setDescription("Track name"));

const execute = async (interaction: CommandInteraction) => {
    const video = await youtubeAPIWrapper.findFirst(interaction.options.get("name")?.value?.toString()!);

    if (!video) {
        await interaction.reply("Cannot find the track =(");

        return;
    }

    const connection = getVoiceConnection(interaction.guildId!) || createJoinVoiceChannel(interaction)();
    const player = playerManager.getPlayer(interaction.guildId!);
    
    player.addResource({
        title: video.snippet?.title!,
        source: `http://www.youtube.com/watch?v=${video.id?.videoId}`,
        addedBy: interaction.user,
        type: "youtube",
    });

    await interaction.reply(
`Added ${video.snippet?.title} to the queue

Current queue:
> [NOW PLAYING] ${player.currentPlaying?.title} - by ${player.currentPlaying?.addedBy.tag}
${player.getQueue().map((resource, index) => `> [${index}] ${resource.title} - by ${resource.addedBy.tag}`).join("\n")}`
);

    connection.on(VoiceConnectionStatus.Ready, async () => {
        const subscription = connection.subscribe(player.player);

        // TODO: connection destroying?
    });
};

export const play = {
    data: data,
    execute: execute
};