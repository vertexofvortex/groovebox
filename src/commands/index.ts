import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { ping } from "@/commands/ping";
import { play } from "@/commands/play";
import { skip } from "@/commands/skip";
import { queue } from "@/commands/queue";
import { config } from "@/commands/config/config";
import { pause } from "@/commands/pause";
import { resume } from "@/commands/resume";

interface Command {
    data: Partial<SlashCommandBuilder>;
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