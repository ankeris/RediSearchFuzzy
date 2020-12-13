import { IObjectSchema } from "@models/ObjectSchema.type";

interface IGenerateSchemaIndex {
    indexName: string;
    schema: IObjectSchema;
}

const CREATE_CMD = "FT.CREATE";
const SCHEMA = "SCHEMA";
const TEXT_TYPE = "TEXT";
const WEIGHT = "WEIGHT";

export const generateSchemaIndexCommand = ({ indexName, schema }: IGenerateSchemaIndex): string => {
    if (!schema.length) throw new Error("Empty or false Schema Object given");
    return schema.reduce((acc: string, currVal) => {
        const fieldWithPossiblyWeight = currVal.weight
            ? `${currVal.field} ${TEXT_TYPE} ${WEIGHT} ${currVal.weight.toFixed(1)}`
            : `${currVal.field} ${TEXT_TYPE}`;
        return `${acc} ${fieldWithPossiblyWeight}`;
    }, `${CREATE_CMD} ${indexName} ${SCHEMA}`);
};
