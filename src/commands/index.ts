import { CommandInteraction } from "discord.js";
import { ping } from "@commands/ping";
import { play } from "@commands/play";

interface Command {
    // FIXME:
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    execute: (interaction: CommandInteraction) => Promise<void>;
}

interface CommandList {
    [key: string]: Command;
}

const commands: CommandList = {
    "ping": ping,
    "play": play,
};

export default commands;