import { IObjectSchema } from "@features/index/types/ObjectSchema.type";
import { RediSearchCommands } from "@enums/redisCommands.enum";
import { ISearchDocuments } from "@features/index/types/index.type";

interface ICommandReturn {
    cmd: string;
    args: Array<string>;
}

const SCHEMA = "SCHEMA";
const TEXT_TYPE = "TEXT";
const WEIGHT = "WEIGHT";
type IGenerateSchemaParams = { indexName: string; schema: IObjectSchema };
type IGenerateSchemaIndexFunction = (params: IGenerateSchemaParams) => ICommandReturn;
export const generateSchemaIndexCommand: IGenerateSchemaIndexFunction = ({ indexName, schema }) => {
    if (!schema.length) throw new Error("Empty or false Schema Object given");
    return schema.reduce(
        (acc: ICommandReturn, currVal) => {
            if (currVal.weight) {
                return { ...acc, args: [...acc.args, currVal.field, TEXT_TYPE, WEIGHT, currVal.weight.toFixed(1)] };
            } else {
                return { ...acc, args: [...acc.args, currVal.field, TEXT_TYPE] };
            }
        },
        { cmd: RediSearchCommands.INDEX_CREATE, args: [indexName, SCHEMA] }
    );
};

type IGenerateAddDocumentParams = { document: Record<string, unknown> };
type IGenerateAddDocumentFunction = (params: IGenerateAddDocumentParams) => Omit<ICommandReturn, "cmd">;
export const generateAddDocumentCommandArgs: IGenerateAddDocumentFunction = ({ document }) => {
    const documentKeys = Object.keys(document);
    const initialAccumulator = { args: [] };
    if (!documentKeys.length) throw new Error("Empty or false Document Object given");
    return documentKeys.reduce((acc: Omit<ICommandReturn, "cmd">, currVal) => {
        return { args: [...acc.args, currVal, document[currVal] as string] };
    }, initialAccumulator);
};

type IGenerateSearchDocumentFunction = (params: ISearchDocuments) => ICommandReturn;
export const generateSearchDocumentCommandArgs: IGenerateSearchDocumentFunction = ({ indexName, query, options }) => {
    if (options) {
        const optionsKeys = Object.keys(options);
    }
    return { cmd: RediSearchCommands.INDEX_SEARCH, args: [indexName, query] };
};
