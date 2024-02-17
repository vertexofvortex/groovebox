import { REST, Routes } from "discord.js";
import commands from "./commands";
import logger from "./logger";
import "dotenv/config";

const rest = new REST().setToken(process.env.DISCORD_TOKEN!);
const commandsToDeploy = [];

for (const [name, command] of Object.entries(commands)) {
    if (!("data" in command) && !("execute" in command)) {
        logger.error(`The command "${name}" is missing a required "data" or "execute" property!`);

        continue;
    }

    try {
        logger.info(`Serializing "${command.data.name}" command...`);

        commandsToDeploy.push(command.data.toJSON());
    } catch (error) {
        logger.error(`An error occured during serialization of "${command.data.name}" command:`, error);
    }
}

(async () => {
    logger.info(`Deploying ${commandsToDeploy.length} application commands`);

    rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID!), { body: commandsToDeploy })
        .then(() => logger.info(`Command deployed/reloaded successfully!`))
        .catch((error) => logger.error(error));
})();