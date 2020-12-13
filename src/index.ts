import { RedisClient } from "redis";
import { IObjectSchema } from "@models/ObjectSchema.type";
import { createFuzzyList } from "./@features/createFuzzyList/createFuzzyList";

export class RediSearchFuzzy {
    public client;
    constructor(redisClient: RedisClient) {
        this.client = redisClient;
    }

    public createIndexList<T>(listName: string, objectSchema: IObjectSchema): string {
        return createFuzzyList({ context: this, listName, objectSchema });
    }
}
