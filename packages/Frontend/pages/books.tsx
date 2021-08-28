import React, { useEffect, } from "react";
import Header from "src/components/Header";
import { Container } from "src/components/utils/Container";
import Head from "next/head";
import { observer } from "mobx-react-lite";
import { bookStore } from "src/state/LoadedBookStore";
import Book from "src/components/BookParts/Book";
import styled from "@emotion/styled";
import { Waypoint } from "react-waypoint";
import { useAuthedRoute } from "src/hooks/useAuthedRoute";

export default observer(books);
function books() {

    useAuthedRoute();

    useEffect(() => {
        if (bookStore.books.length < 1)
            bookStore.loadBooks()
    }, [])

    function onLastSeen(e: Waypoint.CallbackArgs) {
        bookStore.nextPage();
        bookStore.loadBooks()
    }

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
                {
                    bookStore.books.map((book, index) => (
                        bookStore.books.length - 1 == index
                            ?
                            <Waypoint key={book.id} onEnter={onLastSeen}>
                                <BookListItem
                                    key={book.id}
                                    initial="hidden"
                                    animate="show"
                                    variants={item}
                                    {...book}
                                />
                            </Waypoint>
                            :
                            <BookListItem
                                key={book.id}
                                initial="hidden"
                                animate="show"
                                variants={item}
                                {...book}
                            />
                    ))
                }
            </Container>
        </>
    );
}


const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
};


// function BookListBook(book: IBook) {
//     return (

//     )
// }

const BookListItem = styled(Book)({ // Extend
    marginBottom: "1.25rem"
})

