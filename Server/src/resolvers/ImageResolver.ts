import { GraphQLUpload } from "apollo-server-express";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Upload } from "../interfaces";

@Resolver()
export class ImageResolver {

    @Query(type => String)
    async images() {
        return "";
    }

    @Mutation(type => Boolean, { nullable: true })
    async uploadimage(@Arg("img", type => GraphQLUpload) file: Upload) {
        console.log(file);
        return true;
    }
}