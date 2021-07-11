import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import AttentionCard from "../src/components/AttentionCard";
import Container from "../src/components/Container";
import Seperator from "../src/components/Seperator";
import { useLoginMutation } from "../src/generated/graphql";
import { Button, TextBox } from "../src/styled/Components";
import SvgLogo from "../src/svg/Logo";
import css from "../styles/loginRegister.module.scss";
import transition from "../styles/transitions/AttentionCard.module.scss";

function login(props) {
  const Router = useRouter();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [, RequestLogin] = useLoginMutation();

  useEffect(() => {
  }, [])


  async function SubmitLogin() {
    setError("");
    if (email.length < 3) return setError("Email address too short.");
    if (!email.includes("@")) return setError("Invalid email address.");
    if (password.length < 3) return setError("Password too short.");
    const { data, error } = await RequestLogin({ email, password }, { fetchOptions: { credentials: "include" } });

    if (data?.login?.error != null || error != null) return setError(data?.login?.error || "Cannot connect to server.");

    Router.push("/books");
  }

  return (
    <>
      <Head>
        <title>Digital Library - Log In</title>
      </Head>

      <Container min="1px" value="100%" max="25em" classes={css.container}>
        <SvgLogo width="7em" />
        <h1>Log In</h1>

        <CSSTransition
          in={error !== ""}
          timeout={250}
          unmountOnExit
          classNames={transition}
        >
          <AttentionCard color="#FF3636">
            <h5>{error}</h5>
          </AttentionCard>
        </CSSTransition>

        <TextBox onChange={e => setEmail(e.target.value)} value={email} placeholder="Email" />
        <TextBox onChange={e => setPass(e.target.value)} value={password} type="password" placeholder="Password" />
        <Button onClick={SubmitLogin}>Log In</Button>
        <Seperator />

        <p>
          Don't have an account?
          <span onClick={() => Router.push("/register")}>Register</span>
        </p>
      </Container>
    </>
  );
}

export default login;