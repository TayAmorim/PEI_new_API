export default async function rootRoutes(fastify) {
    fastify.get("/me", async (request, reply) => {
        return reply.send(request.user);
    });
}
