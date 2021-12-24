import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import AttentionCard from "src/components/AttentionCard";
import { Container } from "src/components/utils/Container";
import Seperator from "src/components/utils/Seperator";
import { TextBox } from "src/styled/Components";
import SvgLogo from "src/svg/Logo";
import { Form } from "src/components/Form";
import { observer } from "mobx-react-lite";
import { userStore } from "src/state/UserStore";
import { BaseButton } from "src/styled/Buttons";
import { motion } from "framer-motion";
import { child, parent } from "src/framer/stagger";

function login(props) {
  const Router = useRouter();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");

  function findErrors() {
    if (email.length < 3 || !email.includes("@"))
      return "Invalid email address.";
    if (password.length < 3) return "Password too short.";

    return null;
  }

  if (userStore.fetching) {
    return null;
  }

  if (userStore.user.signedIn) {
    Router.push("/books");
    return null;
  }

  async function loginSubmit(e: React.MouseEvent) {
    e.preventDefault();

    const clientErrors = findErrors();
    if (clientErrors) return setError(clientErrors);

    const error = await userStore.changeUser({ email, password });

    if (error) return setError(error);

    await Router.push("/books");
  }

  return (
    <>
      <Head>
        <title>Digital Library - Log In</title>
      </Head>
      <Container min="1px" value="100%" max="25em">
        <Form
          transition={{ delay: 10 }}
          variants={parent}
          initial="hidden"
          animate="show"
        >
          <SvgLogo to="/" width="7em" variants={child} />
          <motion.h1 variants={child}>Log In</motion.h1>

          <AttentionCard show={error != ""} color="#FF3636">
            <h5>{error}</h5>
          </AttentionCard>

          <motion.form action="">
            <TextBox
              variants={child}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email"
            />
            <TextBox
              variants={child}
              type="password"
              onChange={(e) => setPass(e.target.value)}
              value={password}
              placeholder="Password"
            />
            <BaseButton variants={child} onClick={loginSubmit} type="submit">
              Log In
            </BaseButton>
          </motion.form>

          <Seperator variants={child} />

          <motion.p variants={child}>
            Don't have an account?
            <Link href="/register">
              <span>Register</span>
            </Link>
          </motion.p>
        </Form>
      </Container>
    </>
  );
}

export default observer(login);
