export default async function activityRoutes(fastify) {
    fastify.get('/', async (request, reply) => {
        const { data, error } = await fastify.supabase
            .from('atividades')
            .select('*');
        if (error) {
            fastify.log.error(error);
            return reply.code(500).send({ message: 'Erro ao buscar atividades.' });
        }
        return data;
    });
}
