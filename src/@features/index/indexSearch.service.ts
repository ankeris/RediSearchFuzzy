import { RediSearchCommands } from "@enums/redisCommands.enum";
import { ISearchDocuments } from "./types/index.type";

export const searchDocuments = ({ context, indexName, query }: ISearchDocuments): Promise<string[]> => {
    try {
        return new Promise((resolve) =>
            context.client.send_command(RediSearchCommands.INDEX_SEARCH, [indexName], (_, info) => resolve(info))
        );
    } catch (error) {
        throw error;
    }
};
