import { generateSearchDocumentCommandArgs } from "@utils/commands";
import { IIndexParamsBase, ISearchDocuments } from "./types/index.type";

type SearchDocumentsFunctionParams = ISearchDocuments & IIndexParamsBase;
type SearchDocumentsFunction = (params: SearchDocumentsFunctionParams) => Promise<unknown>;
export const searchDocuments: SearchDocumentsFunction = ({
    context,
    indexName,
    query,
    options = {},
    useFuzzy = false,
}) => {
    try {
        const { cmd, args } = generateSearchDocumentCommandArgs({ indexName, query, options });
        return new Promise((resolve) =>
            context.client.send_command(cmd, args, (_: unknown, info: unknown) => resolve(info))
        );
    } catch (error) {
        throw error;
    }
};
