import { searchDocuments } from "../indexSearch.service";
import { generateSearchDocumentCommandArgs, convertStringToFuzzy } from "@utils/commands";
import { RediSearchFuzzy } from "../../../index";
import { RedisClient } from "redis";

jest.mock("@utils/commands");
jest.mock("../../../index");

(generateSearchDocumentCommandArgs as jest.Mock).mockImplementation(() => ({ args: [] }));
(convertStringToFuzzy as jest.Mock).mockImplementation(() => "(%Hello%&%world%|world*)");
(RediSearchFuzzy as jest.Mock).mockImplementation(() => ({
    client: {
        send_command: () => {},
    },
}));

describe("searchDocuments()", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("searchDocuments should give a fuzzy string only when useFuzzy is true", () => {
        searchDocuments({
            indexName: "TESTINDEX",
            context: new RediSearchFuzzy({} as RedisClient),
            query: "Hello world",
            useFuzzy: true,
        });
        expect(generateSearchDocumentCommandArgs).toHaveBeenCalledWith({
            indexName: "TESTINDEX",
            query: "(%Hello%&%world%|world*)",
        });
        expect(generateSearchDocumentCommandArgs).toHaveBeenCalledTimes(1);
    });

    it("searchDocuments should not make a fuzzy string when either on option is given or given false", () => {
        searchDocuments({
            indexName: "TESTINDEX",
            context: new RediSearchFuzzy({} as RedisClient),
            query: "Hello world",
            useFuzzy: false,
        });
        expect(generateSearchDocumentCommandArgs).toHaveBeenCalledWith({
            indexName: "TESTINDEX",
            query: "Hello world",
        });
        expect(generateSearchDocumentCommandArgs).toHaveBeenCalledTimes(1);
    });
});
