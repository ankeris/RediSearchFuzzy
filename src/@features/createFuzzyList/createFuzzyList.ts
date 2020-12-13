import { RediSearchFuzzy } from "src";

export interface ICreateFuzzyListParams<O> {
    context: RediSearchFuzzy;
    objectSchema: O;
    listName: string;
}

export const createFuzzyList = <Obj>({ context, objectSchema, listName }: ICreateFuzzyListParams<Obj>): string => {
    console.log(context.client.send_command());
    return "hi";
};
