import Fastify from "fastify";
import dotenv from "dotenv";
import cors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";
import supabasePlugin from "./plugins/supabase.js";
import activityRoutes from "./routes/activities.js";
import authenticatePlugin from "./plugins/authenticate.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.js";
dotenv.config();
const app = Fastify({
    logger: true,
});
await app.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET,
});
app.register(cors, {
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true);
        const allowedOrigins = ["http://localhost:3000", process.env.FRONT_URL];
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"), false);
    },
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
});
app.register(supabasePlugin);
app.register(authRoutes, { prefix: "/auth" });
app.register(authenticatePlugin);
app.register(userRoutes, { prefix: "/user" });
app.register(activityRoutes, { prefix: "/activities" });
export default async (req, res) => {
    await app.ready();
    app.server.emit("request", req, res);
};
