import logger from "@utils/logger";
import { createClient } from "redis";

class Store {
    constructor(redisClient: ReturnType<typeof createClient>, guildId: string) {
        this.redis = redisClient;
        this.guildId = guildId;
    }

    redis;
    guildId;

    set = async (key: string, value: object) => {
        logger.debug(`SET ${this.guildId}_${key}`, value);
        return await this.redis.set(`${this.guildId}_${key}`, JSON.stringify(value));
    };

    get = async (key: string) => {
        const value = await this.redis.get(`${this.guildId}_${key}`);

        if (!value) return null;

        logger.debug(`GET ${this.guildId}_${key}`, value);
        return JSON.parse(value);
    };
}

class StoreManager {
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