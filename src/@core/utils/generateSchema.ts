import { IObjectSchema } from "@models/ObjectSchema.type";

interface IGenerateSchemaIndex {
    indexName: string;
    schema: IObjectSchema;
}

interface IGenerateSchemaIndexReturn {
    cmd: string;
    args: Array<string | number>;
}

const CREATE_CMD = "FT.CREATE";
const SCHEMA = "SCHEMA";
const TEXT_TYPE = "TEXT";
const WEIGHT = "WEIGHT";

export const generateSchemaIndexCommand = ({ indexName, schema }: IGenerateSchemaIndex): IGenerateSchemaIndexReturn => {
    if (!schema.length) throw new Error("Empty or false Schema Object given");
    return schema.reduce(
        (acc: IGenerateSchemaIndexReturn, currVal) => {
            if (currVal.weight) {
                return { ...acc, args: [...acc.args, currVal.field, TEXT_TYPE, WEIGHT, currVal.weight.toFixed(1)] };
            } else {
                return { ...acc, args: [...acc.args, currVal.field, TEXT_TYPE] };
            }
        },
        { cmd: CREATE_CMD, args: [indexName, SCHEMA] }
    );
};
