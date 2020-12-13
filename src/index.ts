import { RedisClient as RedisClient } from "redis";

export class RediSearchFuzzy {
    private client;
    constructor(redisClient: RedisClient) {
        this.client = redisClient;
    }

    getClient() {
        return this.client;
    }
}
