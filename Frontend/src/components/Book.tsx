import styled from '@emotion/styled'
import React, { useState } from 'react'
import { Button } from '../styled/Components'
import Link from "next/link"
import { BookNotFound } from '../svg/BookNotFound'

export interface IBook {
    imageUrl: string,
    name: string,
    description: string
    id: number
    returnDays?: number // change to date in future so it can live countdown
}

function Book({ imageUrl, name, id, returnDays }: IBook) {
    const [imgError, setImgError] = useState(false);

    return (
        <CardBackground>
            {
                imgError ? <BookNotFound /> : <img onError={e => setImgError(true)} src={imageUrl} />
            }

            <h1>{name}</h1>

            {
                returnDays != null ?
                    <Button style={{ cursor: "default" }}>{returnDays} d</Button>
                    :
                    <Link href={`/books/${id}`}><Button>View</Button></Link>
            }

        </CardBackground>
    )
}
export default Book

const CardBackground = styled.div({
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

