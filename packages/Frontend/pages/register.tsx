import { useRegisterMutation } from "src/graphql/user/register";
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
import { AnimatePresence } from "framer-motion";


const variants = {
    normal: {
        width: "7rem"
    },
    collapsed: {
        width: "2rem"
    }
}

function register() {
    const Router = useRouter();
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUser] = useState("");
    const [password, setPass] = useState("");
    const [confirm, setConfirm] = useState("");
    const [, register] = useRegisterMutation();

    async function SubmitRegister(e: React.MouseEvent) {
        e.preventDefault();
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

            <Container min="1px" value="100%" max="25em">
                <Form>
                    <SvgLogo variants={variants} animate={error == "" ? "normal" : "collapsed"} width="7em" />
                    <h1>Register</h1>


                    <AttentionCard show={error != ""} color="#FF3636">
                        <h5>{error}</h5>
                    </AttentionCard>

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
                    <Button type="submit" onClick={SubmitRegister}>Register</Button>
                    <Seperator />

                    <p>
                        Already have an account?
                        <Link href="/login">
                            <span>Log In</span>
                        </Link>
                    </p>
                </Form>
            </Container>
        </>
    );
}

export default register;