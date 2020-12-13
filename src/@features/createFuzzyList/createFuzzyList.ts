import { IObjectSchema } from "@models/ObjectSchema.type";
import { generateSchemaIndexCommand } from "@utils/generateSchema";
import { RediSearchFuzzy } from "src";

export interface ICreateFuzzyListParams {
    context: RediSearchFuzzy;
    schema: IObjectSchema;
    indexName: string;
}

export const createFuzzyList = ({ context, schema, indexName }: ICreateFuzzyListParams): boolean => {
    try {
        const { cmd, args } = generateSchemaIndexCommand({ indexName, schema });
        return context.client.send_command(cmd, args);
    } catch (error) {
        throw error;
    }
};
