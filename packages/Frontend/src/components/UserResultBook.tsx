import React, { useState } from "react";
import Link from "next/link";
import { HTMLMotionProps } from "framer-motion";
import { IBook, IUser, Role } from "@dl/shared";
import { BaseButton } from "src/styled/Buttons";
import BookBase from "./BookParts/BookBase";
import BookImage from "./BookParts/BookImage";
import BookTitle from "./BookParts/BookTitle";
import { RankCard } from "./RankCard";
import styled from "@emotion/styled";

type IUserProps = { username: string; role: string } & Omit<
  HTMLMotionProps<"div">,
  "id" | "role"
>;

function UserResultBook(
  { username, role, ...props }: IUserProps,
  ref: React.Ref<HTMLDivElement>
) {
  return (
    <BookBase {...props} ref={ref}>
      <Profile>
        <ProfileText>{username.substring(0, 1).toUpperCase()}</ProfileText>
      </Profile>
      <BookTitle>{username}</BookTitle>
      <Link href={`/profile/${username}`} passHref>
        <CustomA>
          <BaseButton variant="light" size=".75rem 1.5rem">
            View Profile
          </BaseButton>
        </CustomA>
      </Link>
    </BookBase>
  );
}

const CustomA = styled.a({
  margin: "0 2rem 0 0",
});

const ProfileText = styled("h2")({
  fontSize: "1.5rem",
  color: "black",
});

const Profile = styled.div({
  position: "relative",
  display: "flex",
  alignItems: "center",
  margin: "0 1rem",
  justifyContent: "center",
  borderRadius: "50%",
  background: "white",
  width: "3rem",
  minWidth: "3rem",
  height: "3rem",
  minHeight: "3rem",
});

export default React.forwardRef<HTMLDivElement, IUserProps>(UserResultBook);
