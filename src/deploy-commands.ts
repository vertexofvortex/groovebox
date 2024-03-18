import "module-alias/register";
import { REST, Routes } from "discord.js";
import commands from "@/commands/index";
import logger from "@/utils/logger";
import config from "@/config";

const rest = new REST().setToken(config.DISCORD_TOKEN);
const commandsToDeploy = [];

for (const [name, command] of Object.entries(commands)) {
    if (!("data" in command) && !("execute" in command)) {
        logger.error(`The command "${name}" is missing a required "data" or "execute" property!`);

        continue;
    }

    try {
        logger.info(`Processing "${command.data.name}" command...`);

        commandsToDeploy.push(command.data.toJSON!());
    } catch (error) {
        logger.error(`An error occured during serialization of "${command.data.name}" command:`, error);
    }
}

logger.info(`Deploying ${commandsToDeploy.length} application commands...`);

rest.put(Routes.applicationCommands(config.DISCORD_CLIENT_ID), { body: commandsToDeploy })
    .then(() => logger.info("Commands deployed/reloaded successfully!"))
    .catch((error) => logger.error(error))
    .finally(() => process.exit(0));