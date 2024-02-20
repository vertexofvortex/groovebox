import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction, Events, SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuInteraction, StringSelectMenuOptionBuilder, UserSelectMenuInteraction } from "discord.js";
import { PlayerSubscription, VoiceConnectionStatus, getVoiceConnection } from "@discordjs/voice";
import { playerManager } from "../player";
import { createJoinVoiceChannel } from "../utils/createJoinVoiceChannel";
import youtubeAPIWrapper from "../youtube";
import yandexMusicAPIWrapper from "../yandex/yandex";
import { searchTracks } from "../utils/searchTracks";
import { client } from "..";
import logger from "../logger";

const data = new SlashCommandBuilder()
    .setName("play")
    .setDescription("Plays a track")
        .addStringOption(option => option
            .setName("name")
            .setDescription("Track name"));

const execute = async (interaction: CommandInteraction) => {
    const query = interaction.options.get("name")?.value?.toString();
    const searchResults = await searchTracks(query!, interaction);

    await interaction.deferReply({
        fetchReply: true
    });

    const playButton = new ButtonBuilder()
        .setCustomId("play")
        // TODO: or "add selected to the queue" if currentPlaying isn't undefined
        .setLabel("Play selected")
        .setStyle(ButtonStyle.Primary);
    const cancelButton = new ButtonBuilder()
        .setCustomId("cancel")
        .setLabel("Cancel")
        .setStyle(ButtonStyle.Secondary);
    const select = new StringSelectMenuBuilder()
        .setCustomId("select")
        .setPlaceholder("1")
        .setMinValues(1)
        .setMaxValues(searchResults.length <= 25 ? searchResults.length : 25)
        .addOptions(searchResults.map((result, index) => 
            new StringSelectMenuOptionBuilder().setLabel(`[${index+1}] ${result.title}`).setValue(index.toString()).setDefault(index == 0 ? true : false).setDescription(`${result.type}`)
        ));
    const row1 = new ActionRowBuilder<StringSelectMenuBuilder>()
        .addComponents(select);
    const row2 = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(playButton, cancelButton);

    const tracklistText = `\`\`\`\n${searchResults.map((r, i) => `#${i < 9 ? i+1+" " : i+1}\t[${r.type}]${r.type == "yandex" ? " " : ""}\t${r.title}`).join("\n")}\`\`\``;
    const response = await interaction.editReply({
        content: `Results:\n${tracklistText}`,
        components: [ row1, row2 ]
    });

    const collector = response.createMessageComponentCollector({
        filter: i => i.user.id === interaction.user.id,
        time: 60000,
    });

    let selectedTrackIndexes: string[] = ["0"];

    collector.on("collect", async (i) => {
        logger.debug(i.customId);

        if (i.customId === "select") {
            selectedTrackIndexes = (i as UserSelectMenuInteraction).values;
            logger.debug(selectedTrackIndexes);
            i.deferUpdate();
        }

        if (i.customId === "play") {
            const audioResources = searchResults.filter((result, index) => selectedTrackIndexes.includes((index).toString()));
            const connection = getVoiceConnection(interaction.guildId!) || createJoinVoiceChannel(interaction)();
            const player = playerManager.getPlayer(interaction.guildId!);
            let subscription: PlayerSubscription | undefined;

            audioResources.map(resource => player.addResource(resource));
            
            connection
                .on(VoiceConnectionStatus.Ready, () => {
                    subscription = connection.subscribe(player.player);
                })
                .on(VoiceConnectionStatus.Disconnected, () => {
                    subscription?.unsubscribe();
                    connection.destroy();
                    player.clear();
                })
                .on(VoiceConnectionStatus.Destroyed, () => logger.debug("Connection destroyed"));

            logger.debug("Tracks in the queue:", player.getQueue().length);

            i.deferUpdate();
            collector.removeAllListeners();

            await interaction.editReply({
                content: `Current queue:\n${player.getQueue().map(t => t.title).join("\n")}`,
                components: []
            });
        }

        if (i.customId === "cancel") {
            collector.removeAllListeners();
            await interaction.deleteReply();
        }
    });

    collector.on("end", async (i) => {
        interaction.deleteReply();
    });

    // const connection = getVoiceConnection(interaction.guildId!) || createJoinVoiceChannel(interaction)();
    // const player = playerManager.getPlayer(interaction.guildId!);
    
    // player.addResource({
    //     title: video.snippet?.title!,
    //     source: `http://www.youtube.com/watch?v=${video.id?.videoId}`,
    //     addedBy: interaction.user,
    //     type: "youtube",
    // });

//     await interaction.reply(
// `Added ${video.snippet?.title} to the queue

// Current queue:
// > [NOW PLAYING] ${player.currentPlaying?.title} - by ${player.currentPlaying?.addedBy.tag}
// ${player.getQueue().map((resource, index) => `> [${index}] ${resource.title} - by ${resource.addedBy.tag}`).join("\n")}`
// );

    // await interaction.reply(`Added ${track[0].title}`);

    // connection.on(VoiceConnectionStatus.Ready, async () => {
    //     const subscription = connection.subscribe(player.player);

    //     // TODO: connection destroying?
    // });
};

export const play = {
    data: data,
    execute: execute
};