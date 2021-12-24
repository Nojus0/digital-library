import {
  Arg,
  Args,
  ArgsType,
  Ctx,
  Field,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { AWSError, S3 } from "aws-sdk";
import crypto, { BinaryToTextEncoding } from "crypto";
import { isAuthRole } from "../middleware/isAuth";
import { Role } from "@dl/shared";
import { IAuthRoleContext } from "../interfaces";
import { User } from "../entity/User";
import { Book } from "../entity/Book";
import axios from "axios";

export const s3 = new S3({
  region: process.env.S3_REGION,
});

@ArgsType()
abstract class UploadRequest {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field((type) => Boolean)
  addPhoto: boolean;
}

@Resolver()
export class ImageResolver {
  @Query((type) => String)
  async test() {
    const a = await axios({ url: "https://api.myip.com/" });
    return JSON.stringify(a.data, null, 2);
  }

  @UseMiddleware(isAuthRole(Role.Administrator, true))
  @Mutation((type) => String, { nullable: true })
  async upload(
    @Args() { description, title, addPhoto }: UploadRequest,
    @Ctx() { username }: IAuthRoleContext
  ) {
    const USER = await User.findOneOrFail({ where: { username } });
    if (!addPhoto) {
      return Book.create({
        title,
        description,
        imageUrl: null,
        creator: USER,
      }).save();
    }

    const IMAGE_COVER = `covers/${getImageKey()}`;

    const data = s3.createPresignedPost({
      Bucket: process.env.S3_BUCKET,
      Fields: {
        key: IMAGE_COVER,
      },
      Conditions: [
        ["content-length-range", 0, 1000000], // content length restrictions: 0-1MB
        ["starts-with", "$Content-Type", "image/"], // content type restriction
        ["eq", "$x-amz-meta-userid", USER.id], // tag with userid <= the user can see this!
        ["eq", "$acl", "public-read"],
      ],
    });

    data.fields["x-amz-meta-userid"] = USER.id.toString();
    data.fields.acl = "public-read";

    await Book.create({
      title,
      description,
      imageUrl: `${process.env.CLOUDFRONT_URL}${IMAGE_COVER}`,
      creator: USER,
    }).save();

    return JSON.stringify(data);
  }
}

function getImageKey(): string {
  const val = sha256(
    `
    ${crypto.randomBytes(16)}
    `,
    "hex"
  );

  return val;
}

export function sha256(
  input: string | Buffer | DataView,
  encoding: BinaryToTextEncoding = "base64"
) {
  return crypto.createHash("sha256").update(input).digest(encoding);
}
