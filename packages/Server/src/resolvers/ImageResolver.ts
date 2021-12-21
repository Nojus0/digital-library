import {
  Arg,
  Args,
  ArgsType,
  Ctx,
  Field,
  Mutation,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { S3 } from "aws-sdk";
import crypto, { BinaryToTextEncoding } from "crypto";
import { isAuthRole } from "../middleware/isAuth";
import { Role } from "@dl/shared";
import { IAuthRoleContext } from "../interfaces";
import { User } from "../entity/User";
import { Book } from "../entity/Book";

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
  @UseMiddleware(isAuthRole(Role.Administrator, true))
  @Mutation((type) => String, { nullable: true })
  async upload(
    @Args() { description, title, addPhoto }: UploadRequest,
    @Ctx() { username }: IAuthRoleContext
  ) {
    const USER = await User.findOneOrFail({ where: { username } });

    if (!addPhoto) {
      return createBook();
    }

    const imgName = getImageKey();

    const data = s3.createPresignedPost({
      Bucket: process.env.S3_BUCKET,
      Fields: {
        key: imgName,
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

    createBook(imgName);

    async function createBook(ImageName: string = "") {
      await Book.create({
        title,
        description,
        imageUrl:
          ImageName != ""
            ? `https://${process.env.S3_BUCKET}.s3.${
                process.env.S3_REGION
              }.amazonaws.com/${encodeURIComponent(ImageName)}`
            : null,
        creator: USER,
      }).save();
    }

    return JSON.stringify(data);
  }
}

function getImageKey(): string {
  const val = sha256(
    `
    ${crypto.randomBytes(32)}
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
