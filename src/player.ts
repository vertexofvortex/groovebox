import { AudioPlayerStatus, NoSubscriberBehavior, createAudioPlayer, createAudioResource } from "@discordjs/voice";
import { User } from "discord.js";
import { Readable } from "stream";
import logger from "./logger";
import ytdl from "ytdl-core";

type AudioResourceType = "youtube" | "yandex" | "spotify";

function fetchAudioResource(resource: AudioResource): Readable {
    if (resource.type === "youtube") {
        /* TODO: get rid of ytdl because it sometimes randomly
        throws "AudioPlayerError: aborted" exception: 
        https://github.com/discordjs/voice/issues/202 */
        return ytdl(resource.source, { quality: "highestaudio", dlChunkSize: 0 });
    }

    throw new Error("Cannot fetch this source");
}

function parseAudioResourceType(source: string): AudioResourceType {
    if (source.includes("http://www.youtube.com/watch")) {
        return "youtube";
    }

    throw new Error("Cannot parse audio resource type");
}

interface AudioResource {
    title: string,
    source: string,
    addedBy: User,
    type: AudioResourceType,
}

class AudioPlayer {
    constructor() {
        this.player.on(AudioPlayerStatus.Idle, this.handleIdle);
    }

    player = createAudioPlayer({
        behaviors: { noSubscriber: NoSubscriberBehavior.Pause }
    });

    private queue: AudioResource[] = [];
    currentPlaying: AudioResource | undefined;

    // TODO: add to top
    addResource = (resource: AudioResource) => {
        logger.info("Resource added:", JSON.stringify(resource));

        this.queue.push(resource);

        if (this.queue.length == 1 && !this.currentPlaying) this.play(0);
    };

    removeResource = (index: number) => {
        logger.info(`Resource with index ${index} removed from the queue`);

        this.queue.splice(index, 1);
    };
    
    getQueue = () => {
        return this.queue;
    };

    play = (index: number) => {
        logger.info("Play method called");

        const audioResource = createAudioResource(fetchAudioResource(this.queue[index]));

        this.player.play(audioResource);
        this.currentPlaying = this.queue[index];
        this.removeResource(index);
    };

    handleIdle = () => {
        logger.info("player status changed to idle");

        if (this.queue.length != 0) {
            this.play(0);
        } else {
            this.currentPlaying = undefined;
        }
    };
}

class AudioPlayerManager {

}

export const audioPlayerInstance = new AudioPlayer();