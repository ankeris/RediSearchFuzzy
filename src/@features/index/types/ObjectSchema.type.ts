type SchemaElement = {
    field: string;
    weight?: number;
    type?: string;
};

export type IObjectSchema = SchemaElement[];
