import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import schema from "./config/schema";
import cors from "cors";
import db from "./config/db";
import env from "./env";
import { ContextType } from "./types/ContextType";

const app = express();
const httpServer = http.createServer(app);

const { SERVER_PORT: port } = env;
const main = async () => {
  await db.initialize();
  const server = new ApolloServer<ContextType>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  app.use(
    "/",
    cors<cors.CorsRequest>({
      credentials: true,
      origin: env.CORS_ALLOWED_ORIGINS.split(","),
    }),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res }),
    })
  );
  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(`🚀 Server ready at http://localhost:${port}/`);
};

main();
