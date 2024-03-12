import { CommandInteraction, InteractionReplyOptions } from "discord.js";
import { Configuration, storeManager } from "../store";
import logger from "./logger";

type ReplyType = "followUp" | "reply";

const reply = async (
    interaction: CommandInteraction,
    options: string | InteractionReplyOptions,
    replyType: ReplyType = "reply"
) => {
    if (!interaction.guildId) throw new Error("Cannot get guild ID");

    const store = storeManager.getStore(interaction.guildId);
    const config = await store.get<Configuration>("config");

    if (!config) throw new Error("Cannot get config object for this guild");
    if (!interaction.channel) throw new Error("Cannot get channel");

    let messageOptions: InteractionReplyOptions;

    logger.debug(options, typeof options);

    if (typeof options == "string") {
        messageOptions = {
            content: options,
            ephemeral: !config["command-output-visibility"],
        };
    } else {
        messageOptions = {
            ...options,
            ephemeral: !config["command-output-visibility"],
        };
    }

    const response = replyType == "reply" ? interaction.reply(messageOptions) : interaction.followUp(messageOptions);

    if (config["command-output-ttl"] != 0) {
        setTimeout(
            (interaction) => interaction.deleteReply(),
            config["command-output-ttl"],
            interaction
        );
    }

    logger.debug(interaction.channel.id, config["bind-to-channel"]);

    if (interaction.channel.id == config["bind-to-channel"]) {
        setTimeout(
            (interaction) => interaction.deleteReply(),
            5000,
            interaction
        );
    }

    return response;
};

export default reply;