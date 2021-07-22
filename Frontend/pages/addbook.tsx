import React, { useRef, useState } from 'react'
import { Header } from 'src/components/Header'
import { Container } from "src/components/Container"
import styled from '@emotion/styled'
import { Button, TextArea, TextBox } from 'src/styled/Components'
import Seperator from 'src/components/Seperator'
import { AddPhotoButton } from 'src/svg/AddPhotoSvg'
import { useRouter } from 'next/router'
import Head from 'next/head'


function AddBook() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const router = useRouter();
    const fileRef = useRef<HTMLInputElement>();
    const [imgFile, setImgFile] = useState<File>(null);

    async function submitAdd() {
        
        router.push("/books");
    }

    async function fileChange(e: React.ChangeEvent<HTMLInputElement>) {
        setImgFile(e.target.files[0]);
    }

    return (
        <>
            <Head>
                <title>Add a Book - Digital Library</title>
            </Head>
            <Header />
            <Container WrapperStyle={{ marginTop: "1rem" }} value="100%" min="1rem" max="45rem" stretch>
                <AddBookPaper>
                    <ImgContainer>
                        <AddPhotoButton onClick={e => fileRef.current.click()} />
                        <input style={{ display: "none" }}
                            ref={fileRef}
                            onChange={fileChange}
                            type="file"
                            name="file"
                            accept="image/png, image/jpeg"
                        />
                    </ImgContainer>
                    <AddBookForm>
                        <TextBox value={name} onChange={e => setName(e.target.value)} placeholder="Book name"></TextBox>
                        <Seperator margin="0" width="100%" />
                        <TextArea value={description} onChange={e => setDescription(e.target.value)} style={{ resize: "none" }} rows={20} placeholder="Book description"></TextArea>
                        <Button onClick={submitAdd}>Add</Button>
                    </AddBookForm>

                </AddBookPaper>
            </Container>
        </>
    )
}

export default AddBook;


const AddBookPaper = styled.div({
    display: "grid",
    gridTemplateColumns: "0.6fr 1.4fr",
    gridTemplateRows: "1fr",
    background: "#F3F3F3",
    borderRadius: ".4rem",
})

const AddBookForm = styled.div({
    padding: "1rem 2rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    alignItems: "center",

    "input, div, textarea": {
        width: "100%"
    },
    button: {
        padding: ".85rem 2rem",
        alignSelf: "flex-end"
    }
})

const ImgContainer = styled.div({
    background: "#C4C4C4",
    borderRadius: ".4rem 0rem 0rem .4rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
})