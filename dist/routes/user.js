export default async function userRoutes(fastify) {
    fastify.get("/me", async (request, reply) => {
        const { data, error } = await fastify.supabase
            .from("profiles")
            .select("*");
        if (error) {
            fastify.log.error(error);
            return reply.code(500).send({ message: "Erro ao buscar perfil." });
        }
        return data;
    });
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
