import { Arg, Args, ArgsType, Ctx, Field, Int, Mutation, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import { Book } from "../entity/Book";
import { Role, User } from "../entity/User";
import { IAuthContext, IAuthRoleContext } from "../interfaces";
import { isAuthRole, NextJsRoute } from "../middleware/isAuth";

@ArgsType()
export class BooksPaginationArgs {
    @Field(type => Int, { defaultValue: 0 })
    page: number;

    @Field(type => Int, { defaultValue: 25 })
    limit: number;
}

@ArgsType()
export class CreateBookArgs {
    @Field()
    name: string

    @Field()
    imageUrl: string

    @Field()
    description: string
}

@ArgsType()
export class IntArg {
    @Field(type => Int, { nullable: false })
    id: number
}

@ObjectType()
export class Borrow {
    alreadyBorowing: boolean
}

@Resolver()
export class BookResolver {

    @Query(type => [Book], { nullable: true })
    @UseMiddleware(isAuthRole(Role.Consumer, true))
    async books(@Args() { limit, page }: BooksPaginationArgs, @Ctx() { username }: IAuthContext) {
        limit = Math.max(limit, 1);
        limit = Math.min(limit, 50);
        page = Math.max(page, 0)

        try {
            return await Book.find({ order: { id: "DESC" }, skip: page, take: limit });
        } catch (error) {
            return null;
        }

    }

    @Query(type => Book, { nullable: true })
    async book(@Args() { id }: IntArg) {
        return Book.findOne({ where: { id } });
    }

    @UseMiddleware(isAuthRole(Role.Consumer, true))
    @Mutation(type => Book, { nullable: true })
    async borrow(@Args() { id }: IntArg, @Ctx() { username }: IAuthContext) {

        try {
            // I think you can do this in one query with joins.
            const BOOK = await Book.findOne({ where: { id } });
            const USER = await User.findOne({ where: { username } });

            await User.createQueryBuilder()
                .relation(User, "borowing")
                .of(USER)
                .add(BOOK);

            return BOOK;
        } catch (error) {
            if (error.code == '23505') {
                throw new Error("Already borowing.");
            }
            return null;
        }
    }

    @UseMiddleware(isAuthRole(Role.Administrator, true))
    @Mutation(type => Book, { nullable: true })
    async addBook(@Args() book: CreateBookArgs, @Ctx() { username }: IAuthRoleContext) {
        try {
            const creator = await User.findOne({ where: { username } })
            if (!creator) throw new Error("Creator not found.");

            if (book?.name?.length < 3) throw new Error("Book name too short.");

            return await Book.create({ ...book, creator }).save();
        } catch (error) {
            return null;
        }
    }
}