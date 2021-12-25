import styled from "@emotion/styled";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Container } from "src/components/utils/Container";
import Header from "src/components/Header";
import { RankCard } from "src/components/RankCard";
import Seperator from "src/components/utils/Seperator";
import { client } from "src/graphql/client";
import {
  IUserProfileQuery,
  IUserProfileVariables,
  userProfileQuery,
} from "src/graphql/user/userProfile";
import { IBook, IUser, Role } from "@dl/shared";
import { motion } from "framer-motion";
import { GetServerSideProps } from "next";
import Book from "src/components/BookParts/Book";
import { useRouter } from "next/router";

interface ProfileProps {
  username: string;
  role: string;
  borowing: IBook[];
}
const variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};
const container = {
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};
const bookVariant = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      delay: 0.3,
    },
  },
};
// TODO change motion div from wrapping book component to book having motion div attributes.
function id(props) {
  const router = useRouter();
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    if (router.query.username) getUser(router.query.username as string);
  }, [router.query.username]);

  async function getUser(username: string) {
    const { data, error } = await client
      .query<IUserProfileQuery, IUserProfileVariables>(userProfileQuery, {
        username,
      })
      .toPromise();
    setUser(data.userProfile);

    if (!data || !data.userProfile || error) router.push("/books");
  }

  return (
    <>
      <Head>
        <title>Profile - Digital Library</title>
      </Head>
      <Header />
      <Container
        style={{ marginBottom: "5rem" }}
        variants={container}
        animate="show"
        initial="hidden"
        min="1px"
        value="100%"
        max="45rem"
      >
        {user && (
          <>
            <NameLogo variants={variants}>
              <ProfileLogo>
                <h1>{user?.username?.substring(0, 1)?.toUpperCase()}</h1>
              </ProfileLogo>
              <h1>{user.username}</h1>
            </NameLogo>

            <RankCard variants={variants} rank={user.role} />

            <Seperator margin="1rem 0" variants={variants} />
            <BorowedBrowser
              transition={{ delay: 10 }}
              variants={container}
              animate="show"
              initial="hidden"
            >
              {user.borowing.map((book) => (
                <Book
                  style={{ marginBottom: "1.25rem" }}
                  key={book.id}
                  variants={bookVariant}
                  {...book}
                />
              ))}
            </BorowedBrowser>
          </>
        )}
      </Container>
    </>
  );
}

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {

//   return {
//     props: data.userProfile,
//   };
// };

export default id;

const NameLogo = styled(motion.div)({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  margin: ".75rem 0",
  h1: {
    fontSize: "2.85rem",
    textAlign: "center",
    margin: "0 .25rem",
    wordBreak: "break-all",
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
    // width
  },
});

const BorowedBrowser = styled(motion.div)({
  display: "flex",
  width: "100%",
  flexDirection: "column",
});
