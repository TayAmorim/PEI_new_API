import { FastifyPluginAsync } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { User } from '@supabase/supabase-js';


declare module 'fastify' {
  interface FastifyRequest {
    user?: User;
  }
}
const authenticatePlugin: FastifyPluginAsync = async (fastify) => {
  fastify.addHook('onRequest', async (request, reply) => {
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