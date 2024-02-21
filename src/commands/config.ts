import { CommandInteraction, SlashCommandBuilder } from "discord.js";

const data = new SlashCommandBuilder()
    .setName("config")
    .setDescription("With this command, you can configure Groovebox's behaviour in various scenarios")
        .addSubcommand(subcommand => subcommand
            .setName("unqueue-current-track")
            .setDescription("Should Groovebox remove the track from queue when playing it?")
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