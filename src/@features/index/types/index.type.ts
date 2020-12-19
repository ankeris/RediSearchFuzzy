import { RediSearchFuzzy } from "src";
import { IObjectSchema } from "./ObjectSchema.type";

export interface IServiceWithContext {
    context: RediSearchFuzzy;
}

export interface ICreateIndexListParams {
    indexName: string;
    schema: IObjectSchema;
    /** PREFIX {count} {prefix} tells the index which keys it should index. You can add several prefixes to index. Since the argument is optional, the default is * (all keys) */
    options?: string[];
}

export interface IGetIndexListParams {
    indexName: string;
}

export interface IAddDocumentParams {
    document: Record<string, string>;
    key: string;
}

export interface ISearchDocuments {
    indexName: string;
    query: string;
    useFuzzy?: boolean;
    /* Provide own string for additional options in a string 
    https://oss.redislabs.com/redisearch/Commands/#ftsearch */
    options?: string[];
}
