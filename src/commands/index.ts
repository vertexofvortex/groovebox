import { ChatInputCommandInteraction } from "discord.js";
import { ping } from "@commands/ping";
import { play } from "@commands/play";
import { skip } from "@commands/skip";
import { queue } from "@commands/queue";
import { config } from "@commands/config";
import { pause } from "@commands/pause";
import { resume } from "@commands/resume";

interface Command {
    // FIXME:
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

interface CommandList {
    [key: string]: Command;
}

const commands: CommandList = {
    "ping": ping,
    "play": play,
    "skip": skip,
    "queue": queue,
    "pause": pause,
    "resume": resume,
    "config": config,
};

export default commands;