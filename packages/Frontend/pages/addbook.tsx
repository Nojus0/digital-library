import React, { useCallback, useMemo, useRef, useState } from 'react'
import Header from 'src/components/Header'
import { Container } from "src/components/utils/Container"
import styled from '@emotion/styled'
import { TextArea, TextBox } from 'src/styled/Components'
import Seperator from 'src/components/utils/Seperator'
import { AddPhotoButton } from 'src/svg/AddPhotoSvg'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { BaseButton } from 'src/styled/Buttons'
import Compressor from 'compressorjs'
import { client } from 'src/graphql/client'
import { IUploadMutation, IUploadVariables, uploadMutation } from 'src/graphql/books/upload'
import { MAX_BOOK_TITLE_LENGTH, MAX_DESCRIPTION_LENGTH, Role, uploadCover } from "@dl/shared"
import { bookStore } from 'src/state/LoadedBookStore'
import opacity from 'src/framer/opacity'
import { useAuthedRoute } from 'src/hooks/useAuthedRoute'
import { observable } from 'mobx'
import { observer } from 'mobx-react-lite'
function AddBook() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const router = useRouter();
    const fileRef = useRef<HTMLInputElement>();
    const [preview, setPreview] = useState<Blob>();

    useAuthedRoute(Role.Administrator);

    async function submitAdd() {
        if (title.length < 3 || description.length < 3) return;

        const { data, error } = await client.mutation<IUploadMutation, IUploadVariables>(
            uploadMutation,
            { title, description, addPhoto: preview != null }
        ).toPromise();

        if (data?.upload == null || error != null) return await finished();

        const value: uploadCover = JSON.parse(data.upload);

        if (preview == null) return await finished();

        const form = new FormData();
        form.append("Content-Type", preview.type);
        Object.keys(value.fields).forEach((key) => form.append(key, value.fields[key]))
        form.append("file", preview);

        const { ok } = await fetch(value.url, {
            method: "POST",
            body: form
        });

        if (ok) return await finished();

        async function finished() {
            bookStore.reset();
            await router.push("/books");
        }

    }

    async function fileChange(e: React.ChangeEvent<HTMLInputElement>) {
        new Compressor(e.target.files[0], {
            maxHeight: 400,
            maxWidth: 300,
            quality: 0.8,
            success: (newFile) => {
                setPreview(newFile);
            }
        })
    }

    function descriptionChanged(e: React.ChangeEvent<HTMLTextAreaElement>) {
        if (e.target.value.length < MAX_DESCRIPTION_LENGTH)
            setDescription(e.target.value);
    }

    function titleChanged(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.value.length < MAX_BOOK_TITLE_LENGTH)
            setTitle(e.target.value);
    }

    return (
        <>
            <Head>
                <title>Add a Book - Digital Library</title>
            </Head>
            <Header />
            <Container variants={opacity} animate="show" initial="hidden" style={{ marginTop: "1rem" }} value="100%" min="1rem" max="45rem">
                <AddBookPaper>
                    <ImgContainer>

                        <PreviewContainer>
                            {
                                useMemo(() => preview != null &&
                                    < StyledImage src={URL.createObjectURL(preview)} />,
                                    [preview])
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
                        <TextBox variant="Light" value={title} onChange={titleChanged} placeholder="Book name"></TextBox>
                        <Seperator margin="0" width="100%" />
                        <TextArea variant="Light" value={description} onChange={descriptionChanged} style={{ resize: "none" }} rows={20} placeholder="Book description"></TextArea>
                        <BaseButton variant="light" onClick={submitAdd}>Add</BaseButton>
                    </AddBookForm>

                </AddBookPaper>
            </Container>
        </>
    )
}


export default observer(AddBook);

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