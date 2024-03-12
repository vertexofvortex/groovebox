import { ChatInputCommandInteraction } from "discord.js";
import { Configuration, Store } from "../../../store";
import reply from "@utils/reply";

async function unbindFromChannel(interaction: ChatInputCommandInteraction, store: Store) {
    await store.update<Configuration>("config", {
        "bind-to-channel": undefined,
    });

    await reply(interaction, "Successfully unbound from a channel");
}

export default unbindFromChannel;