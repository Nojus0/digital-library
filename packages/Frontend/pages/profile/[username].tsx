import styled from "@emotion/styled";
import Head from "next/head";
import React from "react";
import Book, { IBookProps } from "src/components/Book";
import Container from "src/components/Container";
import { Header } from "src/components/Header";
import { RankCard } from "src/components/RankCard";
import Seperator from "src/components/Seperator";
import { client } from "src/next/graphql"
import { userProfileQuery } from "src/graphql/user/userProfile";
import { notFound } from "src/next/next";
import { IUser } from "@dl/shared"
import { motion } from "framer-motion";

interface ProfileProps {
    username: string;
    role: string;
    borowing: IBookProps[];
}

const variants = {
    hidden: {
        opacity: 0,
    },
    show: {
        opacity: 1,
    }
}

const container = {
    show: {
        transition: {
            staggerChildren: 0.1,
        }
    }
}

const bookVariant = {
    hidden: {
        opacity: 0,
    },
    show: {
        opacity: 1,
        transition: {
            delay: 0.3
        },
    }
}

function id({ username = "", borowing = [], role = "" }: ProfileProps) {
    return (
        <>
            <Head>
                <title>{username}'s Profile - Digital Library</title>
            </Head>
            <Header />
            <Container container={{ variants: container, animate: "show", initial: "hidden" }} min="1px" value="100%" max="45rem" stretch>

                <NameLogo variants={variants}>
                    <ProfileLogo>
                        <h1>{username?.substring(0, 1)?.toUpperCase()}</h1>
                    </ProfileLogo>
                    <h1>{username}</h1>
                </NameLogo>

                <RankCard variants={variants} rank={role} />
                <Seperator variants={variants} />
                <BorowedBrowser transition={{ delay: 10 }} variants={container} animate="show" initial="hidden">
                    {
                        borowing.map(book =>
                            <motion.div variants={bookVariant}>
                                <Book {...book} key={book.name} />
                            </motion.div>)
                    }
                </BorowedBrowser>
            </Container>
        </>
    );
}

export async function getServerSideProps(ctx) {

    const { data, error } = await client.query<{ userProfile: IUser }>(
        userProfileQuery,
        { username: ctx.params.username }
    ).toPromise();

    if (data?.userProfile == null || error != null) return notFound;
    return {
        props: {
            ...data?.userProfile
        }
    }
}

export default id;

const NameLogo = styled(motion.div)({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    margin: ".75rem 0",
    h1: {
        fontSize: "2.85rem",
        fontWeight: 500,
    },
});

const ProfileLogo = styled(motion.div)({
    display: "flex",
    margin: "1rem",
    userSelect: "none",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    background: "#3D3D3D",

    minWidth: "4.5rem",
    height: "4.5rem",
    h1: {
        fontWeight: 500,
        fontSize: "1.65rem",
        color: "white",
    },
});

const BorowedBrowser = styled(motion.div)({
    margin: "1rem 0",
    display: "flex",
    flexDirection: "column",
});