import styled from "@emotion/styled";
import React, { useState } from "react";
import { Container } from "src/components/utils/Container";
import Header from "src/components/Header";
import Seperator from "src/components/utils/Seperator";
import Head from "next/head";
import { client } from "src/graphql/client";
import { bookQuery } from "src/graphql/books/book";
import { IBook, Role } from "@dl/shared";
import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { userStore } from "src/state/UserStore";
import { GetServerSideProps } from "next";
import BookImage from "src/components/BookParts/BookImage"
import opacity from "src/framer/opacity";
import { manageStore } from "src/state/ManageBookStore";
import ManageUser from "src/components/Manage/ManageUser";
import { BaseButton } from "src/styled/Buttons";
import EditIcon from "src/svg/EditIcon";
import { Backdrop } from "src/components/utils/Backdrop";
import CloseIcon from "src/svg/CloseIcon";
import { Key } from "src/components/Keyboard/Keys";
import { EditIconCustom, TitleEdit } from "src/components/BookEdit/TitleEdit";

function id({ name, imageUrl, description, id }: IBook) {
    const [imgError, setImgError] = useState(false);
    const [showDrop, setDrop] = useState(false);

    const [titleEdit, setTitleEdit] = useState(false);
    const [descEdit, setDescEdit] = useState(false);

    const [title, setTitle] = useState(name);
    const [desc, setDesc] = useState(description);


    function deleteBookSubmit() {
        // !id
        closePopup();
    }

    // * In Future change to permission lookup *
    const canEdit = userStore.user.role == Role.Administrator;

    function onBodyClick(e: React.MouseEvent) {
        e.stopPropagation();

        // * Check if clicked on itself(backdrop) *
        if (e.target == e.currentTarget) setDrop(false);
    }
    function closePopup() {
        setDrop(false);
    }

    function EditDescClick() {
        setDesc(description);
        setDescEdit(true);
    }

    function EditTitleClick() {
        setTitle(name);
        setTitleEdit(true);
    }

    function changeTitle(e: React.ChangeEvent<HTMLInputElement>) {
        setTitle(e.target.value);
    }

    function changeDescription(e: React.ChangeEvent<HTMLInputElement>) {
        setDesc(e.target.value);
    }

    return (
        <>
            <ManageUser />
            <Backdrop onClick={onBodyClick} on={showDrop}>
                <ConfirmDeletePaper>
                    <TopBarWrapper>
                        <CloseDeletePopupIcon onClick={closePopup} />
                        <Seperator margin="" width="100%" />
                    </TopBarWrapper>
                    <DeleteText>Delete this book?</DeleteText>
                    <Seperator margin="" width="80%" />
                    <ButtonWrapperPaper>
                        <DeleteButton onClick={deleteBookSubmit} margin="0 .5rem" size="1rem 2rem">Delete</DeleteButton>
                        <BaseButton onClick={closePopup} margin="0 .5rem" size="1rem 2rem" variant="light">Cancel</BaseButton>
                    </ButtonWrapperPaper>
                </ConfirmDeletePaper>
            </Backdrop>
            <Head>
                <title>Digital Library - {name}</title>
            </Head>
            <Header />
            <Container
                style={{ margin: "1.5rem 0 5rem" }}
                max="65rem"
                min="1px"
                value="100%"
            >
                <Card variants={opacity} animate="show" initial="hidden">
                    <div>
                        <FormImageOrSvg src={imageUrl} />
                    </div>
                    <InfoContainer>
                        <CardHeader>
                            <TitleEdit
                                initialTitle={name}
                                isAllowedEdit={canEdit}
                                titleValue={title}
                                isEditing={titleEdit}
                                onEditTitle={changeTitle}
                                onStartEdit={EditTitleClick}
                            />
                        </CardHeader>
                        <Seperator margin="0" />
                        <CardDescription>
                            {description}
                            {
                                canEdit && !descEdit && (
                                    <EditIconCustom onClick={EditDescClick} whileTap={{ scale: 1 }} whileHover={{ scale: 1.2 }} />
                                )
                            }
                        </CardDescription>
                        <ButtonWrapper>
                            {
                                canEdit && (
                                    <DeleteButton onClick={e => setDrop(true)} size="1rem 2rem">Delete</DeleteButton>
                                )
                            }
                            <ManageButton
                                margin="0 0 0 1rem"
                                variant="light"
                                size="1rem 2rem"
                                shown={canEdit}
                                onClick={e => manageStore.open()}
                            >
                                Manage
                            </ManageButton>

                        </ButtonWrapper>
                    </InfoContainer>
                </Card>
                <Key keyname="Enter" />

            </Container>
        </>
    );
}

export default observer(id);

export const getServerSideProps: GetServerSideProps<IBook> = async ({ params }) => {
    const { data, error } = await client
        .query<{ book: IBook }>(bookQuery, {
            id: parseInt(params.id as string),
        }).toPromise();

    if (data?.book == null || error != null) return { notFound: true };

    return {
        props: data.book,
    };
};


interface IManageButtonProps {
    shown: boolean
}

const CloseDeletePopupIcon = styled(CloseIcon)({
    alignSelf: "flex-end",
    margin: "0 0 .5rem 0",
    cursor: "pointer"
})

const TopBarWrapper = styled.div({
    display: "flex",
    flexDirection: "column",
    width: "100%"
})

const DeleteText = styled.h1({
    color: "#3D3D3D",
    textAlign: "center",
    fontWeight: "bold",
    margin: "2rem 0"
})

const ButtonWrapperPaper = styled.div({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: ".5rem 0"
})
const ConfirmDeletePaper = styled.div({
    background: "#EFEFEF",
    borderRadius: ".4rem",
    display: "flex",
    transform: "translateY(-30%)",
    width: "clamp(1px, 100%, 25rem)",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: "1.25rem 2.5rem",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
})



const ManageButton = styled(BaseButton)(({ shown }: IManageButtonProps) => ({
    visibility: shown ? "visible" : "hidden"
}))

const DeleteButton = styled(BaseButton)({
    background: "#FF5656",
    color: "white",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    fontWeight: "bold"
})


const CardHeader = styled(motion.h1)({
    fontSize: "clamp(1.25rem, 5vw, 2.5rem)",
    marginBottom: "1rem",
    wordBreak: "break-all",
})

const CardDescription = styled(motion.p)({
    flexGrow: 1,
    wordBreak: "break-all",
})

const Card = styled(motion.div)({
    background: "#F3F3F3",
    borderRadius: ".4rem",
    display: "flex",
    // flexWrap: "wrap",
    width: "100%",
    // "img, svg": {
    //     userSelect: "none",
    //     borderRadius: ".4rem 0 0 .4rem",
    //     width: "10rem",
    //     minWidth: "10rem",
    //     height: "100%",
    //     objectFit: "cover",
    // }
});

const FormImageOrSvg = styled(BookImage)({
    userSelect: "none",
    borderRadius: ".4rem 0 0 .4rem",
    width: "10rem",
    minWidth: "10rem",
    height: "100%",
    objectFit: "cover",
})

const ButtonWrapper = styled.div({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
});

const InfoContainer = styled.div({
    margin: "1rem 1.5rem",
    display: "flex",
    flexWrap: "wrap",
    minHeight: "12.5rem",
    flexGrow: 1,
    // width: "100%",
    flexDirection: "column"
});
