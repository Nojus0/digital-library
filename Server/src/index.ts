import "reflect-metadata";
import "dotenv/config";
import "./graphql/enums";
import { createConnection } from "typeorm";
import express from "express";
import cors from "cors";
import { ApolloServer, gql } from "apollo-server-express";
import { buildSchema, registerEnumType } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import cookieParser from "cookie-parser";
import { BookResolver } from "./resolvers/BookResolver";
import { config } from "./typeorm.config";
import { ImageResolver } from "./resolvers/ImageResolver";

const port = process.env.PORT || 4000;
if (process.env.SECRET == null) throw new Error("Secret not found");


(async () => {

  const DB_CONNECTION = await createConnection(config)

  const GRAPHQL_SERVER = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, BookResolver, ImageResolver],
    }),
    context: ({ req, res }) => ({ req, res })
  });

  const SERVER = express();
  SERVER.use([
    cookieParser(),
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    }),
  ]);

  GRAPHQL_SERVER.applyMiddleware({ app: SERVER, cors: false });

  SERVER.listen({ port }, () => console.log(`🚀 Server ready at http://localhost:4000${GRAPHQL_SERVER.graphqlPath}`));

})();