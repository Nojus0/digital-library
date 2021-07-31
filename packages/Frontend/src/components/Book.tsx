import styled, { StyledComponent } from '@emotion/styled'
import React, { forwardRef, useState } from 'react'
import { Button } from '../styled/Components'
import Link from "next/link"
import { BookNotFound } from '../svg/BookNotFound'
import { HTMLMotionProps, motion } from 'framer-motion'

export interface IBookProps extends Omit<HTMLMotionProps<"div">, 'id'> {
    imageUrl: string,
    name: string,
    id: number,
}

function Book({ id, imageUrl, name, ...props }: IBookProps, ref: React.Ref<HTMLDivElement>) {
    const [imgError, setImgError] = useState(false);

    return (
        <CardBackground ref={ref} {...props}>
            {
                imgError ? <BookNotFound /> : <img onError={e => setImgError(true)} src={imageUrl} />
            }

            <h1>{name}</h1>

            <Link href={`/book/${id}`} passHref>
                <a>
                    <Button>View</Button>
                </a>
            </Link>

        </CardBackground>
    )
}

export default React.forwardRef<HTMLDivElement, IBookProps>(Book);

const CardBackground = styled(motion.div)({
    display: "flex",
    width: "100%",
    height: "7rem",
    background: "#EFEFEF",
    marginBottom: "1.25rem",
    borderRadius: ".4rem",
    alignItems: "center",
    h1: {
        flexGrow: 1,
        fontWeight: 500,
        fontSize: "1.10rem",
        padding: "1.75rem",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
    },
    img: {
        objectFit: "cover",
        borderRadius: ".4rem 0 0 .4rem",
        height: "100%",
        minWidth: "5rem"
    },
    svg: {
        minWidth: "5rem",
        display: "flex",
        paddingLeft: ".5rem",
        alignItems: "flex-end",
    },
    button: {
        background: "white",
        color: "black",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        padding: ".75rem 1.5rem",
        marginRight: "2rem",
    }
})

