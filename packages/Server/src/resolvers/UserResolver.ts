import { Arg, Ctx, Field, Int, Mutation, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../entity/User";
import jwt from "jsonwebtoken";
import argon, { argon2id } from "argon2";
import { IAuthContext, IJwtToken } from "../interfaces";
import { IApolloContext } from "../interfaces";
import { CreateJwtToken } from "../JwtTokens";
import { IsProd } from "../typeorm.config";
import { isAuthRole } from "../middleware/isAuth";
import { Role } from "@dl/shared";

@ObjectType()
export class UserResponse {
    @Field(() => User, { nullable: true })
    user?: User;

    @Field({ nullable: true })
    error?: string
}

@Resolver()
export class UserResolver {

    @UseMiddleware(isAuthRole(Role.Consumer, true))
    @Query(() => User, { nullable: true })
    async currentUser(@Ctx() { req, res, username }: IAuthContext) {
        return User.findOne({ where: { username }, relations: ["borowing"] });
    }

    @Query(type => User, { nullable: true })
    async userProfile(@Arg("username") username: string) {
        return User.findOne({ where: { username }, relations: ["borowing"] });
    }

    @Mutation(() => UserResponse, { nullable: true })
    async register(
        @Arg("username") username: string,
        @Arg("email") email: string,
        @Arg("password") password: string
    ) {
        if (!ValidateInputRegister(email, password, username)) return { error: "Invalid format details." };

        try {
            const user = await User.create<User>({
                username,
                email,
                password: await argon.hash(password, { type: argon2id }),
            }).save()

            return { user }

        } catch (error) {
            if (error.code == "23505") return { error: "Username or email already taken." }
            else return null;
        }

    }

    @Mutation(() => Boolean)
    async signOut(@Ctx() { res }: IApolloContext) {
        // Send expired cookie
        try {
            res.cookie("auth", "", {
                httpOnly: true,
                secure: IsProd,
                expires: new Date()
            })
        } catch (err) { return false; }

        return true;
    }

    @Mutation(() => UserResponse, { nullable: true })
    async login(@Arg("email") email: string, @Arg("password") password: string, @Ctx() { req, res }: IApolloContext) {

        if (!ValidateInputLogIn(email, password)) return { error: "Invalid credentials format." };

        const user = await User.findOne({ where: { email } });
        if (user == null) return { error: "User does not exist." }

        const valid = await argon.verify(user.password, password);
        if (!valid) return { error: "Invalid password." };

        res.cookie("auth", CreateJwtToken(user), {
            httpOnly: true,
            secure: IsProd,
            // - maxAge: 1 * 86400, else session cookie
            // - on browser close delete cookie
        });
        return {
            user,
        }
    }
}

export function SignUsername(username: string): string {
    const Token: IJwtToken = {
        username,
    };

    return jwt.sign(Token, process.env.SECRET, {
        expiresIn: 30 * 86400,
    });
}

function ValidateInputLogIn(email: string, password: string): boolean {
    if (email.length < 4 || !email.includes("@")) return false;
    if (password.length < 4) return false;


    return true;
}

function ValidateInputRegister(email: string, password: string, username: string): boolean {
    if (!ValidateInputLogIn(email, password)) return false;
    if (username.length < 4) return false;

    return true;
}
