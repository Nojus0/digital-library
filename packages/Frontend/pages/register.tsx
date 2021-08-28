import { IRegisterVariables } from "src/graphql/user/register";
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

const variants = {
    normal: {
        width: "7rem"
    },
    collapsed: {
        width: "2rem"
    }
}

export interface IRegisterDetails extends IRegisterVariables {
    confirmPassword: string
}

function register() {
    const Router = useRouter();
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUser] = useState("");
    const [password, setPass] = useState("");
    const [confirmPassword, setConfirm] = useState("");

    async function SubmitRegister(e: React.MouseEvent) {
        e.preventDefault();

        const error = await userStore.register({
            email, username, password, confirmPassword
        });

        if (error) return setError(error);

        await Router.push("/login");
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
                        value={confirmPassword}
                        onChange={(e) => setConfirm(e.target.value)}
                    />
                    <BaseButton type="submit" onClick={SubmitRegister}>Register</BaseButton>
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

export default observer(register);