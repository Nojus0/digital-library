import { Request, Response } from "express";
import { Stream } from "stream";
import { Role } from "@dl/shared";

export interface IJwtToken {
    username: string
}

export interface IApolloContext {
    req: Request
    res: Response
}

export interface IAuthContext extends IApolloContext {
    username: string
}

export interface IAuthRoleContext extends IAuthContext {
    role: Role
}

export interface Upload {
    filename: string
    mimetype: string
    encoding: string
    createReadStream: () => Stream
}
