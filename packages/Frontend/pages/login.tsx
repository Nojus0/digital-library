import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import AttentionCard from "src/components/AttentionCard";
import Container from "src/components/Container";
import Seperator from "src/components/Seperator";
import { Button, TextBox } from "src/styled/Components";
import SvgLogo from "src/svg/Logo";
import { Form } from "src/components/Form";
import { Role } from "@dl/shared";
import { observer } from "mobx-react";
import { store } from "src/state/UserStore";

function login(props) {
  const Router = useRouter();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");

  function findErrors() {
    if (email.length < 3 || !email.includes("@")) return "Invalid email address."
    if (password.length < 3) return "Password too short."

    return null;
  }

  async function loginSubmit(e: React.MouseEvent) {
    e.preventDefault();
    const error = await store.changeUser({ email, password });

    if (error) return setError(error);

    await Router.push("/books");
  }

  return (
    <>
      <Head>
        <title>Digital Library - Log In</title>
      </Head>
      <Container min="1px" value="100%" max="25em" >
        <Form>
          <SvgLogo width="7em" />
          <h1>Log In</h1>

          <AttentionCard show={error != ""} color="#FF3636">
            <h5>{error}</h5>
          </AttentionCard>


          <form action="">
            <TextBox type="email" onChange={e => setEmail(e.target.value)} value={email} placeholder="Email" />
            <TextBox type="password" onChange={e => setPass(e.target.value)} value={password} placeholder="Password" />
            <Button onClick={loginSubmit} type="submit">Log In</Button>
          </form>

          <Seperator />

          <p>
            Don't have an account?
            <Link href="/register">
              <span>Register</span>
            </Link>
          </p>
        </Form>
      </Container>
    </>
  );
}




export default observer(login);