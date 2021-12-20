import { MiddlewareFn } from "type-graphql";
import { User } from "../entity/User";
import { Role } from "@dl/shared"
import { IApolloContext, IAuthRoleContext } from "../interfaces";
import { VerifyToken } from "../JwtTokens";
import { IsProd } from "../typeorm.config";


export const isAuthRole: (ROLES: Role[] | Role, andAbove: boolean) => MiddlewareFn<IAuthRoleContext> = (ROLES, andAbove = true) => async ({ context }, next) => {
    if (!context.req.cookies.auth) throw new Error("No auth cookie found");

    const USER = VerifyToken(context.req.cookies.auth);
    if (!USER) throw new Error("Invalid auth cookie");

    const user = await User.findOne({ where: { username: USER.username } });
    if (!user) {
        context.res.cookie("auth", "", {
            httpOnly: true,
            secure: IsProd,
            expires: new Date()
        })
        throw new Error("User does not exist.");
    }


    // THIS IS SO SHIT!!!!!!
    if (Array.isArray(ROLES)) {
        if (andAbove) {
            console.error(`
            [IsAuthRole middleware] AndAbove set as true while roles
            passed as an array, to use AndAbove pass Role not Role Array
            `)
        }

        if (!ROLES.includes(user.role)) throw new Error("Invalid role.")
    }
    else {
        if (andAbove) {
            // Cur role < Min Role
            if (user.role < ROLES) throw new Error("Invalid role.")
        }
        else
            if (ROLES != user.role) throw new Error("Invalid role.")
    }

    context.username = user.username;
    context.role = user.role;

    return next(); // Proccess next request
};