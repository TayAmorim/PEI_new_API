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
  fastify.delete("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };

    if (!request.user || !request.user.id) {
      return reply.code(401).send({ message: "Usuário não autenticado." });
    }

    const { data: existingActivity, error: fetchError } = await fastify.supabase
      .from("atividades")
      .select("user_id")
      .eq("id", id)
      .single();

    if (fetchError) {
      fastify.log.error(fetchError);
      return reply.code(500).send({ message: "Erro ao buscar atividade." });
    }

    if (!existingActivity) {
      return reply.code(404).send({ message: "Atividade não encontrada." });
    }

    const { error: deleteError } = await fastify.supabase
      .from("atividades")
      .delete()
      .eq("id", id);

    if (deleteError) {
      fastify.log.error(deleteError);
      return reply.code(500).send({ message: "Erro ao deletar atividade." });
    }

    return reply.code(204).send();
  });
  fastify.put("/:id", { schema }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const { title, date, status, avalition, objecttives, type } = (await request.body) as ActivityProps;
    
    const { data: existingActivity, error: fetchError } = await fastify.supabase
      .from("atividades")
      .select("user_id")
      .eq("id", id)
      .single();

    if (fetchError) {
      fastify.log.error(fetchError);
      return reply.code(500).send({ message: "Erro ao buscar atividade." });
    }

    if (!existingActivity) {
      return reply.code(404).send({ message: "Atividade não encontrada." });
    }

    const { data, error: updateError } = await fastify.supabase
      .from("atividades")
      .update({ title, date, status, avalition, objecttives, type })
      .eq("id", id)
      .select()
      .single();

    if (updateError) {
      fastify.log.error(updateError);
      return reply.code(500).send({ message: "Erro ao atualizar atividade." });
    }

    return reply.code(200).send(data);
  });
}
