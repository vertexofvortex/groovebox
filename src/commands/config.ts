import { ChatInputCommandInteraction, SlashCommandBuilder, TextChannel } from "discord.js";
import { Configuration, storeManager } from "../store";
import formatPinnedMessageEmbed from "@utils/formatPinnedMessageEmbed";
import { playerManager } from "../player";

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
            .setName("get-config")
            .setDescription("Shows current configuration")
        );

const execute = async (interaction: ChatInputCommandInteraction) => {
    const store = storeManager.getStore(interaction.guildId!);
    const subcommand = interaction.options.getSubcommand();

    if (subcommand == "save-queue") handleSaveQueue(interaction);
    if (subcommand == "bind-to-channel") bindToChannel(interaction);
    if (subcommand == "get-config") getConfig(interaction);
    if (subcommand == "unbind-from-channel") unbindFromChannel(interaction);

    async function handleSaveQueue(interaction: ChatInputCommandInteraction) {
        await store.update<Configuration>("config", {
            "save-queue": (String(interaction.options.get("enabled")?.value).toLowerCase() === "true"),
        });

        await interaction.reply("Option changed");
    }
    
    async function bindToChannel(interaction: ChatInputCommandInteraction) {
        let channel = interaction.guild?.channels.cache.get(
            String(interaction.options.get("channel")?.value)
        );

        const errors: string[] = [];

        if (!(channel instanceof TextChannel)) errors.push("The specified channel should be text-based");
        if (!channel?.manageable) errors.push("I have no permission to manage that channel");
        if (!channel?.viewable) errors.push("I have no permission to even view that channel!");

        channel = channel as TextChannel;

        if (errors.length > 0) {
            await interaction.reply(`Cannot bind to #${channel.name}! Please fix the errors below and try again\n\n${errors.join("\n")}`);

            return;
        }

        await store.update<Configuration>("config", {
            "bind-to-channel": String(interaction.options.get("channel")?.value),
        });

        await interaction.reply("Option changed");

        const player = playerManager.getPlayer(interaction.guildId!);

        const message = await channel.send({
            embeds: [formatPinnedMessageEmbed(player.getQueue())],
        });

        await store.set<string>("pinnedMessageId", message.id);
    }

    async function getConfig(interaction: ChatInputCommandInteraction) {
        const config = await store.get<Configuration>("config");

        if (!config) {
            await interaction.reply("You haven't configured any option yet");

            return;
        }

        await interaction.reply(`Current configuration:\n\`\`\`${Object.entries(config).map((v) => `${v[0].padEnd(20, " ")} ${v[1]}`).join("\n")}\`\`\``);
    }

    async function unbindFromChannel(interaction: ChatInputCommandInteraction) {
        await store.update<Configuration>("config", {
            "bind-to-channel": undefined,
        });

        await interaction.reply("Successfully unbound from a channel");
    }
};

export const config = {
    data: data,
    execute: execute,
};