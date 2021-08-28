import Head from 'next/head'
import Logo from "src/svg/Logo";
import { Container } from 'src/components/utils/Container';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { BaseButton } from 'src/styled/Buttons';


const variants = {
  show: {
    transition: {
      staggerChildren: 0.1
    }
  }
}
const item = {
  show: {
    y: 0,
    opacity: 1
  },
  hidden: {
    y: -100,
    opacity: 0
  }
}
// TODO removed animations for buttons maybe add fade in effect without stagger?
function Home() {
  return (
    <>
      <Head>
        <title>Digital Library</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Digital Library - Home Page" />
      </Head>

      <Container variants={variants} animate="show" initial="hidden" style={{ marginTop: "1rem" }} min="1px" max="45rem" value="100%">

        <Logo variants={item} height="45vh" />
        <TitleText variants={item}>Digital Library</TitleText>

        <ActionContainer>
          <Link href="/register">
            <BaseButton size="1rem 2.5rem">Register</BaseButton>
          </Link>
          <Link href="/login">
            <BaseButton variant="transparent" size="1rem 2.5rem">Log In</BaseButton>
          </Link>
        </ActionContainer>

      </Container>
    </>
  )
}

const TitleText = styled(motion.h1)({
  margin: "1.5rem",
  fontSize: "clamp(2rem, 1rem + 6.5vw, 4.5rem)",
  fontWeight: 500,
  textAlign: "center"
})

const ActionContainer = styled(motion.div)({
  marginTop: "clamp(1rem, 1vw + 1.25rem, 3.5rem)",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-around",
  flexWrap: "wrap",
  width: "100%",
  maxWidth: " 22.5rem",
})
export default Home;