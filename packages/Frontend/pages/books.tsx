import React, { useEffect, useRef, useState } from "react";
import { Header } from "src/components/Header";
import Container from "src/components/Container";
import Head from "next/head";
import { useQuery } from "urql";
import { booksQuery } from "src/graphql/books/books";
import Book from "src/components/Book";
import { AnimatePresence, motion } from "framer-motion";
import { IBook } from "@dl/shared";
import { client } from "src/next/graphql";
import { useOnScreen } from "src/components/Hooks/useOnScreen";

const container = {
    show: {
        transition: {
            staggerChildren: 0.01,
        },
    },
};

const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
};

function books() {
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [books, setBooks] = useState<IBook[]>([]);
    const lastBookRef = useRef<HTMLDivElement>();
    const seen = useOnScreen(lastBookRef);

    async function refetchBooks() {
        const { data, error } = await client
            .query<{ books: IBook[] }>(booksQuery, { page, limit })
            .toPromise();

        if (data?.books == null || error != null) return;

        setBooks(data.books);
    }
    console.log("render")
    useEffect(() => {
        refetchBooks();
    }, [page, limit]);
    console.log(lastBookRef)
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
                WrapperStyle={{ marginTop: "1.5rem" }}
            >
                {books != null && (
                    <motion.div initial="hidden" animate="show" variants={container}>
                        
                        {books.map((book, index) => (
                            <motion.div ref={lastBookRef} key={book.id} variants={item}>
                                <Book
                                    {...book}
                                />
                            </motion.div>
                        ))}


                    </motion.div>
                )}
            </Container>
        </>
    );
}

export default books;
