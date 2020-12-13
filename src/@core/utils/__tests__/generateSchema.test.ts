import { generateSchemaIndexCommand } from "../generateSchema";

describe("generateSchemaIndexCommand()", () => {
    it("generateSchemaIndexCommand should throw errors", () => {
        expect(() => generateSchemaIndexCommand({ indexName: "products", schema: [] })).toThrow(
            "Empty or false Schema Object given"
        );
    });

    it("generateSchemaIndexCommand should return correct string when given an object", () => {
        expect(
            generateSchemaIndexCommand({
                indexName: "myIdx",
                schema: [{ field: "title", weight: 5.0 }, { field: "body" }, { field: "url" }],
            })
        ).toEqual("FT.CREATE myIdx SCHEMA title TEXT WEIGHT 5.0 body TEXT url TEXT");
        expect(
            generateSchemaIndexCommand({
                indexName: "myIdx",
                schema: [{ field: "title" }],
            })
        ).toEqual("FT.CREATE myIdx SCHEMA title TEXT");
        expect(
            generateSchemaIndexCommand({
                indexName: "SomeIndexName",
                schema: [{ field: "description" }],
            })
        ).toEqual("FT.CREATE SomeIndexName SCHEMA description TEXT");
        expect(
            generateSchemaIndexCommand({
                indexName: "SomeIndexName",
                schema: [{ field: "description" }, { field: "imageUrl" }],
            })
        ).toEqual("FT.CREATE SomeIndexName SCHEMA description TEXT imageUrl TEXT");
    });

    it("generateSchemaIndexCommand should return correct string when given weight with decimals", () => {
        expect(
            generateSchemaIndexCommand({
                indexName: "myIdx",
                schema: [{ field: "title", weight: 5.5 }, { field: "url" }],
            })
        ).toEqual("FT.CREATE myIdx SCHEMA title TEXT WEIGHT 5.5 body TEXT url TEXT");
        expect(
            generateSchemaIndexCommand({
                indexName: "myIdx",
                schema: [{ field: "title", weight: 5.512121 }, { field: "url" }],
            })
        ).toEqual("FT.CREATE myIdx SCHEMA title TEXT WEIGHT 5.5 body TEXT url TEXT");
        expect(
            generateSchemaIndexCommand({
                indexName: "myIdx",
                schema: [{ field: "title", weight: 5.09 }, { field: "url" }],
            })
        ).toEqual("FT.CREATE myIdx SCHEMA title TEXT WEIGHT 5.1 body TEXT url TEXT");
        expect(
            generateSchemaIndexCommand({
                indexName: "myIdx",
                schema: [{ field: "title", weight: 5.04 }, { field: "url" }],
            })
        ).toEqual("FT.CREATE myIdx SCHEMA title TEXT WEIGHT 5.0 body TEXT url TEXT");
        expect(
            generateSchemaIndexCommand({
                indexName: "myIdx",
                schema: [{ field: "title", weight: 5.6 }, { field: "url" }],
            })
        ).toEqual("FT.CREATE myIdx SCHEMA title TEXT WEIGHT 5.6 body TEXT url TEXT");
    });
});
