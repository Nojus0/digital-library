import { IBook } from "../Book/Book";
import { Role } from "./interfaces"

export interface IUser {

    id: number;

    username: string;

    email: string

    role: Role

    createdBooks: IBook[]

    borowing: IBook

    password: string

    createdAt: Date

    updatedAt: Date
}
