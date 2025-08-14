import Fastify from 'fastify';
import dotenv from 'dotenv';
import cors from '@fastify/cors';
import supabasePlugin from './plugins/supabase.js';
import rootRoutes from './routes/root.js';
import activityRoutes from './routes/activities.js';
dotenv.config();
const app = Fastify({
    logger: true,
});
app.register(cors, { origin: true });
app.register(supabasePlugin);
app.register(rootRoutes);
app.register(activityRoutes, { prefix: '/activities' });
export default async (req, res) => {
    await app.ready();
    app.server.emit('request', req, res);
};
