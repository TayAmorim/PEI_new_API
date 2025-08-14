export default async function activityRoutes(fastify) {
    // Rota para buscar todas as atividades
    fastify.get('/', async (request, reply) => {
        const { data, error } = await fastify.supabase
            .from('atividades') // Nome da sua tabela
            .select('*');
        if (error) {
            fastify.log.error(error);
            return reply.code(500).send({ message: 'Erro ao buscar atividades.' });
        }
        return data;
    });
    // Aqui você pode adicionar as outras rotas (POST, PUT, DELETE)...
}
