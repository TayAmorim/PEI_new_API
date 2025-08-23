import fastifyPlugin from "fastify-plugin";
const authenticatePlugin = async (fastify) => {
    fastify.addHook("onRequest", async (request, reply) => {
        if (request.url.startsWith("/auth/register") ||
            request.url.startsWith("/auth/login") ||
            request.url.startsWith("/auth")) {
            return;
        }
        const token = request.cookies.acess_token;
        if (!token) {
            return reply
                .code(401)
                .send({ error: "Você não tem permissão para acessar" });
        }
        const { data: { user }, error, } = await request.server.supabase.auth.getUser(token);
        if (error || !user) {
            return reply.send({ error: error?.message });
        }
        request.user = user;
    });
};
export default fastifyPlugin(authenticatePlugin);
