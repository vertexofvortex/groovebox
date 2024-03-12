import { ChatInputCommandInteraction } from "discord.js";
import { Configuration, Store } from "../../../store";
import reply from "@utils/reply";

async function commandOutputTTL(interaction: ChatInputCommandInteraction, store: Store) {
    const option = interaction.options.get("timeout")?.value as number;
    
    await store.update<Configuration>("config", {
        "command-output-ttl": option,
    });

    reply(
        interaction,
        option
            ? `Now Groovebox's responses will be deleted after ${option} milliseconds`
            : "Now Groovebox will not delete its responses"
    );
}

export default commandOutputTTL;