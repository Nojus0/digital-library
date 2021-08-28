import styled from "@emotion/styled";
import React, { useState } from "react";
import { Container } from "src/components/utils/Container";
import Header from "src/components/Header";
import Seperator from "src/components/utils/Seperator";
import Head from "next/head";
import { client } from "src/graphql/client";
import { bookQuery } from "src/graphql/books/book";
import { IBook, Role } from "@dl/shared";
import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { userStore } from "src/state/UserStore";
import { GetServerSideProps } from "next";
import BookImage from "src/components/BookParts/BookImage"
import opacity from "src/framer/opacity";
import { manageStore } from "src/state/ManageBookStore";
import ManageUser from "src/components/Manage/ManageUser";
import { BaseButton } from "src/styled/Buttons";

function id({ name, imageUrl, description }: IBook) {
    const [imgError, setImgError] = useState(false);

    function imageError() {
        setImgError(true);
    }

    return (
        <>
            <ManageUser />
            <Head>
                <title>Digital Library - {name}</title>
            </Head>
            <Header />
            <Container
                style={{ margin: "1.5rem 0 5rem" }}
                max="65rem"
                min="1px"
                value="100%"
            >
                <Card variants={opacity} animate="show" initial="hidden">
                    <BookImage src={imageUrl} />
                    <InfoContainer>
                        <CardHeader>{name}</CardHeader>
                        <Seperator margin="0" />
                        <CardDescription>{description}</CardDescription>
                        <ButtonWrapper>
                            <ManageButton
                                variant="light"
                                size="1rem 2rem"
                                shown={userStore.user.role == Role.Administrator}
                                onClick={e => manageStore.open()}
                            >
                                Manage
                            </ManageButton>
                        </ButtonWrapper>
                    </InfoContainer>
                </Card>
            </Container>
        </>
    );
}

export default observer(id);

export const getServerSideProps: GetServerSideProps<IBook> = async ({ params }) => {
    const { data, error } = await client
        .query<{ book: IBook }>(bookQuery, {
            id: parseInt(params.id as string),
        }).toPromise();

    if (data?.book == null || error != null) return { notFound: true };

    return {
        props: data.book,
    };
};


interface IManageButtonProps {
    shown: boolean
}

const ManageButton = styled(BaseButton)(({ shown }: IManageButtonProps) => ({
    visibility: shown ? "visible" : "hidden"
}))

const CardHeader = styled(motion.h1)({
    fontSize: "clamp(1.25rem, 5vw, 2.5rem)",
    marginBottom: "1rem",
    wordBreak: "break-all",
})

const CardDescription = styled(motion.p)({
    flexGrow: 1,
    wordBreak: "break-all",
})

const Card = styled(motion.div)({
    background: "#F3F3F3",
    borderRadius: ".4rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    "img, svg": {
        userSelect: "none",
        borderRadius: ".4rem 0 0 .4rem",
        width: "10rem",
        minWidth: "10rem",
        height: "100%",
        objectFit: "cover",
    }
});

const ButtonWrapper = styled.div({
    display: "flex",
    justifyContent: "flex-end",
});

const InfoContainer = styled.div({
    margin: "1rem 1.5rem",
    display: "flex",
    minHeight: "12.5rem",
    width: "100%",
    flexDirection: "column"
});
