import "dotenv/config";
import "reflect-metadata";
import "./graphql/enums";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-lambda";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import cookieParser from "cookie-parser";
import { BookResolver } from "./resolvers/BookResolver";
import { config } from "./typeorm.config";
import { Connection } from "typeorm";
import { ImageResolver } from "./resolvers/ImageResolver";
import { ManageResolver } from "./resolvers/ManageResolver";
import express from "express";

if (process.env.SECRET == null) throw new Error("Secret not found");

let connection: Connection | null = null;

export const handler = async (event, context, callback) => {
  if (!connection) {
    console.log(`Connecting to database...`);
    connection = await createConnection(config);
    console.log(`Connected to database`);
  }

  const GRAPHQL_SERVER = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, BookResolver, ImageResolver, ManageResolver],
    }),
    context: ({ express: { req, res } }) => ({ req, res }),
  });

  return GRAPHQL_SERVER.createHandler({
    expressGetMiddlewareOptions: {
      cors: {
        credentials: true,
        origin: process.env.ORIGIN || "*",
      },
    },
    expressAppFromMiddleware: (middlewares) => {
      const app = express();
      app.use(cookieParser());
      app.use(middlewares);
      return app;
    },
  })(event, context, callback);
};
