import React, { useEffect, useMemo, useRef, useState } from "react";
import Header from "src/components/Header";
import Container from "src/components/Container";
import Head from "next/head";
import Book from "src/components/Book";
import { useVisibility } from "src/hooks/useVisibility";
import { observer } from "mobx-react";
import { bookStore } from "src/state/LoadedBookStore";

function books() {
    return (
        <>
            <Head>
                <title>Books - Digital Library</title>
            </Head>
            <Header />
            <Container
                min="1px"
                value="100%"
                max="45rem"
                WrapperStyle={{ margin: "1.5rem 0 5rem" }}
            >
                <BooksList />
            </Container>
        </>
    );
}

const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
};

const BooksList = observer(props => {

    const [isVisible, ref] = useVisibility<HTMLDivElement>(0, 100);

    useEffect(() => {
        if (bookStore.books.length < 1)
            bookStore.loadBooks();
    }, [])
    
    useEffect(() => {
        if (!isVisible) return;

        bookStore.nextPage();
    }, [isVisible])

    return (
        <>
            {
                bookStore.books.map((book, index) => (
                    <Book
                        ref={bookStore.books.length - 1 == index ? ref : undefined}
                        key={book.id}
                        initial="hidden"
                        animate="show"
                        variants={item}
                        {...book}
                    />
                ))
            }
        </>
    )
})

export default books;
