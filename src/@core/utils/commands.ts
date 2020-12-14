import { IObjectSchema } from "@models/ObjectSchema.type";
import { RediSearchCommands } from "@enums/redisCommands.enum";

interface IGenerateSchemaIndex {
    indexName: string;
    schema: IObjectSchema;
}

interface ICommandReturn {
    cmd: string;
    args: Array<string | number>;
}

const SCHEMA = "SCHEMA";
const TEXT_TYPE = "TEXT";
const WEIGHT = "WEIGHT";

export const generateSchemaIndexCommand = ({ indexName, schema }: IGenerateSchemaIndex): ICommandReturn => {
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
