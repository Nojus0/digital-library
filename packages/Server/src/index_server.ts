import "reflect-metadata";
import "dotenv/config";
import "./graphql/enums";
import { createConnection } from "typeorm";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import cookieParser from "cookie-parser";
import { BookResolver } from "./resolvers/BookResolver";
import { config } from "./typeorm.config";
import { ImageResolver } from "./resolvers/ImageResolver";
import { ManageResolver } from "./resolvers/ManageResolver";
const port = process.env.PORT || 4000;
if (process.env.SECRET == null) throw new Error("Secret not found");

(async () => {
  console.log(`Connecting to database...`);
  const DB_CONNECTION = await createConnection(config);
  console.log(`Connected to database`);
  const GRAPHQL_SERVER = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, BookResolver, ImageResolver, ManageResolver],
    }),
    introspection: true,
    context: ({ req, res }) => ({ req, res }),
  });

  const SERVER = express();
  SERVER.use([
    cookieParser(),
    cors({
      credentials: true,
      origin: process.env.ORIGIN || "*",
    }),
  ]);

  GRAPHQL_SERVER.applyMiddleware({ app: SERVER, cors: false });

  SERVER.listen({ port }, () =>
    console.log(
      `🚀 Server ready at http://localhost:4000${GRAPHQL_SERVER.graphqlPath}`
    )
  );
})();
