import { ChatInputCommandInteraction } from "discord.js";
import { Configuration, Store } from "../../../store";
import reply from "@utils/reply";

async function getConfig(interaction: ChatInputCommandInteraction, store: Store) {
    const config = await store.get<Configuration>("config");

    if (!config) {
        await reply(interaction, "You haven't configured any option yet");

        return;
    }

    await reply(interaction, `Current configuration:\n\`\`\`${Object.entries(config).map((v) => `${v[0].padEnd(40, " ")} ${v[1]}`).join("\n")}\`\`\``);
}

export default getConfig;