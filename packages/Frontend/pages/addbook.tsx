import React, { useRef, useState } from 'react'
import Header from 'src/components/Header'
import { Container } from "src/components/utils/Container"
import styled from '@emotion/styled'
import { TextArea, TextBox } from 'src/styled/Components'
import Seperator from 'src/components/utils/Seperator'
import { AddPhotoButton } from 'src/svg/AddPhotoSvg'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { BaseButton } from 'src/styled/Buttons'

function AddBook() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const router = useRouter();
    const fileRef = useRef<HTMLInputElement>();
    const [previewSrc, setPreview] = useState("");

    async function submitAdd() {
        router.push("/books");
    }

    async function fileChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPreview(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <>
            <Head>
                <title>Add a Book - Digital Library</title>
            </Head>
            <Header />
            <Container style={{ marginTop: "1rem" }} value="100%" min="1rem" max="45rem">
                <AddBookPaper>
                    <ImgContainer>

                        <PreviewContainer>
                            {
                                previewSrc != "" && <StyledImage src={previewSrc} />
                            }
                        </PreviewContainer>

                        <AbsoluteDiv>
                            <AddPhotoButton onClick={e => fileRef.current.click()} />
                            <input style={{ display: "none" }}
                                ref={fileRef}
                                onChange={fileChange}
                                type="file"
                                name="file"
                                accept="image/*"
                            />
                        </AbsoluteDiv>

                    </ImgContainer>
                    <AddBookForm>
                        <TextBox variant="Light" value={name} onChange={e => setName(e.target.value)} placeholder="Book name"></TextBox>
                        <Seperator margin="0" width="100%" />
                        <TextArea variant="Light" value={description} onChange={e => setDescription(e.target.value)} style={{ resize: "none" }} rows={20} placeholder="Book description"></TextArea>
                        <BaseButton variant="light" onClick={submitAdd}>Add</BaseButton>
                    </AddBookForm>

                </AddBookPaper>
            </Container>
        </>
    )
}



export default AddBook;

export const AbsoluteDiv = styled.div({
    position: "absolute"
})

const StyledImage = styled.img({
    borderRadius: ".4rem",
    width: "100%",
    height: "100%",
    objectFit: "cover"
})

const PreviewContainer = styled.div({
    position: "absolute",
    width: "100%",
    height: "100%",
})

const AddBookPaper = styled.div({
    width: "100%",
    display: "grid",
    gridTemplateColumns: "0.6fr 1.4fr",
    gridTemplateRows: "1fr",
    background: "#F3F3F3",
    borderRadius: ".4rem",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",

})

const AddBookForm = styled.div({
    padding: "1rem 1rem",
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
    // background: "#C4C4C4",
    borderRadius: ".4rem 0rem 0rem .4rem",
    display: "flex",
    position: "relative",
    alignItems: "center",
    justifyContent: "center"
})