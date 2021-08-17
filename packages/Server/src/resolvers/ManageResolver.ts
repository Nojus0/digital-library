import { IUser, Role } from "@dl/shared";
import { User } from "../entity/User";
import { isAuthRole } from "../middleware/isAuth";
import { Arg, Args, ArgsType, Field, InputType, Int, Mutation, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import { Book } from "../entity/Book";


@InputType()
@ArgsType()
class IManageUser {
    @Field(type => String)
    username: string

    @Field(type => [Int])
    add: number[]

    @Field(type => [Int])
    remove: number[]
}

@Resolver()
export class ManageResolver {

    @UseMiddleware(isAuthRole(Role.Administrator, true))
    @Mutation(type => [User], { nullable: true })
    async manageUsers(@Arg('users', type => [IManageUser]) manage: IManageUser[]) {

        let NewUsers: IUser[] = []
        for (const { username, add, remove } of manage) {
            const db_user = await User.findOneOrFail({ where: { username }, relations: ["borowing"] });

            for (const id of add) {
                const db_book = await Book.findOneOrFail(id);
                db_user.borowing = [...db_user.borowing, db_book];
            }

            for (const id of remove) {
                db_user.borowing = db_user.borowing.filter(book => book.id != id);
            }

            await db_user.save();
            NewUsers.push(db_user);
        }

        return NewUsers;
    }

    @Query(type => String)
    test() {
        return "";
    }
}