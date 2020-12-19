import { convertStringToFuzzy, generateSearchDocumentCommandArgs } from "@utils/commands";
import { IServiceWithContext, ISearchDocuments } from "./types/index.type";

type SearchDocumentsFunctionParams = ISearchDocuments & IServiceWithContext;
type SearchDocumentsFunction = (params: SearchDocumentsFunctionParams) => Promise<unknown>;
export const searchDocuments: SearchDocumentsFunction = ({ context, indexName, query, options, useFuzzy = false }) => {
    try {
        const conditionallyCheckedQuery = useFuzzy ? convertStringToFuzzy(query) : query;
        const { cmd, args } = generateSearchDocumentCommandArgs({
            indexName,
            query: conditionallyCheckedQuery,
            options,
        });
        return new Promise((resolve, reject) =>
            context.client.send_command(cmd, args, (err: unknown, info: unknown) => {
                if (err) return reject(err);
                resolve(info);
            })
        );
    } catch (error) {
        throw error;
    }
};
