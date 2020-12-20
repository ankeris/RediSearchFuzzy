import { RediSearchCommands } from "@enums/redisCommands.enum";
import { generateAddDocumentCommandArgs, generateSchemaIndexCommand } from "@utils/commands";
import { RediSearchFuzzy } from "src";
import {
    IAddDocumentParams,
    ICreateIndexListParams,
    IGetIndexListParams,
    IServiceWithContext,
} from "./types/index.type";

export const createIndexList = ({
    context,
    schema,
    indexName,
    options,
}: ICreateIndexListParams & IServiceWithContext): boolean => {
    try {
        const { cmd, args } = generateSchemaIndexCommand({ indexName, schema, options });
        return context.client.send_command(cmd, args);
    } catch (error) {
        throw error;
    }
};

export const getInfoIndexList = ({
    context,
    indexName,
}: IGetIndexListParams & IServiceWithContext): Promise<string[]> => {
    return new Promise((resolve) =>
        context.client.send_command(RediSearchCommands.INDEX_INFO, [indexName], (_, info: string[]) => {
            resolve(info);
        })
    );
};

export const getAllIndexes = ({ context }: { context: RediSearchFuzzy }): Promise<string[]> => {
    return new Promise((resolve, reject) =>
        context.client.send_command(RediSearchCommands.INDEX_LIST, [], (err, info) => {
            if (err) reject(err);
            resolve(info);
        })
    );
};

export const removeIndexList = ({ context, indexName }: IGetIndexListParams & IServiceWithContext): boolean => {
    try {
        return context.client.send_command(RediSearchCommands.INDEX_DROP, [indexName]);
    } catch (error) {
        throw error;
    }
};

export const addDocument = ({ context, key, document }: IAddDocumentParams & IServiceWithContext): boolean => {
    try {
        const { args } = generateAddDocumentCommandArgs({ document });
        return context.client.hset(key, args);
    } catch (error) {
        throw error;
    }
};
