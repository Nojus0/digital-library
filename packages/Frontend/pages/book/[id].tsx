import styled from "@emotion/styled";
import React, { useState } from "react";
import { Container } from "src/components/utils/Container";
import Header from "src/components/Header";
import Seperator from "src/components/utils/Seperator";
import Head from "next/head";
import { client, server_client } from "src/graphql/client";
import { bookQuery } from "src/graphql/books/book";
import { IBook, Role } from "@dl/shared";
import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { userStore } from "src/state/UserStore";
import { GetServerSideProps } from "next";
import BookImage from "src/components/BookParts/BookImage";
import opacity from "src/framer/opacity";
import { manageStore } from "src/state/ManageBookStore";
import ManageUser from "src/components/Manage/ManageUser";
import { BaseButton } from "src/styled/Buttons";
import { Backdrop } from "src/components/utils/Backdrop";
import CloseIcon from "src/svg/CloseIcon";
import EditIcon from "src/svg/EditIcon";
import { editBookMutation, editBookMutationCompact, IEditBook, IEditBookVars } from "src/graphql/books/editBook";
import { deleteBook } from "src/graphql/books/deleteBook";
import { CombinedError } from "@urql/core";
import { useRouter } from "next/router";
import { bookStore } from "src/state/LoadedBookStore";

function id({ title, imageUrl, description, id }: IBook) {
  const router = useRouter();
  const [showDrop, setDrop] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [stateTitle, setTitle] = useState(title);
  const [desc, setDesc] = useState(description);

  async function deleteBookSubmit() {
    const [success, error] = await deleteBook(id);

    if (success) {
      bookStore.reset();
      await router.push("/books");
    }
  }

  const canEdit = userStore.user.role == Role.Administrator;

  function onBodyClick(e: React.MouseEvent) {
    e.stopPropagation();

    // * Check if clicked on itself(backdrop) *
    if (e.target == e.currentTarget) setDrop(false);
  }
  function closePopup() {
    setDrop(false);
  }

  async function onEditClick(e: React.MouseEvent) {

    // * Confirm *
    if (isEditing && title != stateTitle || desc != description) {
      const { data } = await client.mutation<IEditBook, IEditBookVars>(editBookMutationCompact, {
        bookId: id,
        newDescription: desc,
        newTitle: stateTitle
      }).toPromise();
    }


    setEditing((prev) => !prev);
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
          <Seperator margin="0" width="80%" />
          <ButtonWrapperPaper>
            <DeleteButton
              onClick={deleteBookSubmit}
              margin="0 .5rem"
              size="1rem 2rem"
            >
              Delete
            </DeleteButton>
            <BaseButton
              onClick={closePopup}
              margin="0 .5rem"
              size="1rem 2rem"
              variant="light"
            >
              Cancel
            </BaseButton>
          </ButtonWrapperPaper>
        </ConfirmDeletePaper>
      </Backdrop>
      <Head>
        <title>Digital Library - {title}</title>
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
            {
              isEditing ?
                <EditTitle value={stateTitle} onChange={e => setTitle(e.target.value)} />
                :
                <CardHeaderText>{stateTitle}</CardHeaderText>

            }
            <Seperator margin="0" />
            {
              isEditing ?
                <EditDescription onChange={e => setDesc(e.target.value)} value={desc} />
                :
                <CardDescription >{desc}</CardDescription>
            }
            <ButtonWrapper>
              {canEdit && (
                <>
                  <DeleteButton onClick={(e) => setDrop(true)} size="1rem 2rem">
                    Delete
                  </DeleteButton>
                  <EditButton
                    shadow
                    useTransition={false}
                    isEditing={isEditing}
                    onClick={onEditClick}
                    size="1rem 2rem"
                    margin="0 0 0 1rem"
                  >
                    {isEditing ? "Confirm" : "Edit"}
                  </EditButton>
                </>
              )}

              <ManageButton
                margin="0 0 0 1rem"
                variant="light"
                size="1rem 2rem"
                shown={canEdit}
                onClick={(e) => manageStore.open()}
              >
                Manage
              </ManageButton>
            </ButtonWrapper>
          </InfoContainer>
        </Card>
      </Container>
    </>
  );
}

export default observer(id);

export const getServerSideProps: GetServerSideProps<IBook> = async ({
  params,
}) => {
  const { data, error } = await server_client
    .query<{ book: IBook }>(bookQuery, {
      id: parseInt(params.id as string),
    })
    .toPromise();

  if (data?.book == null || error != null) return { notFound: true };

  return {
    props: data.book,
  };
};

export const EditIconCustom = styled(EditIcon)({
  cursor: "pointer",
  display: "inline",
  marginLeft: ".5rem",
  verticalAlign: "middle",
  "#Pen": {
    // color: "red!important"
  },
});

interface IManageButtonProps {
  shown: boolean;
}

interface IEditButtonProps {
  isEditing: boolean;
}
const EditButton = styled(BaseButton)((props: IEditButtonProps) => ({
  background: props.isEditing ? "#2CDB00" : "#5D81FF",
}));

const EditDescription = styled.textarea({
  resize: "none",
  flexGrow: 1,
  margin: "1rem 0",
  fontSize: "1rem",
  background: "transparent",
  border: "none",
  padding: "0px",
  outline: "1px solid black",
  wordBreak: "break-all",

})
const EditTitle = styled.input({
  fontSize: "clamp(1.25rem, 5vw, 2.5rem)",
  marginBottom: "1rem",
  background: "transparent",
  border: "none",
  padding: "0px",
  outline: "1px solid black"
})

const CloseDeletePopupIcon = styled(CloseIcon)({
  alignSelf: "flex-end",
  margin: "0 0 .5rem 0",
  cursor: "pointer",
});

const TopBarWrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

const DeleteText = styled.h1({
  color: "#3D3D3D",
  textAlign: "center",
  fontWeight: "bold",
  margin: "2rem 0",
});

const ButtonWrapperPaper = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: ".5rem 0",
});
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
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
});

const ManageButton = styled(BaseButton)(({ shown }: IManageButtonProps) => ({
  visibility: shown ? "visible" : "hidden",
}));

const DeleteButton = styled(BaseButton)({
  background: "#FF5656",
  color: "white",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  fontWeight: "bold",
});

const CardHeaderText = styled(motion.h1)({
  fontSize: "clamp(1.25rem, 5vw, 2.5rem)",
  marginBottom: "1rem",
  wordBreak: "break-all",
  padding: "0px"
});

const CardDescription = styled(motion.p)({
  flexGrow: 1,
  wordBreak: "break-all",
});

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
});

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
  flexDirection: "column",
});
