import { ChatInputCommandInteraction } from "discord.js";
import { Configuration, Store } from "../../../store";
import reply from "@/utils/reply";

async function commandOutputVisibility(interaction: ChatInputCommandInteraction, store: Store) {
    const option = interaction.options.get("enabled")?.value as boolean;
    
    await store.update<Configuration>("config", {
        "command-output-visibility": option,
    });

    reply(
        interaction,
        option
            ? "Now Groovebox's responses will be visible to anyone"
            : "Now Groovebox's responses will be only visible for user that triggered the command"
    );
}

export default commandOutputVisibility;