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
import { useVisibility } from "src/hooks/useVisibility";
import { useUser } from "src/state/UserContext";

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
    const [isVisible, ref] = useVisibility<HTMLDivElement>(0, 500)
    const [hasMore, setHasMore] = useState(true);
    const [books, setBooks] = useState<IBook[]>([]);
    const [user, dispatch] = useUser();
    async function refetchBooks() {
        const { data, error } = await client
            .query<{ books: IBook[] }>(booksQuery, { page, limit })
            .toPromise();

        if (error) return; // TODO add popup

        if (data.books.length != limit) return setHasMore(false);

        setHasMore(true);
        setBooks(prev => [...prev, ...data.books]);
    }
    useEffect(() => {
        if (hasMore) refetchBooks();
    }, [page, limit]);

    useEffect(() => {
        if (isVisible) setPage(prev => prev + limit);
    }, [isVisible]);

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
                <BooksList ref={ref} books={books} />
            </Container>
        </>
    );
}

interface IBooksListProps {
    books: IBook[],
}

const BooksList = React.forwardRef<HTMLDivElement, IBooksListProps>(({ books }, ref) => {
    return (
        <motion.div initial="hidden" animate="show" variants={container}>
            {
                books.map((book, index) => (
                    <motion.div ref={ref} key={book.id} variants={item}>
                        <Book
                            {...book}
                        />
                    </motion.div>
                ))
            }
        </motion.div>
    )
})
export default books;
