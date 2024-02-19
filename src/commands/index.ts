import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { ping } from "./ping";
import { playsample } from "./playsample";
import { ytsearch } from "./youtube-search";
import { play } from "./play";

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
    "playsample": playsample,
    "ytsearch": ytsearch,
    "play": play
};

export default commands;