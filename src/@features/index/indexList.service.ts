import { RediSearchCommands } from "@enums/redisCommands.enum";
import { IObjectSchema } from "@features/index/types/ObjectSchema.type";
import { generateAddDocumentCommandArgs, generateSchemaIndexCommand } from "@utils/commands";
import { RediSearchFuzzy } from "src";
import { IAddDocumentParams, ICreateIndexListParams, IGetIndexListParams } from "./types/index.type";

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

export const addDocument = ({ context, key, document }: IAddDocumentParams): boolean => {
    try {
        const { args } = generateAddDocumentCommandArgs({ document });
        return context.client.hset(key, args);
    } catch (error) {
        throw error;
    }
};
