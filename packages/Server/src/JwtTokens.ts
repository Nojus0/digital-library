import { sign, verify } from "jsonwebtoken";
import { IJwtToken } from "./interfaces";
import { User } from "./entity/User";

export function CreateJwtToken(user: User) {
    const TOKEN: IJwtToken = {
        username: user.username
    }

    return sign(TOKEN, process.env.SECRET!, {
        expiresIn: "1d"
    })
}

export function VerifyToken(token: string) {
    try {
        return verify(token, process.env.SECRET!) as IJwtToken;
    } catch (err) {
        return null;
    }
}