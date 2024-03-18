import logger from "@/utils/logger";
import { createClient } from "redis";

export interface StoreData {
    config: Configuration,
    pinnedMessageId: string,
}

export interface Configuration {
    "save-queue": boolean,
    "bind-to-channel": string,
    "restrict-other-channels": boolean,
    "command-output-visibility": boolean,
    "command-output-ttl": number,
}

export class Store {
    constructor(redisClient: ReturnType<typeof createClient>, guildId: string) {
        this.redis = redisClient;
        this.guildId = guildId;
    }

    redis;
    guildId;

    set = async <StoreEntry>(key: keyof StoreData, value: StoreEntry) => {
        logger.debug(`SET ${this.guildId}_${key}`, value);
        
        await this.redis.set(`${this.guildId}_${key}`, JSON.stringify(value));
    };

    update = async <StoreEntry>(key: keyof StoreData, value: Partial<StoreEntry>) => {
        const oldValue = await this.get<StoreEntry>(key);

        await this.set(key, {
            ...oldValue,
            ...value,
        });
    };

    get = async <StoreEntry>(key: keyof StoreData): Promise<StoreEntry | null> => {
        const value = await this.redis.get(`${this.guildId}_${key}`);

        if (!value) return null;

        logger.debug(`GET ${this.guildId}_${key}`, value);
        
        return JSON.parse(value);
    };
}

export class StoreManager {
    constructor() {
        this.redis = createClient();
        // TODO: do something with this
        this.redis.connect().then(() => logger.info("Redis is running"));
    }

    redis;
    stores = new Map<string, Store>;

    getStore = (guildId: string): Store => {
        if (!this.stores.has(guildId)) {
            this.stores.set(guildId, new Store(this.redis, guildId));
        }

        return this.stores.get(guildId)!;
    };
}

export const storeManager = new StoreManager();