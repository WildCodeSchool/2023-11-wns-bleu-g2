import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import schema from "./schema";
import cors from "cors";
import db from "./db";
import env from "./env";

const { SERVER_PORT: port } = env;

const app = express();
const httpServer = http.createServer(app);

const main = async () => {
  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await db.initialize();

  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      credentials: true,
      origin: env.CORS_ALLOWED_ORIGINS.split(","),
    }),
    express.json(),
    expressMiddleware(server)
  );

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log("🚀 Server ready at http://localhost:4001/graphql");
  console.log("hello");
};

main();
