import { CommandInteraction, SlashCommandBuilder } from "discord.js";

const data = new SlashCommandBuilder()
    .setName("config")
    .setDescription("With this command, you can configure Groovebox's behaviour in various scenarios")
        .addSubcommand(subcommand => subcommand
            .setName("save-queue")
            .setDescription("Should played tracks remain in the queue?")
            .addBooleanOption(option => option
                .setName("state")
                .setDescription("true/false")
            )
        );

const execute = async (interaction: CommandInteraction) => {
    await interaction.reply(JSON.stringify(data));
};

export const config = {
    data: data,
    execute: execute,
};