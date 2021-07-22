import styled from "@emotion/styled";
import Head from "next/head";
import React from "react";
import Book, { IBook } from "Frontend/src/components/Book";
import Container from "Frontend/src/components/Container";
import { Header } from "Frontend/src/components/Header";
import { RankCard } from "Frontend/src/components/RankCard";
import Seperator from "Frontend/src/components/Seperator";
import { client } from "Frontend/src/next/graphql"
import { userProfileQuery } from "Frontend/src/graphql/userProfile";
import { User } from "Server/src/entity/User"
import { notFound } from "Frontend/src/next/next";

interface ProfileProps {
    username: string;
    role: string;
    borowing: IBook[];
}

function id({ username = "", borowing = [], role = "" }: ProfileProps) {
    return (
        <>
            <Head>
                <title>{username}'s Profile - Digital Library</title>
            </Head>
            <Header />
            <Container min="1px" value="100%" max="45rem" stretch>
                <NameLogo>
                    <ProfileLogo>
                        <h1>{username?.substring(0, 1)?.toUpperCase()}</h1>
                    </ProfileLogo>
                    <h1>{username}</h1>
                </NameLogo>
                <RankCard rank={role} />
                <Seperator />
                <BorowedBrowser>
                    {borowing.map(book => <Book key={book.name} {...book} />)}
                </BorowedBrowser>
            </Container>
        </>
    );
}

export async function getServerSideProps(ctx) {

    const { data, error } = await client.query<{ userProfile: User }>(
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

const NameLogo = styled.div({
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

const ProfileLogo = styled.div({
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

const BorowedBrowser = styled.div({
    margin: "1rem 0",
    display: "flex",
    flexDirection: "column",
});