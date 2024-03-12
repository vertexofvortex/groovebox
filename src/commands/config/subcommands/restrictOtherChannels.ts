import { ChatInputCommandInteraction } from "discord.js";
import { Configuration, Store } from "../../../store";
import reply from "@utils/reply";

async function restrictOtherChannels(interaction: ChatInputCommandInteraction, store: Store) {
    const option = interaction.options.get("enabled")?.value as boolean;
    
    await store.update<Configuration>("config", {
        "restrict-other-channels": option,
    });

    reply(
        interaction,
        option
            ? "Now Groovebox will not react to any music commands outside the channel that it bound to"
            : "Groovebox will now react to the commands in any channel"
    );
}

export default restrictOtherChannels;