import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction, SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, UserSelectMenuInteraction } from "discord.js";
import { PlayerSubscription, VoiceConnectionStatus, getVoiceConnection } from "@discordjs/voice";
import { playerManager } from "../player";
import logger from "@utils/logger";
import { createJoinVoiceChannel } from "@utils/createJoinVoiceChannel";
import { searchTracks } from "@utils/searchTracks";
import reply from "@utils/reply";

const data = new SlashCommandBuilder()
    .setName("play")
    .setDescription("Plays a track")
        .addStringOption(option => option
            .setName("name")
            .setDescription("Track name"));

const execute = async (interaction: CommandInteraction) => {
    const query = interaction.options.get("name")?.value?.toString();
    const searchResults = await searchTracks(query!, interaction);
    
    if (!searchResults || searchResults.length == 0) {
        await reply(interaction, "Cannot find anything =(");
        
        return;
    }
    
    await interaction.deferReply({ fetchReply: true });

    const player = playerManager.getPlayer(interaction.guildId!);

    const playButton = new ButtonBuilder()
        .setCustomId("play")
        .setLabel(player.currentPlaying ? "Add selected to the queue" : "Play selected")
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
            new StringSelectMenuOptionBuilder().setLabel(`[${index+1}] ${result.title}`).setValue(index.toString()).setDefault(index == 0 ? true : false).setDescription(`From ${result.type.displayName}`)
        ));

    const row1 = new ActionRowBuilder<StringSelectMenuBuilder>()
        .addComponents(select);

    const row2 = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(playButton, cancelButton);

    const tracklistText = `\`\`\`\n${searchResults.map((r, i) => `#${String(i).padEnd(3, " ")}\t${r.type.displayName.padEnd(10, " ")}\t${r.title}`).join("\n")}\`\`\``;
    const response = await interaction.editReply({
        content: `Results:\n${tracklistText}`,
        components: [ row1, row2 ],
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
                components: [],
            });

            setTimeout((interaction) => interaction.deleteReply(), 10000, interaction);
        }

        if (i.customId === "cancel") {
            collector.removeAllListeners();
            await interaction.deleteReply();
        }
    });

    collector.on("end", async () => {
        interaction.deleteReply();
    });
};

export const play = {
    data: data,
    execute: execute,
};