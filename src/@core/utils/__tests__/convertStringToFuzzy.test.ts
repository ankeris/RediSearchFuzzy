import { convertStringToFuzzy } from "@utils/commands";

describe("convertStringToFuzzy()", () => {
    it("convertStringToFuzzy should return an empty string when empty string is given", () => {
        expect(convertStringToFuzzy("")).toEqual("");
        expect(convertStringToFuzzy(" ")).toEqual("");
        expect(convertStringToFuzzy("      ")).toEqual("");
    });

    it(`convertStringToFuzzy()
        should return every word wrapped in % and with & between them. 
        The last word should end with * and its copy with %<word>% with an OR`, () => {
        expect(convertStringToFuzzy("Hello world")).toEqual("((Hello world)|(Hello world*)|(%Hello%|%world%))");
        expect(convertStringToFuzzy("Ill be back")).toEqual("((Ill be back)|(Ill be back*)|(%Ill%|%be%|%back%))");
    });

    it(`convertStringToFuzzy() should return correct single word values`, () => {
        expect(convertStringToFuzzy("Super")).toEqual("(%Super%|Super*)");
        expect(convertStringToFuzzy("x")).toEqual("(%x%|x*)");
    });
});
