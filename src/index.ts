import { RedisClient } from "redis";
import { IObjectSchema } from "@models/ObjectSchema.type";
import {
    createIndexList as _createIndexList,
    getInfoIndexList as _getInfoIndexList,
    removeIndexList as _removeIndexList,
} from "./@features/index/indexList.service";

export class RediSearchFuzzy {
    public readonly client;

    constructor(redisClient: RedisClient) {
        this.client = redisClient;
    }

    public createIndexList(indexName: string, schema: IObjectSchema): boolean {
        return _createIndexList({ context: this, indexName, schema });
    }

    public async getInfoIndexList(indexName: string): Promise<string[]> {
        return _getInfoIndexList({ context: this, indexName });
    }

    public removeIndexList(indexName: string): boolean {
        return _removeIndexList({ context: this, indexName });
    }
}
