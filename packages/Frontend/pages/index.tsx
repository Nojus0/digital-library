import Head from 'next/head'
import styles from "styles/main.module.scss";
import Logo from "src/svg/Logo";
import { Button } from 'src/styled/Components';
import { Container } from 'src/components/Container';
import Link from 'next/link';
import { motion } from 'framer-motion';


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
        <motion.h1 variants={item} className={styles.maintext}>Digital Library</motion.h1>

        <div className={styles.actionContainer}>
          <Link href="/register">
            <Button>Register</Button>
          </Link>
          <Link href="/login">
            <Button style={{ background: "transparent", color: "black" }} >Log In</Button>
          </Link>
        </div>

      </Container>
    </>
  )
}
export default Home;