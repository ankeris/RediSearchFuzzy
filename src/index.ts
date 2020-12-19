import { RedisClient } from "redis";
import { IObjectSchema } from "@features/index/types/ObjectSchema.type";
import {
    createIndexList as _createIndexList,
    getInfoIndexList as _getInfoIndexList,
    removeIndexList as _removeIndexList,
    getAllIndexes,
    addDocument as _addDocument,
} from "./@features/index/indexList.service";
import { searchDocuments as _searchDocuments } from "@features/index/indexSearch.service";
import { ISearchDocuments } from "@features/index/types/index.type";

export class RediSearchFuzzy {
    public readonly client;

    constructor(public redisClient: RedisClient) {
        this.client = redisClient;
    }

    public createIndexList(indexName: string, schema: IObjectSchema): boolean {
        return _createIndexList({ context: this, indexName, schema });
    }

    public async getInfoIndexList(indexName: string): Promise<string[]> {
        return _getInfoIndexList({ context: this, indexName });
    }

    public async getIndexesList(): Promise<string[]> {
        return getAllIndexes({ context: this });
    }

    public removeIndexList(indexName: string): boolean {
        return _removeIndexList({ context: this, indexName });
    }

    public addDocument(key: string, document: Record<string, string>): boolean {
        return _addDocument({ context: this, key, document });
    }

    public searchDocuments(params: ISearchDocuments): Promise<unknown> {
        return _searchDocuments({ ...params, context: this });
    }
}
