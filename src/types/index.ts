export interface UserAuthProps {
  email: string;
  password: string;
}

export interface ActivityProps {
  title: string;
  date: string;
  status?: "pendente" | "concluída" | "cancelada";
  avalition?: string;
  objecttives?: string;
  type?: string;
}

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

export interface NewUser extends UserAuthProps {
  email: string;
  password: string;
  name: string;
}