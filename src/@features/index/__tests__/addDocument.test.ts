import { addDocument } from "../indexList.service";
import { generateAddDocumentCommandArgs } from "@utils/commands";
import { RediSearchFuzzy } from "../../../index";
import { RedisClient } from "redis";

jest.mock("@utils/commands");
jest.mock("../../../index");

(generateAddDocumentCommandArgs as jest.Mock).mockImplementation(() => ({ args: [] }));
(RediSearchFuzzy as jest.Mock).mockImplementation(() => ({
    client: {
        hset: () => {},
    },
}));

describe("generateSchemaIndexCommand()", () => {
    it("generateSchemaIndexCommand should call generateAddDocumentCommandArgs and pass the document", () => {
        addDocument({
            context: new RediSearchFuzzy({} as RedisClient),
            key: "products",
            document: {
                testKey: "testValue",
            },
        });
        expect(generateAddDocumentCommandArgs).toHaveBeenCalledWith({ document: { testKey: "testValue" } });
        addDocument({
            context: new RediSearchFuzzy({} as RedisClient),
            key: "xx",
            document: {
                name: "Robert",
                lastname: "California",
            },
        });
        expect(generateAddDocumentCommandArgs).toHaveBeenCalledWith({
            document: {
                name: "Robert",
                lastname: "California",
            },
        });
    });
});
