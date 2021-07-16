import React, { useState } from 'react'
import { Header } from 'Frontend/src/components/Header';
import Container from 'Frontend/src/components/Container'
import Head from 'next/head'
import { useQuery } from 'urql';
import { booksQuery } from 'Frontend/src/graphql/books';
import { Book as ServerBook } from 'Server/src/entity/Book';
import Book from "Frontend/src/components/Book"
import { CSSTransition } from 'react-transition-group';
import fadeAnim from "Frontend/styles/transitions/Fade.module.scss";
function home() {
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(50);

    const [{ data, error, fetching }] = useQuery<{ books: ServerBook[] }>({ query: booksQuery, variables: { page, limit } })

    return (
        <>
            <Head>
                <title>Books - Digital Library</title>
            </Head>
            <Header />
            <Container min="1px" value="100%" max="45rem"
                WrapperStyle={{ marginTop: "2rem" }}>
                {
                    data?.books?.map(book => <Book key={book.name}{...book} />)
                }
            </Container>
        </>
    )
}

export default home
