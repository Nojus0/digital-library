import { IBook } from "../Book/Book";
export interface IUser {
    id: number;
    username: string;
    email: string;
    role: string;
    createdBooks: IBook[];
    borowing: IBook[];
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
