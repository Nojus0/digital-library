import { IBook } from "@dl/shared"
import styled from "@emotion/styled"
import { AnimatePresence, motion } from "framer-motion"
import React from "react"
import { BaseButton } from "src/styled/Buttons"
import BookBase from "../BookParts/BookBase"
import BookImage from "../BookParts/BookImage"
import BookTitle from "../BookParts/BookTitle"
import UserSearchBar from "./UserSearchBar"
import BookSearchBar from "./BookSearchBar"
import { manageStore } from "src/state/ManageBookStore"
import { observer } from "mobx-react-lite"
import { Backdrop } from "../utils/Backdrop"

function ManageUser() {


    function onBodyClick(e: React.MouseEvent) {
        if (e.target !== e.currentTarget) return;

        manageStore.close();
    }

    return (
        <AnimatePresence>
            <Backdrop on={manageStore.isOpen} onClick={onBodyClick}>
                <ManageForm>
                    <SearchSide>
                        <UserSearchBar />
                        <BookResults>

                        </BookResults>
                    </SearchSide>
                    <BookSide>
                        <BookSearchBar />
                        <UserBooksPaper>
                            <ListBookItem imageUrl="ow" name="test" />
                            <ListBookItem imageUrl="ow" name="test" />
                            <ListBookItem imageUrl="ow" name="test" />
                            <ListBookItem imageUrl="ow" name="test" />
                            <ListBookItem imageUrl="ow" name="test" />
                            <ListBookItem imageUrl="ow" name="test" />
                            <ListBookItem imageUrl="ow" name="test" />
                        </UserBooksPaper >
                        <ManageButtonSection>
                            <CancelButton onClick={e => manageStore.close()} variant="light" size="1rem">Cancel</CancelButton>
                            <ConfirmButton onClick={e => manageStore.close()} variant="light" size="1rem">Confirm</ConfirmButton>
                        </ManageButtonSection>
                    </BookSide>
                </ManageForm>
            </Backdrop>
        </AnimatePresence>

    )
}

function ListBookItem({ imageUrl, name }: IBook) {
    return (
        <BookBase style={{ margin: ".5rem 0" }}>
            <BookImage style={{ paddingLeft: ".5rem" }} src={imageUrl} />
            <BookTitle>{name}</BookTitle>
            <BaseButton variant="light" margin="0rem 1rem 0 0" size=".75rem 1.5rem">Remove</BaseButton>
        </BookBase>
    )
}

export default observer(ManageUser);

const ManageButtonSection = styled.div({
    display: "flex",
    alignItems: "center",
    alignSelf: "flex-end"
})

const CancelButton = styled(BaseButton)({
    margin: "1rem .75rem 0"
})

const ConfirmButton = styled(BaseButton)({
    margin: "1rem 0px 0"
})

const BookResults = styled.div({
    borderRadius: ".4rem",
    backgroundColor: "white"
})

const UserBooksPaper = styled(motion.div)({
    backgroundColor: "#FFFFFF",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    alignItems: "center",
    padding: "0.5rem 1rem",
    borderRadius: ".4rem",
})

const SearchSide = styled.div({
    display: "flex",
    flexDirection: "column",
    flex: '1 0 45%',
    padding: "1rem"
})

const BookSide = styled.div({
    display: "flex",
    flexDirection: "column",
    flex: '1 0 45%',
    maxHeight: "35rem",
    padding: "1rem"
})


const ManageForm = styled.div({
    backgroundColor: "#EFEFEF",
    borderRadius: ".4rem",
    display: "flex",
    // height: "clamp(1px, 100%, 40rem)",
    width: "clamp(1px, 100%, 80rem)",
    flexWrap: "wrap",
})