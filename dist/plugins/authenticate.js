import fastifyPlugin from 'fastify-plugin';
const authenticatePlugin = async (fastify) => {
    fastify.addHook('onRequest', async (request, reply) => {
        if (request.url.startsWith('/auth/register')) {
            return;
        }
        if (!request.headers.authorization) {
            return reply.code(401).send({ error: 'Você não tem permissão para acessar' });
        }
        const token = request.headers.authorization.replace('Bearer ', '');
        const { data: { user }, error } = await request.server.supabase.auth.getUser(token);
        if (error || !user) {
            return reply.code(401).send({ error: 'Token inválido' });
        }
        request.user = user;
    });
};
export default fastifyPlugin(authenticatePlugin);
