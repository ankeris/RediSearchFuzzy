import { RediSearchCommands } from "@enums/redisCommands.enum";
import { generateSearchDocumentCommandArgs } from "@utils/commands";

describe("generateSearchDocumentCommandArgs()", () => {
    const indexName = "PRODUCTS";
    it("generateSearchDocumentCommandArgs should return correct cmd", () => {
        expect(generateSearchDocumentCommandArgs({ indexName, query: "good" }).cmd).toEqual(
            RediSearchCommands.INDEX_SEARCH
        );
    });

    it("generateSearchDocumentCommandArgs should return correct args", () => {
        expect(generateSearchDocumentCommandArgs({ indexName, query: "good" }).args).toEqual(["PRODUCTS", "good"]);

        expect(generateSearchDocumentCommandArgs({ indexName, query: "(%good%&%item%)" }).args).toEqual([
            "PRODUCTS",
            "(%good%&%item%)",
        ]);
    });
});
