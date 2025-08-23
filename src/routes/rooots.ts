import { FastifyInstance } from "fastify/types/instance.js";

export default async function rootRoutes(fastify: FastifyInstance) {
  fastify.get("/me", async (request, reply) => {
    return reply.send(request.user);
  });
}