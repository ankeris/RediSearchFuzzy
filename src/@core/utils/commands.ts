import { RediSearchCommands } from "@enums/redisCommands.enum";
import { ICreateIndexListParams, ISearchDocuments } from "@features/index/types/index.type";

interface ICommandReturn {
    cmd: string;
    args: Array<string>;
}

const SCHEMA = "SCHEMA";
const TEXT_TYPE = "TEXT";
const WEIGHT = "WEIGHT";
type IGenerateSchemaIndexFunction = (params: ICreateIndexListParams) => ICommandReturn;
export const generateSchemaIndexCommand: IGenerateSchemaIndexFunction = ({ indexName, schema, options }) => {
    if (!schema.length) throw new Error("Empty or false Schema Object given");
    return schema.reduce(
        (acc: ICommandReturn, currVal) => {
            if (currVal.weight) {
                return { ...acc, args: [...acc.args, currVal.field, TEXT_TYPE, WEIGHT, currVal.weight.toFixed(1)] };
            } else {
                return { ...acc, args: [...acc.args, currVal.field, TEXT_TYPE] };
            }
        },
        {
            cmd: RediSearchCommands.INDEX_CREATE,
            args: options?.length ? [indexName, ...options, SCHEMA] : [indexName, SCHEMA],
        }
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

export const convertStringToFuzzy = (string: string) => {
    if (typeof string !== "string") throw new Error("Must be a string");
    if (!string.length || !string.trim().length) return "";
    const arrOfStrings = string.split(" ");
    const lastWord = arrOfStrings[arrOfStrings.length - 1];
    const wordsWrapperWithPercentSign = arrOfStrings.map((word) => `%${word}%`);
    return `(${wordsWrapperWithPercentSign.join("|")}|${lastWord}*)`;
};

type IGenerateSearchDocumentFunction = (params: ISearchDocuments) => ICommandReturn;
export const generateSearchDocumentCommandArgs: IGenerateSearchDocumentFunction = ({ indexName, query, options }) => {
    const args = options?.length ? [indexName, query, ...options] : [indexName, query];
    return { cmd: RediSearchCommands.INDEX_SEARCH, args };
};
