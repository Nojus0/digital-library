import { useRegisterMutation } from "Frontend/src/graphql/register";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import AttentionCard from "../src/components/AttentionCard";
import Container from "../src/components/Container";
import Seperator from "../src/components/Seperator";
import { Button, TextBox } from "../src/styled/Components";
import SvgLogo from "../src/svg/Logo";
import css from "../styles/loginRegister.module.scss";
import transition from "../styles/transitions/AttentionCard.module.scss";
import logoTransition from "../styles/transitions/Logo.module.scss";

function register() {
    const Router = useRouter();
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUser] = useState("");
    const [password, setPass] = useState("");
    const [confirm, setConfirm] = useState("");
    const [, register] = useRegisterMutation();

    async function SubmitRegister() {
        if (!IsAcceptable(email)) return setError("Email too short.");
        if (!IsAcceptable(username)) return setError("Username too short.");
        if (!IsAcceptable(password)) return setError("Password too short.");
        if (!email.includes("@")) return setError("Invalid email address.");
        if (password !== confirm) return setError("Passwords do not match.");

        const resp = await register({ email, username, password });
        const { data, error } = resp

        if (data?.register?.error != null) return setError(data?.register?.error);

        if (error) return setError("Cannot connect to server.");
        Router.push("/login");

        setError("");
    }

    function IsAcceptable(str: string) {
        return str.length > 4
    }

    return (
        <>
            <Head>
                <title>Digital Library - Register</title>
            </Head>

            <Container min="1px" value="100%" max="25em" classes={css.container}>
                <CSSTransition
                    in={error == ""}
                    timeout={250}
                    unmountOnExit
                    classNames={logoTransition}
                >
                    <SvgLogo width="7em" />
                </CSSTransition>
                <h1>Register</h1>

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

                <TextBox
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <TextBox
                    value={username}
                    onChange={(e) => setUser(e.target.value)}
                    placeholder="Username"
                />
                <TextBox
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPass(e.target.value)}
                />
                <TextBox
                    type="password"
                    placeholder="Confirm Password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                />
                <Button onClick={SubmitRegister}>Register</Button>
                <Seperator />

                <p>
                    Already have an account?
                    <Link href="/login">
                        <span>Log In</span>
                    </Link>
                </p>
            </Container>
        </>
    );
}

export default register;