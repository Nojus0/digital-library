import { ConnectionOptions } from "typeorm";
import path from "path";
import { Book } from "./entity/Book";
import { User } from "./entity/User";
export const IsProd = process.env.NODE_ENV == "production";
export const IsDev = process.env.NODE_ENV != "production";

export const config: ConnectionOptions = {
  type: "postgres",
  host: process.env.HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  synchronize: true,
  logging: true,
  dropSchema: false,
  // ssl: true,
  // extra: {
  //     ssl: {
  //         rejectUnauthorized: false
  //     }
  // },
  entities: [Book, User],
  migrations: [path.join(__dirname, "./migration/**/*.*")],
  subscribers: [path.join(__dirname, "./subscriber/**/*.*")],
  cli: {
    entitiesDir: path.join(__dirname, "./entity"),
    migrationsDir: path.join(__dirname, "./migration"),
    subscribersDir: path.join(__dirname, "./subscriber"),
  },
};
