import React from 'react'
import { Header } from '../src/components/Header';
import Container from '../src/components/Container'
import Head from 'next/head'

function home() {
    return (
        <>
            <Head>
                <title>Books - Digital Library</title>
            </Head>
            <Header />
            <Container min="1px" value="100%" max="45rem"
                WrapperStyle={{ marginTop: "2rem" }}>
                <h1>books</h1>
            </Container>

        </>
    )
}

export default home
