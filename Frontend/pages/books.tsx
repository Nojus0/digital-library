import React, { useEffect, useRef, useState } from 'react'
import Book, { IBook } from '../src/components/Book'
import { Header } from '../src/components/Header';
import { useBooksQuery } from "../src/generated/graphql"
import Container from '../src/components/Container'
import Head from 'next/head'


function home() {
    const [books, setBooks] = useState<IBook[]>([]);
    const limit = 50;

    let page = 0 * limit;
    const [{ data, error }] = useBooksQuery({ variables: { page, limit }, requestPolicy: "cache-and-network" });


    function transformResponse() {
        return data?.books?.map(bk => ({ ...bk }) as IBook) || [];
    }

    // function handleScroll(e: React.UIEvent<HTMLDivElement, UIEvent>) {

    //     const bottom = e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight;
    //     console.log(bottom)
    // }


    return (
        <>
            <Head>
                <title>Books - Digital Library</title>
            </Head>
            <Header />
            <Container min="1px" value="100%" max="45rem"
                WrapperStyle={{ marginTop: "2rem" }}>
                {
                    transformResponse().map((book, index) => <Book key={index} {...book} />)
                }
            </Container>

        </>
    )
}

export default home
