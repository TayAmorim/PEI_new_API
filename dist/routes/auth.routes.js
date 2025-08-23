const userBodyJsonSchema = {
    type: "object",
    required: ["email", "password"],
    properties: {
        email: { type: "string" },
        password: { type: "string" },
    },
};
const schema = {
    body: userBodyJsonSchema,
};
export default async function authRoutes(fastify) {
    (fastify.post("/login", { schema }, async (request, reply) => {
        const { email, password } = (await request.body);
        const { data, error } = await fastify.supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            const { status, message } = error;
            if (message === "Invalid login credentials") {
                return reply.code(401).send({
                    message: "Não foi possível realizar o login com as informações fornecidas.",
                });
            }
            return { status, message };
        }
        if (data.session) {
            reply.setCookie("acess_token", data.session.access_token, {
                path: "/",
                httpOnly: true,
                secure: true,
            });
            reply.setCookie("refresh_token", data.session.refresh_token, {
                path: "/",
                httpOnly: true,
                sameSite: "lax",
                maxAge: 60 * 60 * 24 * 3,
            });
            return reply.code(200).send({ message: "Login Bem sucedido" });
        }
        return reply.code(500).send({ message: "Ocorreu um erro inesperado." });
    }),
        fastify.post("/register", { schema }, async (request, reply) => {
            const { email, password } = (await request.body);
            const { data, error } = await fastify.supabase.auth.signUp({
                email,
                password,
            });
            if (error) {
                const { status, message } = error;
                if (status === 422) {
                    return reply
                        .code(400)
                        .send({ message: "Não foi possível criar o perfil" });
                }
                return { status, message };
            }
            return reply.code(201).send(data.user);
        }),
        fastify.post("/refresh", async (request, reply) => {
            const refreshToken = request.cookies.refresh_token;
            if (!refreshToken) {
                return reply
                    .code(401)
                    .send({ message: "Refresh token não encontrado." });
            }
            const { data, error } = await fastify.supabase.auth.refreshSession({
                refresh_token: refreshToken,
            });
            if (error || !data.session) {
                return reply
                    .code(401)
                    .send({ message: "Não foi possível atualizar a sessão." });
            }
            reply.setCookie("refresh_token", data.session.refresh_token);
            return reply.code(200).send({ message: "Sessão atualizada." });
        }));
    fastify.get("/logout", async (request, reply) => {
        const { error } = await fastify.supabase.auth.signOut();
        if (error) {
            return reply.code(500).send({ message: "Erro ao realizar o logout" });
        }
        reply.clearCookie("acess_token", { path: "/" });
        reply.clearCookie("refresh_token", { path: "/" });
        return reply.code(200).send({ message: "Sucesso" });
    });
}
