import "dotenv/config";
import "reflect-metadata";
import "./graphql/enums";
import { createConnection, Connection } from "typeorm";
import { ApolloServer } from "apollo-server-lambda";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import cookieParser from "cookie-parser";
import { BookResolver } from "./resolvers/BookResolver";
import { config } from "./typeorm.config";
import { ImageResolver } from "./resolvers/ImageResolver";
import { ManageResolver } from "./resolvers/ManageResolver";
import express from "express";
import { GraphQLSchema } from "graphql";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";

if (process.env.SECRET == null) throw new Error("Secret not found");

var connection: Connection | null = null;
var schema: GraphQLSchema | null = null;

export const handler: APIGatewayProxyHandlerV2 = async (
  event,
  context,
  callback
) => {
  await Promise.all([
    (async () => {
      //
      if (!connection || !connection.isConnected) {
        console.log(`Connecting to database...`);
        connection = await createConnection(config);
        console.log(`Connected to database`);
      }
      //
    })(),
    (async () => {
      //
      if (!schema)
        schema = await buildSchema({
          resolvers: [
            UserResolver,
            BookResolver,
            ImageResolver,
            ManageResolver,
          ],
        });
      //
    })(),
  ]);

  const GRAPHQL_SERVER = new ApolloServer({
    schema,
    introspection: true,
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
