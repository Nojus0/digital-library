import { Arg, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import { Role, User } from "../../entity/User";
import { NextJsRoute } from "../../middleware/isAuth";

@Resolver()
export class NextUserResolver {

    @UseMiddleware(NextJsRoute)
    @Query(type => [String], { nullable: true })
    async usernames() {
        const users = await User.find({ order: { id: "DESC" }, select: ["username"] });
        return users.map(user => (user.username))
    }

    @UseMiddleware()
    @Query(type => User, { nullable: true })
    async userProfile(@Arg("username") username: string) {
        return User.findOne({ where: { username }, relations: ["borowing"] });
    }

}
