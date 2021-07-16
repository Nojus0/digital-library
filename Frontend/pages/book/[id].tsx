import styled from '@emotion/styled'
import React, { useState } from 'react'
import { IBook } from 'Frontend/src/components/Book'
import Container from 'Frontend/src/components/Container'
import { Header } from 'Frontend/src/components/Header'
import Seperator from 'Frontend/src/components/Seperator'
import { Button } from 'Frontend/src/styled/Components'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { BookNotFound } from 'Frontend/src/svg/BookNotFound'
import { client } from 'Frontend/src/next/graphql'
import { bookQuery } from 'Frontend/src/graphql/book'
import { Book } from 'Server/src/entity/Book'
import { notFound } from 'Frontend/src/utils/next'

export default function id({ id, description = "", name = "", imageUrl }: IBook) {
    const [imgError, setImgError] = useState(false);
    const Router = useRouter()
    async function submitBorrow() {
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
                            <Button onClick={submitBorrow}>Borrow</Button>
                        </ButtonWrapper>
                    </InfoContainer>
                </Card>
            </Container>
        </>
    )
}


export async function getServerSideProps(ctx) {
    const { data, error } = await client.query<{ book: Book }>(bookQuery, { id: parseInt(ctx.params.id) }).toPromise();

    if(data?.book == null || error != null) return notFound;

    return {
        props: {
            ...data?.book
        }
    }
}


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