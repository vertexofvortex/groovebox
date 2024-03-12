import "module-alias/register";
import logger from "@utils/logger";
import { Client, Events, GatewayIntentBits, TextChannel, channelMention } from "discord.js";
import "dotenv/config";
import commands from "@commands/index";
import { Configuration, storeManager } from "./store";
import formatPinnedMessageEmbed from "@utils/formatPinnedMessageEmbed";
import { playerManager } from "./player";

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

client.on(Events.MessageCreate, async (interaction) => {
    const store = storeManager.getStore(interaction.guildId!);
    const config = await store.get<Configuration>("config");

    if (interaction.channelId != config?.["bind-to-channel"]) return;
    if (interaction.author.id == client.user!.id) return;

    await interaction.delete();

    const channel = await (client.channels.cache.get(config["bind-to-channel"]) as TextChannel);
    const pinnedMessageId = await store.get<string>("pinnedMessageId");
    const player = playerManager.getPlayer(interaction.guildId!);

    if (!pinnedMessageId) return;

    (await channel.messages.fetch(pinnedMessageId)).edit({
        embeds: [formatPinnedMessageEmbed(player.getQueue())],
    });
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.guild) return;
    if (!interaction.isChatInputCommand()) return;
    
    const store = storeManager.getStore(interaction.guildId!);
    const config = await store.get<Configuration>("config");
    const command = commands[interaction.commandName];

    if (!command) {
        logger.warn(`A user ${interaction.user.tag} tried to execute an unexisting command ${interaction.commandName}`);

        await interaction.reply({
            content: "Command not found!",
            ephemeral: true,
        });

        return;
    }

    if (config?.["bind-to-channel"]
        && interaction.channelId != config["bind-to-channel"]
        && command.data.name !== "config"
        && command.data.name !== "ping"
    ) {
        await interaction.reply({
            content: `Groovebox is bound to ${channelMention(String(interaction.guild.channels.cache.get(config["bind-to-channel"])?.id))} channel, please use the bot on that channel only!`,
            ephemeral: true,
        });

        return;
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