import Head from 'next/head'
import styles from "../styles/main.module.scss";
import Logo from "../src/svg/Logo";
import { Button } from '../src/styled/Components';
import { Container } from '../src/components/Container';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Digital Library</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Digital Library - Home Page" />
      </Head>

      <Container WrapperStyle={{ marginTop: "1rem" }} min="1px" max="45rem" value="100%">

        <Logo onClick={e => { }} height="45vh" />
        <h1 className={styles.maintext}>Digital Library</h1>

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
