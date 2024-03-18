import { ChatInputCommandInteraction } from "discord.js";
import { Configuration, Store } from "../../../store";
import reply from "@/utils/reply";

async function saveQueue(interaction: ChatInputCommandInteraction, store: Store) {
    await store.update<Configuration>("config", {
        "save-queue": (String(interaction.options.get("enabled")?.value).toLowerCase() === "true"),
    });

    await reply(interaction, "Option changed");
}

export default saveQueue;