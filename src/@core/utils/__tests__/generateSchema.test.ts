const { generateSchemaCommand } = require("../generateSchema");

describe("generateSchemaCommand()", () => {
    it("generateSchemaCommand should return correct string when given an object", () => {
        expect(generateSchemaCommand({})).toEqual("");
        expect(generateSchemaCommand({})).toEqual("");
        expect(generateSchemaCommand({})).toEqual("");
    });
});
