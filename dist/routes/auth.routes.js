const userBodyJsonSchema = {
    type: 'object',
    required: ['email', 'password'],
    properties: {
        email: { type: 'string' },
        password: { type: 'string' },
    },
};
const schema = {
    body: userBodyJsonSchema,
};
export default async function authRoutes(fastify) {
    fastify.post('/register', { schema }, async (request, reply) => {
        const { email, password } = await request.body;
        const { data, error } = await fastify.supabase.auth.signUp({ email, password });
        if (error) {
            const { status, message } = error;
            if (status === 422) {
                return reply.code(400).send({ message: "Não foi possível criar o perfil" });
            }
            return { status, message };
        }
        return reply.code(201).send(data.user);
    });
}
