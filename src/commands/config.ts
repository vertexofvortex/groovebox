import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { storeManager } from "../store";

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
            .setName("get-config")
            .setDescription("Shows current configuration")
        );

const execute = async (interaction: ChatInputCommandInteraction) => {
    // TODO: class for a configuration
    // await interaction.reply(JSON.stringify(data));
    const store = storeManager.getStore(interaction.guildId!);

    if (interaction.options.getSubcommand() == "save-queue") {
        const config = await store.get("config");

        await store.set("config", {
            ...config,
            "save-queue": interaction.options.get("enabled")?.value,
        });

        await interaction.reply(`Queue saving mode is set to ${interaction.options.get("enabled")?.value}`);
    }

    if (interaction.options.getSubcommand() == "bind-to-channel") {
        const config = await store.get("config");

        await store.set("config", {
            ...config,
            "bind-to-channel": interaction.options.get("channel")?.value,
        });

        const channel = await interaction.guild?.channels.fetch(interaction.options.get("channel")?.value?.toString() || "");

        await interaction.reply(`Groovebox is now bind to #${channel?.name}`);
    }

    if (interaction.options.getSubcommand() == "get-config") {
        await interaction.reply(JSON.stringify(await store.get("config")));
    }
};

export const config = {
    data: data,
    execute: execute,
};