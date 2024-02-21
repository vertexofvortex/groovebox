import { Readable } from "stream";
import { GrooveboxAudioResource } from "../player";
import { CommandInteraction } from "discord.js";

interface BaseMusicService {
    find(query: string, interaction: CommandInteraction): Promise<GrooveboxAudioResource[] | undefined>,
    findFirst(query: string, interaction: CommandInteraction): Promise<GrooveboxAudioResource | undefined>,
    fetchAudioResource(resource: GrooveboxAudioResource): Promise<Readable | undefined>,
}

export default BaseMusicService;