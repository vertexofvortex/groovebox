import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { ping } from "./ping";

interface Command {
    data: SlashCommandBuilder;
    execute: (interaction: CommandInteraction) => Promise<void>;
}

interface CommandList {
    [key: string]: Command;
}

const commands: CommandList = {
    "ping": ping,
};

export default commands;