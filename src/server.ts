import Fastify from 'fastify';
import dotenv from 'dotenv';
import cors from '@fastify/cors';
import fastifyCookie from '@fastify/cookie';
import supabasePlugin from './plugins/supabase.js';
import activityRoutes from './routes/activities.js';
import authenticatePlugin from './plugins/authenticate.js'
import type { VercelRequest, VercelResponse } from '@vercel/node';
import authRoutes from './routes/auth.routes.js';

dotenv.config();

const app = Fastify({
  logger: true,
});

await app.register(fastifyCookie, {
  secret: process.env.COOKIE_SECRET,
});


app.register(cors, { origin: true });
app.register(supabasePlugin);
app.register(authRoutes, { prefix: "/auth" })

app.register(authenticatePlugin)
app.register(activityRoutes, { prefix: '/activities' });


export default async (req: VercelRequest, res: VercelResponse) => {
  await app.ready();
  app.server.emit('request', req, res);
};