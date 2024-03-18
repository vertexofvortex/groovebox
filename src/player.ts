import { AudioPlayerStatus, NoSubscriberBehavior, createAudioPlayer, createAudioResource } from "@discordjs/voice";
import { User } from "discord.js";
import { getService } from "./services";
import logger from "@/utils/logger";

export interface AudioResourceType {
    name: "youtube" | "yandex",
    displayName: "YouTube" | "Yandex",
}

export interface GrooveboxAudioResource {
    title: string,
    coverUrl?: string,
    source: string | number,
    addedBy: User,
    type: AudioResourceType,
}

class AudioPlayer {
    constructor() {
        this.player.on(AudioPlayerStatus.Idle, this.handleIdle);
    }

    player = createAudioPlayer({
        behaviors: { noSubscriber: NoSubscriberBehavior.Pause },
    });

    private queue: GrooveboxAudioResource[] = [];
    currentPlaying: GrooveboxAudioResource | undefined;

    // TODO: add to top
    addResource = (resource: GrooveboxAudioResource) => {
        logger.debug("Resource added:", JSON.stringify(resource));

        this.queue.push(resource);

        if (this.queue.length == 1 && !this.currentPlaying) this.play(0);
    };

    removeResource = (index: number) => {
        logger.debug(`Resource with index ${index} removed from the queue`);

        this.queue.splice(index, 1);
    };
    
    getQueue = () => {
        return this.queue;
    };

    play = async (index: number) => {
        logger.debug("Play method called");

        const fetchedAudioResource = await getService(this.queue[index].type.name)?.fetchAudioResource(this.queue[index]);

        if (!fetchedAudioResource) {
            logger.warn(`Resource "${this.queue[index].title}" cannot be fetched somehow, skipping...`);

            await this.play(index + 1);
        }

        this.player.play(createAudioResource(fetchedAudioResource!));
        this.currentPlaying = this.queue[index];
        this.removeResource(index);
    };

    skip = () => {
        if (this.queue.length > 0) {
            this.play(0);
        } else {
            this.clear();
        }
    };

    pause = () => {
        if (this.player.state.status == AudioPlayerStatus.Paused) {
            return false;
        }

        this.player.pause();

        return true;
    };

    resume = () => {
        if (this.player.state.status != AudioPlayerStatus.Paused) {
            return false;
        }

        this.player.unpause();

        return true;
    };

    clear = () => {
        logger.debug("Player cleared");

        this.player.stop();
        this.queue = [];
        this.currentPlaying = undefined;
    };

    handleIdle = () => {
        logger.debug("player status changed to idle");

        if (this.queue.length != 0) {
            this.play(0);
        } else {
            this.currentPlaying = undefined;
        }
    };
}

class AudioPlayerManager {
    constructor() {}

    players = new Map<string, AudioPlayer>;

    getPlayer = (guildId: string): AudioPlayer => {
        if (!this.players.has(guildId)) {
            this.players.set(guildId, new AudioPlayer());
        }

        return this.players.get(guildId)!;
    };
}

export const playerManager = new AudioPlayerManager();