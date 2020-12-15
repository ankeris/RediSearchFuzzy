import { RediSearchCommands } from "@enums/redisCommands.enum";
import { IObjectSchema } from "@models/ObjectSchema.type";
import { generateAddDocumentCommand, generateSchemaIndexCommand } from "@utils/commands";
import { RediSearchFuzzy } from "src";

export interface ICreateIndexListParams {
    context: RediSearchFuzzy;
    schema: IObjectSchema;
    indexName: string;
    options?: {
        /** PREFIX {count} {prefix} tells the index which keys it should index. You can add several prefixes to index. Since the argument is optional, the default is * (all keys) */
        prefix: string;
    };
}

interface IGetIndexListParams extends Omit<ICreateIndexListParams, "schema"> {}
interface IAddDocumentParams extends Omit<ICreateIndexListParams, "schema"> {
    document: Record<string, unknown>;
}

export const createIndexList = ({ context, schema, indexName }: ICreateIndexListParams): boolean => {
    try {
        const { cmd, args } = generateSchemaIndexCommand({ indexName, schema });
        return context.client.send_command(cmd, args);
    } catch (error) {
        throw error;
    }
};

export const getInfoIndexList = ({ context, indexName }: IGetIndexListParams): Promise<string[]> => {
    try {
        return new Promise((resolve) =>
            context.client.send_command(RediSearchCommands.INDEX_INFO, [indexName], (_, info) => resolve(info))
        );
    } catch (error) {
        throw error;
    }
};

export const getAllIndexes = ({ context }: { context: RediSearchFuzzy }): Promise<string[]> => {
    try {
        return new Promise((resolve) =>
            context.client.send_command(RediSearchCommands.INDEX_LIST, [], (_, info) => resolve(info))
        );
    } catch (error) {
        throw error;
    }
};

export const removeIndexList = ({ context, indexName }: IGetIndexListParams): boolean => {
    try {
        return context.client.send_command(RediSearchCommands.INDEX_DROP, [indexName]);
    } catch (error) {
        throw error;
    }
};

export const addDocument = ({ context, indexName, document }: IAddDocumentParams): boolean => {
    try {
        const { args } = generateAddDocumentCommand({ document });
        return context.client.hset(indexName, args);
    } catch (error) {
        throw error;
    }
};
