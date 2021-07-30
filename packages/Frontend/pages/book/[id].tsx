import styled from "@emotion/styled";
import React, { useState } from "react";
import { IBookProps } from "src/components/Book";
import Container from "src/components/Container";
import Header from "src/components/Header";
import Seperator from "src/components/Seperator";
import { Button } from "src/styled/Components";
import Head from "next/head";
import { useRouter } from "next/router";
import { BookNotFound } from "src/svg/BookNotFound";
import { client } from "src/next/graphql";
import { bookQuery } from "src/graphql/books/book";
import { Role } from "@dl/shared";
import { ManageUser } from "src/components/ManageUser";
import { motion } from "framer-motion";
import { observer } from "mobx-react";
import { store } from "src/state/UserStore";
import { GetServerSideProps } from "next";

export interface IBooksProps extends IBookProps {
    showBorrow: boolean;
    description: string;
}

const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
};

function id({
    id,
    description = "",
    name = "",
    imageUrl,
    showBorrow,
}: IBooksProps) {
    const [imgError, setImgError] = useState(false);
    const Router = useRouter();
    const [isManage, setManage] = useState(false);

    async function Manage() {
        setManage(true);
    }

    function imageError() {
        setImgError(true);
    }

    return (
        <>
            <ManageUser setShow={setManage} show={isManage} />
            <Head>
                <title>Digital Library - {name}</title>
            </Head>
            <Header />
            <Container
                stretch
                WrapperStyle={{ margin: "1.5rem 0" }}
                max="65rem"
                min="1px"
                value="100%"
            >
                <Card variants={item} animate="show" initial="hidden">
                    <div>
                        {imgError ? (
                            <BookNotFound />
                        ) : (
                            <img onError={imageError} src={imageUrl} />
                        )}
                    </div>
                    <InfoContainer>
                        <h1>{name}</h1>
                        <Seperator margin="0" />
                        <p>{description}</p>
                        { }
                        <ButtonWrapper>
                            <Button
                                style={{
                                    visibility:
                                        store.user.role == Role.Administrator
                                            ? "visible"
                                            : "hidden",
                                }}
                                onClick={Manage}
                            >
                                Manage
                            </Button>
                        </ButtonWrapper>
                    </InfoContainer>
                </Card>
            </Container>
        </>
    );
}

export default observer(id);

export const getServerSideProps: GetServerSideProps<IBookProps> = async ({ params }) => {
    const { data, error } = await client
        .query<{ book: IBookProps }>(bookQuery, {
            id: parseInt(params.id as string),
        }).toPromise();
    
        if (data?.book == null || error != null) return { notFound: true };

    return {
        props: data.book,
    };
};

const Card = styled(motion.div)({
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
        objectFit: "cover",
    },
    svg: {
        paddingLeft: "1rem",
        minWidth: "10rem",
        height: "100%",
    },
});

const ButtonWrapper = styled.div({
    display: "flex",
    justifyContent: "flex-end",
    button: {
        padding: "1rem 2rem",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        background: "white",
        color: "black",
        margin: "1rem",
    },
});

const InfoContainer = styled.div({
    margin: "1rem 1rem",
    h1: {
        fontSize: "clamp(1.25rem, 5vw, 2.5rem)",
        marginBottom: "1rem",
        wordBreak: "break-all",
    },
    display: "flex",
    minHeight: "12.5rem",
    flexDirection: "column",
    p: {
        flexGrow: 1,
        wordBreak: "break-all",
    },
});
