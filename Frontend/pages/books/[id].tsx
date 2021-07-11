import styled from '@emotion/styled'
import axios, { AxiosError } from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import Book, { IBook } from '../../src/components/Book'
import Container from '../../src/components/Container'
import { Header } from '../../src/components/Header'
import Seperator from '../../src/components/Seperator'
import { Button } from '../../src/styled/Components'
import Head from 'next/head'
import { Role, useBorrowMutation, useCurrentRoleQuery } from '../../src/generated/graphql'
import { useRouter } from 'next/router'
import { notFound } from '../../src/utils/next'
import { GraphQL } from '../../src/next/graphql'
import { bookIdsQuery } from '../../src/next/graphql/bookIds'
import { bookQuery } from '../../src/next/graphql/book'
import { BookNotFound } from '../../src/svg/BookNotFound'

const Card = styled.div({
    background: "#F3F3F3",
    borderRadius: ".4rem",
    display: "grid",
    gridTemplateRows: "1fr",
    gridTemplateColumns: "0fr 2fr",
    img: {
        userSelect: "none",
        borderRadius: ".4rem 0 0 .4rem",
        width: "10rem",
        minWidth: "10rem",
        height: "100%",
        objectFit: "cover"
    },
    svg: {
        paddingLeft: "1rem",
        minWidth: "10rem",
        height: "100%",
    },
})
const ButtonWrapper = styled.div({
    display: "flex",
    justifyContent: "flex-end"
})
const InfoContainer = styled.div({
    margin: "1rem 1rem",
    h1: {
        fontSize: "clamp(1.25rem, 5vw, 2.5rem)",
        marginBottom: "1rem",
        wordBreak: "break-all",
    },
    button: {
        padding: "1rem 2rem",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        background: "white",
        color: "black",
        margin: "1rem"
    },
    display: "flex",
    flexDirection: "column",
    p: {
        flexGrow: 1,
        wordBreak: "break-all",

    }
})

function id({ id, description = "", name = "", imageUrl }: IBook) {
    const [imgError, setImgError] = useState(false);
    const Router = useRouter()
    const [, borrow] = useBorrowMutation()
    const [{ data, error }] = useCurrentRoleQuery();
    async function submitBorrow() {
        await borrow({ id });
        Router.push("/books");
    }

    function imageError() {
        setImgError(true)
    }

    return (
        <>
            <Head>
                <title>Digital Library - {name}</title>
            </Head>
            <Header />
            <Container stretch WrapperStyle={{ margin: "1.5rem 0" }} max="65rem" min="1px" value="100%">
                <Card>
                    <div>
                        {
                            imgError ? <BookNotFound /> : <img onError={imageError} src={imageUrl} />
                        }
                    </div>
                    <InfoContainer>
                        <h1>{name}</h1>
                        <Seperator margin="0" />
                        <p>{description}</p>

                        <ButtonWrapper>
                            <Button style={{ visibility: data?.currentUser?.role == Role.Administrator ? "visible" : "hidden" }} onClick={submitBorrow}>Borrow</Button>
                        </ButtonWrapper>
                    </InfoContainer>
                </Card>
            </Container>
        </>
    )
}

export default id

export async function getStaticProps(context) {
    try {

        const data = await GraphQL.request<{ book: IBook }>(bookQuery, {
            id: parseInt(context.params.id)
        })

        if (data?.book == null) return notFound;

        return {
            props: data?.book,
            revalidate: 60
        }

    } catch (err) {
        const ERROR = err as AxiosError;

        return notFound;
    }
}

export async function getStaticPaths() {

    const books = await GraphQL.request<{ bookIds: number[] }>(bookIdsQuery);

    return {
        paths: books?.bookIds?.map(id => ({ params: { id: `${id}` } })),
        fallback: true
    }
}