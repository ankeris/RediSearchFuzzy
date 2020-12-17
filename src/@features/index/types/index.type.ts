import { RediSearchFuzzy } from "src";
import { IObjectSchema } from "./ObjectSchema.type";

interface IIndexParamsBase {
    indexName: string;
    context: RediSearchFuzzy;
}

export interface ICreateIndexListParams extends IIndexParamsBase {
    schema: IObjectSchema;
    options?: {
        /** PREFIX {count} {prefix} tells the index which keys it should index. You can add several prefixes to index. Since the argument is optional, the default is * (all keys) */
        prefix?: string;
    };
}

export interface IGetIndexListParams extends Omit<IIndexParamsBase, "schema"> {}

export interface IAddDocumentParams {
    context: RediSearchFuzzy;
    document: Record<string, string>;
    key: string;
}

export interface ISearchDocuments extends IIndexParamsBase {
    query: string;
    options: {
        /* Options explicitly described in: https://oss.redislabs.com/redisearch/Commands/#ftsearch */
        PAYLOAD?: unknown;
        NOCONTENT?: boolean;
        VERBATIM?: boolean;
        NOSTOPWORDS?: boolean;
        WITHSCORES?: boolean;
        WITHPAYLOADS?: boolean;
        WITHSORTKEYS?: boolean;
        FILTER?: {
            numericField: string;
            min: number;
            max: number;
        };
        GEOFILTER?: {
            geo_field: string;
            lon: string;
            lat: string;
            radius: string;
            unit: "m" | "km" | "mi" | "ft";
        };
        INKEYS?: {
            num: number;
            field: string;
        };
        INFIELDS?: {
            num: number;
            field: string;
        };
        SUMMARIZE?: {
            FIELDS?: {
                num: number;
                field: string;
            };
            // In future releases add FRAGS & SEPARATOR
        };
        HIGHLIGHT?: {
            FIELDS?: {
                num: number;
                field: string;
            };
            // In future releases add TAGS
        };
        SLOP?: {
            value: string;
            INRODER?: boolean;
        };
        SORTBY?: {
            field: string;
            value: "ASC" | "DESC";
        };
        LIMIT?: {
            offset: number;
            num: number;
        };
        /* Provide own string for additional options not that are supported here */
        REST_OPTIONS?: string;
    };
}
