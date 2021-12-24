import {
  Arg,
  Args,
  ArgsType,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Book } from "../entity/Book";
import { User } from "../entity/User";
import { Role } from "@dl/shared";
import { IAuthContext, IAuthRoleContext } from "../interfaces";
import { isAuthRole } from "../middleware/isAuth";
import { AWSError, S3 } from "aws-sdk";
import { s3 } from "./ImageResolver";

@ArgsType()
export class BooksPaginationArgs {
  @Field((type) => Int, { defaultValue: 0 })
  page: number;

  @Field((type) => Int, { defaultValue: 25 })
  limit: number;
}
@ArgsType()
export class CreateBookArgs {
  @Field()
  name: string;

  @Field()
  imageUrl: string;

  @Field()
  description: string;
}
@ArgsType()
export class EditBookArgs {
  @Field()
  newTitle: string;

  @Field()
  newDescription: string;

  @Field((type) => Int)
  bookId: number;
}

@ArgsType()
export class IntArg {
  @Field((type) => Int, { nullable: false })
  id: number;
}

@ObjectType()
export class Borrow {
  alreadyBorowing: boolean;
}

@Resolver()
export class BookResolver {
  @Query((type) => [Book], { nullable: true })
  @UseMiddleware(isAuthRole(Role.Consumer, true))
  async books(
    @Args() { limit, page }: BooksPaginationArgs,
    @Ctx() { username }: IAuthContext
  ) {
    limit = Math.max(limit, 1);
    limit = Math.min(limit, 50);
    page = Math.max(page, 0);

    try {
      return await Book.find({
        order: { id: "DESC" },
        skip: page,
        take: limit,
      });
    } catch (error) {
      return null;
    }
  }

  @Mutation((type) => Boolean)
  @UseMiddleware(isAuthRole(Role.Administrator, true))
  async deleteBook(@Arg("id", (type) => Int) id: number) {
    const book = await Book.findOneOrFail({ where: { id } });
    if (!book) throw new Error("Book not found.");

    if (book.imageUrl) {
      const Key = book.imageUrl.split(process.env.CLOUDFRONT_URL)[1];
      try {
        await s3
          .deleteObject({
            Bucket: process.env.S3_BUCKET,
            Key: Key,
          })
          .promise();
      } catch (err) {
        const error = err as AWSError;
        console.log(err);
        if (error.code == "NoSuchKey") {
          throw new Error("Image not found.");
        }
      }
    }

    await book.remove();
    return true;
  }

  @Mutation((type) => Book, { nullable: true })
  @UseMiddleware(isAuthRole(Role.Administrator, true))
  async editBook(@Args() { bookId, newDescription, newTitle }: EditBookArgs) {
    try {
      const target = await Book.findOneOrFail({ where: { id: bookId } });
      target.title = newTitle;
      target.description = newDescription;
      return target.save();
    } catch (error) {
      return null;
    }
  }

  @Query((type) => Book, { nullable: true })
  async book(@Args() { id }: IntArg) {
    return Book.findOne({ where: { id } });
  }

  @UseMiddleware(isAuthRole(Role.Consumer, true))
  @Query((type) => [Book], { nullable: true })
  async bookSuggestion(@Arg("search") search: string) {
    // TODO CACHE WITH REDIS?
    return Book.createQueryBuilder()
      .where(`LOWER(title) LIKE LOWER('%' || :search || '%')`, { search })
      .orderBy("id", "DESC")
      .take(5)
      .getMany();

    // return Book.find({
    //     where: {
    //         name: Like(`%${search}%`)
    //     },
    //     take: 5
    // })
  }

  @UseMiddleware(isAuthRole(Role.Consumer, true))
  @Mutation((type) => Book, { nullable: true })
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
      if (error.code == "23505") {
        throw new Error("Already borowing.");
      }
      return null;
    }
  }

  @UseMiddleware(isAuthRole(Role.Administrator, true))
  @Mutation((type) => Book, { nullable: true })
  async addBook(
    @Args() book: CreateBookArgs,
    @Ctx() { username }: IAuthRoleContext
  ) {
    try {
      const creator = await User.findOne({ where: { username } });
      if (!creator) throw new Error("Creator not found.");

      if (book?.name?.length < 3) throw new Error("Book name too short.");

      return await Book.create({ ...book, creator }).save();
    } catch (error) {
      return null;
    }
  }
}
