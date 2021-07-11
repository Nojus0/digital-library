import styled from "@emotion/styled";
import axios, { AxiosError } from "axios";
import Head from "next/head";
import React from "react";
import Book, { IBook } from "../../src/components/Book";
import Container from "../../src/components/Container";
import { Header } from "../../src/components/Header";
import { RankCard } from "../../src/components/RankCard";
import Seperator from "../../src/components/Seperator";
import { Role } from "../../src/generated/graphql";
import { gql } from "urql";
import { notFound } from "../../src/utils/next";
import { GraphQL } from "../../src/next/graphql";
import { userProfileQuery } from "../../src/next/graphql/userProfile";
import { usernamesQuery } from "../../src/next/graphql/usernames";

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

interface ProfileProps {
    username: string;
    role: string;
    borowing: IBook[];
}

function id({ username = "", borowing = [], role = Role.Consumer }: ProfileProps) {
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
                    {borowing.map((book, index) => (
                        <Book key={index} {...book} />
                    ))}
                </BorowedBrowser>
            </Container>
        </>
    );
}

export default id;

export async function getStaticProps(context) {
    try {

        const data = await GraphQL.request<{ userProfile: ProfileProps }>(
            userProfileQuery, { username: context.params.username }
        );

        if (data?.userProfile == null) return notFound;

        return {
            props: data?.userProfile,
            revalidate: 1,
        };

    } catch (err) {
        const ERROR = err as AxiosError;

        return notFound;
    }
}

export async function getStaticPaths() {

    const USERS = await GraphQL.request<{ usernames: string[] }>(usernamesQuery);

    return {
        paths: USERS.usernames.map((username) => ({ params: { username } })),
        fallback: true,
    };
}
