import { RedisClient } from "redis";
import { IObjectSchema } from "@models/ObjectSchema.type";
import { createFuzzyList } from "./@features/createFuzzyList/createFuzzyList";

export class RediSearchFuzzy {
    public client;
    constructor(redisClient: RedisClient) {
        this.client = redisClient;
    }

    public createIndexList(indexName: string, schema: IObjectSchema): boolean {
        return createFuzzyList({ context: this, indexName, schema });
    }
}
