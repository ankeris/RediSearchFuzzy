import { RedisClient } from "redis";
import { IObjectSchema } from "@models/ObjectSchema.type";
import { createIndexList as _createIndexList } from "./@features/createIndexList/createIndexList";

export class RediSearchFuzzy {
    public readonly client;
    constructor(redisClient: RedisClient) {
        this.client = redisClient;
    }

    public createIndexList(indexName: string, schema: IObjectSchema): boolean {
        return _createIndexList({ context: this, indexName, schema });
    }
}
