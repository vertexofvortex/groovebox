import "module-alias/register";
import logger from "@utils/logger";
import { Client, Events, GatewayIntentBits } from "discord.js";
import "dotenv/config";
import commands from "@commands/index";

export const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
    ],
});

client.once(Events.ClientReady, (client) => {
    logger.info(`Groovebox started. Logged in as ${client.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN);

// Commands handler
client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = commands[interaction.commandName];

    if (!command) {
        logger.warn(`A user ${interaction.user.tag} tried to execute an unexisting command ${interaction.commandName}`);
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        logger.error(error);
        
        const errorMessage = {
            content: `There was an error occured while executing ${interaction.commandName} command!`,
            ephemeral: true,
        };

        if (interaction.replied || interaction.deferred) {
            await interaction.followUp(errorMessage);
        } else {
            await interaction.reply(errorMessage);
        }
    }
});

// logger.info(generateDependencyReport());

// process.on("exit", () => {
//     logger.info("Shutting down Groovebox... Bye!");
// });