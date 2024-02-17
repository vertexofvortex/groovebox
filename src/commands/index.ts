import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { ping } from "./ping";
import { playsample } from "./playsample";

interface Command {
    // FIXME:
    data: any;
    execute: (interaction: CommandInteraction) => Promise<void>;
}

interface CommandList {
    [key: string]: Command;
}

const commands: CommandList = {
    "ping": ping,
    "playsample": playsample
};

export default commands;