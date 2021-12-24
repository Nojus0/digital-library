import React, { useState } from "react";
import Link from "next/link";
import { HTMLMotionProps } from "framer-motion";
import { IBook } from "@dl/shared";
import { BaseButton } from "src/styled/Buttons";
import BookBase from "./BookBase";
import BookImage from "./BookImage";
import BookTitle from "./BookTitle";
import styled from "@emotion/styled";

type IBookProps = IBook & Omit<HTMLMotionProps<"div">, "id">;

function Book(
  { id, imageUrl, title, ...props }: IBookProps,
  ref: React.Ref<HTMLDivElement>
) {
  return (
    <BookBase {...props} ref={ref}>
      <BookImage src={imageUrl != null ? imageUrl : ""} />
      <BookTitle>{title}</BookTitle>

      <Link href={`/book/${id}`} passHref>
        <CustomA>
          <BaseButton variant="light" size=".75rem 1.5rem">
            View
          </BaseButton>
        </CustomA>
      </Link>
    </BookBase>
  );
}

const CustomA = styled.a({
  margin: "0 2rem 0 0",
});

export default React.forwardRef<HTMLDivElement, IBookProps>(Book);
