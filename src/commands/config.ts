import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Configuration, storeManager } from "../store";

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
    const store = storeManager.getStore(interaction.guildId!);
    const subcommand = interaction.options.getSubcommand();

    if (subcommand == "save-queue") handleSaveQueue(interaction);
    if (subcommand == "bind-to-channel") bindToChannel(interaction);
    if (subcommand == "get-config") getConfig(interaction);

    async function handleSaveQueue(interaction: ChatInputCommandInteraction) {
        await store.update<Configuration>("config", {
            "save-queue": (String(interaction.options.get("enabled")?.value).toLowerCase() === "true"),
        });

        await interaction.reply("Option changed");
    }
    
    async function bindToChannel(interaction: ChatInputCommandInteraction) {
        await store.update<Configuration>("config", {
            "bind-to-channel": String(interaction.options.get("channel")?.value),
        });

        await interaction.reply("Option changed");
    }

    async function getConfig(interaction: ChatInputCommandInteraction) {
        const config = await store.get<Configuration>("config");

        if (!config) {
            await interaction.reply("You haven't configured any option yet");

            return;
        }

        await interaction.reply(`Current configuration:\n\`\`\`${Object.entries(config).map((v) => `${v[0].padEnd(20, " ")} ${v[1]}`).join("\n")}\`\`\``);
    }
};

export const config = {
    data: data,
    execute: execute,
};