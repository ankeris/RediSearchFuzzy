import { generateSchemaIndexCommand } from "../commands";

describe("generateSchemaIndexCommand()", () => {
    it("generateSchemaIndexCommand should throw errors", () => {
        expect(() => generateSchemaIndexCommand({ indexName: "products", schema: [] })).toThrow(
            "Empty or false Schema Object given"
        );
    });

    it("generateSchemaIndexCommand should return correct object", () => {
        expect(
            generateSchemaIndexCommand({
                indexName: "myIdx",
                schema: [{ field: "title", weight: 5.0 }, { field: "body" }, { field: "url" }],
            })
        ).toEqual({
            cmd: "FT.CREATE",
            args: ["myIdx", "SCHEMA", "title", "TEXT", "WEIGHT", "5.0", "body", "TEXT", "url", "TEXT"],
        });
        expect(
            generateSchemaIndexCommand({
                indexName: "myIdx",
                schema: [{ field: "title" }],
            })
        ).toEqual({ cmd: "FT.CREATE", args: ["myIdx", "SCHEMA", "title", "TEXT"] });
        expect(
            generateSchemaIndexCommand({
                indexName: "SomeIndexName",
                schema: [{ field: "description" }],
            })
        ).toEqual({ cmd: "FT.CREATE", args: ["SomeIndexName", "SCHEMA", "description", "TEXT"] });
        expect(
            generateSchemaIndexCommand({
                indexName: "SomeIndexName",
                schema: [{ field: "description" }, { field: "imageUrl" }],
            })
        ).toEqual({ cmd: "FT.CREATE", args: ["SomeIndexName", "SCHEMA", "description", "TEXT", "imageUrl", "TEXT"] });
    });

    it("generateSchemaIndexCommand should return correct object when given weight with decimals", () => {
        expect(
            generateSchemaIndexCommand({
                indexName: "myIdx",
                schema: [{ field: "title", weight: 5.5 }, { field: "url" }],
            })
        ).toEqual({ cmd: "FT.CREATE", args: ["myIdx", "SCHEMA", "title", "TEXT", "WEIGHT", "5.5", "url", "TEXT"] });
        expect(
            generateSchemaIndexCommand({
                indexName: "myIdx",
                schema: [{ field: "title", weight: 5.512121 }, { field: "url" }],
            })
        ).toEqual({ cmd: "FT.CREATE", args: ["myIdx", "SCHEMA", "title", "TEXT", "WEIGHT", "5.5", "url", "TEXT"] });
        expect(
            generateSchemaIndexCommand({
                indexName: "myIdx",
                schema: [{ field: "title", weight: 5.09 }, { field: "url" }],
            })
        ).toEqual({ cmd: "FT.CREATE", args: ["myIdx", "SCHEMA", "title", "TEXT", "WEIGHT", "5.1", "url", "TEXT"] });
        expect(
            generateSchemaIndexCommand({
                indexName: "myIdx",
                schema: [{ field: "title", weight: 5.04 }, { field: "url" }],
            })
        ).toEqual({ cmd: "FT.CREATE", args: ["myIdx", "SCHEMA", "title", "TEXT", "WEIGHT", "5.0", "url", "TEXT"] });
        expect(
            generateSchemaIndexCommand({
                indexName: "myIdx",
                schema: [{ field: "title", weight: 5.6 }, { field: "url" }],
            })
        ).toEqual({ cmd: "FT.CREATE", args: ["myIdx", "SCHEMA", "title", "TEXT", "WEIGHT", "5.6", "url", "TEXT"] });
    });

    it("generateSchemaIndexCommand should handle options as well", () => {
        expect(
            generateSchemaIndexCommand({
                indexName: "myIdx",
                schema: [{ field: "title", weight: 5.5 }, { field: "url" }],
                options: ["ON", "HASH", "PREFIX", "1", "test"],
            })
        ).toEqual({
            cmd: "FT.CREATE",
            args: [
                "myIdx",
                "ON",
                "HASH",
                "PREFIX",
                "1",
                "test",
                "SCHEMA",
                "title",
                "TEXT",
                "WEIGHT",
                "5.5",
                "url",
                "TEXT",
            ],
        });
        expect(
            generateSchemaIndexCommand({
                indexName: "myIdx",
                schema: [{ field: "title", weight: 5.5 }, { field: "url" }],
                options: ["ON", "HASH", "PAYLOAD_FIELD", "url"],
            })
        ).toEqual({
            cmd: "FT.CREATE",
            args: [
                "myIdx",
                "ON",
                "HASH",
                "PAYLOAD_FIELD",
                "url",
                "SCHEMA",
                "title",
                "TEXT",
                "WEIGHT",
                "5.5",
                "url",
                "TEXT",
            ],
        });
    });
});
