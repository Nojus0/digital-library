import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import AttentionCard from "src/components/AttentionCard";
import Container from "src/components/Container";
import Seperator from "src/components/Seperator";
import { Button, TextBox } from "src/styled/Components";
import SvgLogo from "src/svg/Logo";
import transition from "styles/transitions/AttentionCard.module.scss";
import { useLoginMutation } from "src/graphql/user/login";
import { useUser } from "src/state/UserContext";
import { Form } from "src/components/Form";
import { Role } from "@dl/shared";
import { ChangeUser } from "src/state/actions/actions";

function login(props) {
  const Router = useRouter();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [user, dispatch] = useUser();
  const [{ fetching }, LoginGQL] = useLoginMutation();
  if (user.username != null) Router.push("/books");

  async function SubmitLogin(e: React.MouseEvent) {
    e.preventDefault();

    const ERROR = findErrors();
    if (ERROR != null) return setError(ERROR)

    const { data, error } = await LoginGQL({ email, password })

    if (data.login.user == null) return setError(data.login.error || "Cannot connect to server.");

    const { login: { user: { role, username } } } = data;

    dispatch(ChangeUser(username, Role[role]));

    Router.push("/books");
  }

  function findErrors() {
    if (email.length < 3 || !email.includes("@")) return "Invalid email address."
    if (password.length < 3) return "Password too short."

    return null;
  }

  if (user.username != null) Router.push("/books");
  if (user.fetching) return <div></div>

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
            <Button type="submit" onClick={SubmitLogin}>Log In</Button>
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




export default login;