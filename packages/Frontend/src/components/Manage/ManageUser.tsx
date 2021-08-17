import styled from "@emotion/styled"
import { AnimatePresence, motion } from "framer-motion"
import React, { useEffect } from "react"
import { BaseButton } from "src/styled/Buttons"
import UserSearchBar from "./UserSearchBar"
import BookSearchBar from "./BookSearchBar"
import { manageStore } from "src/state/ManageBookStore"
import { observer } from "mobx-react-lite"
import { Backdrop } from "../utils/Backdrop"
import { ManageBook } from "./ManageBook"
import { debounce } from "lodash"
import opacity from "src/framer/opacity"
function ManageUser() {


    function onBodyClick(e: React.MouseEvent) {
        if (e.target === e.currentTarget) manageStore.close();
    }

    const fetchUser = debounce(() => manageStore.loadUser(), 1000);
    const fetchBooks = debounce(() => manageStore.loadResults(), 1000);

    useEffect(() => {
        if (manageStore.searchUser.length < 3) return;

        fetchUser();
    }, [manageStore.searchUser]);

    useEffect(() => {
        // if (manageStore.searchBooks.length < 3) return manageStore.clearBookResults();

        fetchBooks();
    }, [manageStore.searchBooks])


    console.log(`render`);
    return (
        <AnimatePresence>
            <Backdrop on={manageStore.isOpen} onClick={onBodyClick}>
                <ManageForm>
                    <SearchSide>
                        <UserSearchBar />
                    </SearchSide>
                    <BookSide>
                        <BookSearchBar />
                        <UserBooksPaper>
                            <AnimatePresence>
                                {manageStore.results.map((book) => (
                                    <ManageBook
                                        variants={opacity}
                                        transition={{ duration: 0.15 }}
                                        animate="show"
                                        key={book.id}
                                        initial="hidden"
                                        exit="hidden"
                                        onAdd={e => manageStore.addBook(book)}
                                        onRemove={e => manageStore.removeBook(book)}
                                        {...book}
                                    ></ManageBook>
                                ))}
                            </AnimatePresence>
                        </UserBooksPaper>
                        <ManageButtonSection>
                            <CancelButton
                                onClick={(e) => manageStore.close()}
                                variant="light"
                                size="1rem"
                            >
                                Cancel
                            </CancelButton>
                            <ConfirmButton
                                onClick={(e) => manageStore.confirm()}
                                variant="light"
                                size="1rem"
                            >
                                Confirm
                            </ConfirmButton>
                        </ManageButtonSection>
                    </BookSide>
                </ManageForm>
            </Backdrop>
        </AnimatePresence>
    );
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
    height: "100%",
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
    maxHeight: "75vh",
    minHeight: "75vh",
    padding: "1rem"
})


const ManageForm = styled.div({
    backgroundColor: "#EFEFEF",
    borderRadius: ".4rem",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    display: "flex",
    // height: "clamp(1px, 100%, 40rem)",
    width: "clamp(1px, 100%, 80rem)",
    flexWrap: "wrap",
})