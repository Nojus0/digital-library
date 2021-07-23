import { IUser } from "../User/entity";

export interface IBook {
    id: number

    name: string

    imageUrl: string

    description: string

    creator: IUser
}