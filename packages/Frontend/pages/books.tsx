import React, { useEffect, } from "react";
import Header from "src/components/Header";
import { Container } from "src/components/utils/Container";
import Head from "next/head";
import { useVisibility } from "src/hooks/useVisibility";
import { observer } from "mobx-react";
import { bookStore } from "src/state/LoadedBookStore";
import Book from "src/components/BookParts/Book";
import styled from "@emotion/styled";

export default function books() {
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
                style={{ margin: "1.5rem 0 5rem" }}
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
                    <BookListItem
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

const BookListItem = styled(Book)({ // Extend
    marginBottom: "1.25rem"
})

