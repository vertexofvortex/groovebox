import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { search } from "../youtube-data-api/youtube";
import { VoiceConnectionStatus, getVoiceConnection, joinVoiceChannel } from "@discordjs/voice";
import { getVoiceChannelOptions } from "../utils/getVoiceChannelOptions";
import { youtube_v3 } from "googleapis";
import { audioPlayerInstance } from "../player";
import { getGuild } from "../utils/getGuild";

const data = new SlashCommandBuilder()
    .setName("play")
    .setDescription("Plays a track")
        .addStringOption(option => option
            .setName("name")
            .setDescription("Track name"));

const execute = async (interaction: CommandInteraction) => {
    let response;
    let video: youtube_v3.Schema$SearchResult;

    try {
        response = await search(interaction.options.get("name")?.value as string);

        if (response.data.items?.length === 0) {
            await interaction.reply("No results");

            return;
        }

        video = response.data.items![0];
    } catch (error) {
        await interaction.reply("An error occured");

        return;
    }

    const connection = getVoiceConnection(getGuild(interaction)?.id!)|| joinVoiceChannel(getVoiceChannelOptions(interaction));

    audioPlayerInstance.addResource({
        title: video.snippet?.title!,
        source: `http://www.youtube.com/watch?v=${video.id?.videoId}`,
        addedBy: interaction.user,
        type: "youtube",
    });

    await interaction.reply(
`Added ${video.snippet?.title} to the queue

Current queue:
> [NOW PLAYING] ${audioPlayerInstance.currentPlaying?.title} - by ${audioPlayerInstance.currentPlaying?.addedBy.tag}
${audioPlayerInstance.getQueue().map((resource, index) => `> [${index}] ${resource.title} - by ${resource.addedBy.tag}`).join("\n")}`
);

    connection.on(VoiceConnectionStatus.Ready, async () => {
        const subscription = connection.subscribe(audioPlayerInstance.player);

        // TODO: connection destroying?
    });
};

export const play = {
    data: data,
    execute: execute
};