import { IObjectSchema } from "@models/ObjectSchema.type";
import { RediSearchCommands } from "@enums/redisCommands.enum";

interface ICommandReturn {
    cmd: string;
    args: Array<string>;
}

type IGenerateSchemaParams = { indexName: string; schema: IObjectSchema };
type IGenerateSchemaIndexCmd = (params: IGenerateSchemaParams) => ICommandReturn;

type IGenerateAddDocumentParams = { document: Record<string, unknown> };
type IGenerateAddDocumentCmd = (params: IGenerateAddDocumentParams) => Omit<ICommandReturn, "cmd">;

const SCHEMA = "SCHEMA";
const TEXT_TYPE = "TEXT";
const WEIGHT = "WEIGHT";

export const generateSchemaIndexCommand: IGenerateSchemaIndexCmd = ({ indexName, schema }) => {
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

export const generateAddDocumentCommandArgs: IGenerateAddDocumentCmd = ({ document }) => {
    const documentKeys = Object.keys(document);
    const initialAccumulator = { args: [] };
    if (!documentKeys.length) throw new Error("Empty or false Document Object given");
    return documentKeys.reduce((acc: Omit<ICommandReturn, "cmd">, currVal) => {
        return { args: [...acc.args, currVal, document[currVal] as string] };
    }, initialAccumulator);
};
