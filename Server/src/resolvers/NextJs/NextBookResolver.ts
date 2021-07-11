import { Arg, Args, Int, Query, Resolver, UseMiddleware } from "type-graphql";
import { Book } from "../../entity/Book";
import { User } from "../../entity/User";
import { NextJsRoute } from "../../middleware/isAuth";
import { IntArg } from "../BookResolver";

@Resolver()
export class NextBookResolver {

    @UseMiddleware(NextJsRoute)
    @Query(type => Book, { nullable: true })
    async book(@Args() { id }: IntArg) {
        return Book.findOne({ where: { id } });
    }

    @UseMiddleware(NextJsRoute)
    @Query(type => [Int], { nullable: true })
    async bookIds() {
        const books = await Book.find({ order: { id: "DESC" }, select: ["id"] });
        return books.map(book => (book.id));
    }
}