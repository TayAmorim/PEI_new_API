export default async function rootRoutes(fastify) {
    fastify.get('/', async (request, reply) => {
        return {
            status: 'online',
            message: 'Bem-vindo à API da Plataforma de Educação Inclusiva (Pei)!',
            timestamp: new Date().toISOString(),
        };
    });
}
