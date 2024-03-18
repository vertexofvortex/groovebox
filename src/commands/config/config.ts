import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import saveQueue from "./subcommands/saveQueue";
import bindToChannel from "./subcommands/bindToChannel";
import getConfig from "./subcommands/getConfig";
import unbindFromChannel from "./subcommands/unbindFromChannel";
import restrictOtherChannels from "./subcommands/restrictOtherChannels";
import commandOutputVisibility from "./subcommands/commandOutputVisibility";
import commandOutputTTL from "./subcommands/commandOutputTTL";
import { storeManager } from "@/store";

const data = new SlashCommandBuilder()
    .setName("config")
    .setDescription("With this command, you can configure Groovebox's behaviour in various scenarios")
        .addSubcommand(subcommand => subcommand
            .setName("save-queue")
            .setDescription("Should played tracks remain in the queue?")
            .addBooleanOption(option => option
                .setName("enabled")
                .setDescription("true/false")
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName("bind-to-channel")
            .setDescription("A text channel Groovebox will be associated with")
            .addChannelOption(option => option
                .setName("channel")
                .setDescription("Channel")
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName("unbind-from-channel")
            .setDescription("Unbind Groovebox from a channel")
        )
        .addSubcommand(subcommand => subcommand
            .setName("restrict-other-channels")
            .setDescription("Should Groovebox ignore messages from any other channels except one it's bound to?")
            .addBooleanOption(option => option
                .setName("enabled")
                .setDescription("true/false")
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName("command-output-visibility")
            .setDescription("Should Groovebox's answers to user's commands be visible for anyone?")
            .addBooleanOption(option => option
                .setName("enabled")
                .setDescription("true/false")
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName("command-output-ttl")
            .setDescription("Should bot delete its own responses? Specify the timeout in milliseconds, otherwise set it to 0")
            .addIntegerOption(option => option
                .setName("timeout")
                .setDescription("milliseconds (1s = 1000ms)")
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName("get-config")
            .setDescription("Shows current configuration")
        );

const execute = async (interaction: ChatInputCommandInteraction) => {
    const store = storeManager.getStore(interaction.guildId!);
    const subcommand = interaction.options.getSubcommand();

    if (subcommand == "save-queue") saveQueue(interaction, store);
    if (subcommand == "bind-to-channel") bindToChannel(interaction, store);
    if (subcommand == "get-config") getConfig(interaction, store);
    if (subcommand == "unbind-from-channel") unbindFromChannel(interaction, store);
    if (subcommand == "restrict-other-channels") restrictOtherChannels(interaction, store);
    if (subcommand == "command-output-visibility") commandOutputVisibility(interaction, store);
    if (subcommand == "command-output-ttl") commandOutputTTL(interaction, store);
};

export const config = {
    data: data,
    execute: execute,
};