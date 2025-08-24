export const userBodyJsonSchema = {
    type: "object",
    required: ["email", "password"],
    properties: {
        email: { type: "string" },
        password: { type: "string" },
    },
};
export const schema = {
    body: userBodyJsonSchema,
};
export const userNewJsonSchema = {
    type: "object",
    required: ["email", "password", "name"],
    properties: {
        email: { type: "string" },
        name: { type: "string" },
        password: { type: "string" },
    },
};
export const schema2 = {
    body: userNewJsonSchema,
};
