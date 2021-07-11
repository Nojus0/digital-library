import Head from 'next/head'
import styles from "../styles/main.module.scss";
import Logo from "../src/svg/Logo";
import { Button } from '../src/styled/Components';
import { Container } from '../src/components/Container';
import { useRouter } from "next/router"

export default function Home() {
  const Router = useRouter();
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
          <Button onClick={() => Router.push("/register")}>Register</Button>
          <Button style={{ background: "transparent", color: "black" }} onClick={() => Router.push("/login")}>Log In</Button>
        </div>

      </Container>
    </>
  )
}
