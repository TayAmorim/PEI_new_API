import { FastifyInstance } from "fastify";
import { ActivityProps } from "../types/index.js";

const activityBodyJsonSchema = {
  type: "object",
  required: ["title", "date"],
  properties: {
    title: { type: "string" },
    date: { type: "string" },
    status: { type: "string", enum: ["pendente", "concluída", "cancelada"], default: "pendente" },
    avalition: { type: "string"},
    objecttives: { type: "string" },
    type: { type: "string" },
  },
};

const schema = {
  body: activityBodyJsonSchema,
};

export default async function activityRoutes(fastify: FastifyInstance) {
  fastify.get("/", async (request, reply) => {
    const { data, error } = await fastify.supabase
      .from("atividades")
      .select("*");

    if (error) {
      fastify.log.error(error);
      return reply.code(500).send({ message: "Erro ao buscar atividades." });
    }
    return data;
  });
  fastify.post("/", { schema },  async (request, reply) => {
    const { title, date, status, avalition, objecttives, type, } = (await request.body) as ActivityProps;

    if (!request.user || !request.user.id) {
      return reply.code(401).send({ message: "Usuário não autenticado." });
    }
    const { data, error } = await fastify.supabase
      .from("atividades")
      .insert([{ title, status, date, type, avalition, objecttives, user_id: request.user.id }])
      .select()
      .single();  
    if (error) {
      fastify.log.error(error);
      return reply.code(500).send({ message: "Erro ao criar atividade." });
    }
    return reply.code(201).send(data);
  });
}
