import { IObjectSchema } from "@models/ObjectSchema.type";
import { RediSearchCommands } from "@enums/redisCommands.enum";

interface ICommandReturn {
    cmd: string;
    args: Array<string>;
}

type IGenerateSchemaParams = { indexName: string; schema: IObjectSchema };
type IGenerateSchemaIndexCmd = (params: IGenerateSchemaParams) => ICommandReturn;

type IGenerateAddDocumentParams = { document: Record<string, unknown> };
type IGenerateAddDocumentCmd = (params: IGenerateAddDocumentParams) => ICommandReturn;

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

export const generateAddDocumentCommand: IGenerateAddDocumentCmd = ({ document }) => {
    if (!Object.keys(document).length) throw new Error("Empty or false Document Object given");
    return { cmd: "", args: [""] };
};
