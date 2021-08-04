import React, { useState } from 'react'
import Link from "next/link"
import { HTMLMotionProps } from 'framer-motion'
import { IBook } from "@dl/shared"
import { BaseButton } from 'src/styled/Buttons'
import BookBase from './BookBase'
import BookImage from './BookImage'
import BookTitle from './BookTitle'

type IBookProps = IBook & Omit<HTMLMotionProps<"div">, 'id'>

function Book({ id, imageUrl, name, ...props }: IBookProps, ref: React.Ref<HTMLDivElement>) {

    return (
        <BookBase {...props} ref={ref}>
            <BookImage src={imageUrl} />
            <BookTitle>{name}</BookTitle>

            <Link href={`/book/${id}`} passHref>
                <a>
                    <BaseButton variant="light" size=".75rem 1.5rem" margin="0 2rem 0 0">View</BaseButton>
                </a>
            </Link>
        </BookBase>
    )
}

export default React.forwardRef<HTMLDivElement, IBookProps>(Book);