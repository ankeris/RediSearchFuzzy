import { generateAddDocumentCommandArgs } from "../commands";

describe("generateAddDocumentCommandArgs()", () => {
    it("generateAddDocumentCommandArgs should throw errors", () => {
        expect(() => generateAddDocumentCommandArgs({ document: {} })).toThrow("Empty or false Document Object given");
    });

    it("generateAddDocumentCommandArgs should return correct arguments when given object", () => {
        expect(
            generateAddDocumentCommandArgs({
                document: {
                    name: "Rick",
                    lastName: "Grimes",
                    age: 30,
                },
            })
        ).toEqual({
            args: ["name", "Rick", "lastName", "Grimes", "age", 30],
        });
        expect(
            generateAddDocumentCommandArgs({
                document: {
                    name: "Rick",
                },
            })
        ).toEqual({
            args: ["name", "Rick"],
        });
    });
});
