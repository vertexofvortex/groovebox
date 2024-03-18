import formatPinnedMessageEmbed from "@/utils/formatPinnedMessageEmbed";
import { ChatInputCommandInteraction, TextChannel } from "discord.js";
import { playerManager } from "../../../player";
import { Configuration, Store } from "../../../store";
import reply from "@/utils/reply";

async function bindToChannel(interaction: ChatInputCommandInteraction, store: Store) {
    let channel = interaction.guild?.channels.cache.get(
        String(interaction.options.get("channel")?.value)
    );

    const errors: string[] = [];

    if (!(channel instanceof TextChannel)) errors.push("The specified channel should be text-based");
    if (!channel?.manageable) errors.push("I have no permission to manage that channel");
    if (!channel?.viewable) errors.push("I have no permission to even view that channel!");

    channel = channel as TextChannel;

    if (errors.length > 0) {
        await reply(interaction, `Cannot bind to #${channel.name}! Please fix the errors below and try again\n\n${errors.join("\n")}`);

        return;
    }

    await store.update<Configuration>("config", {
        "bind-to-channel": String(interaction.options.get("channel")?.value),
    });

    await reply(interaction, "Option changed");

    const player = playerManager.getPlayer(interaction.guildId!);

    const message = await channel.send({
        embeds: [formatPinnedMessageEmbed(player.getQueue())],
    });

    await store.set<string>("pinnedMessageId", message.id);
}

export default bindToChannel;