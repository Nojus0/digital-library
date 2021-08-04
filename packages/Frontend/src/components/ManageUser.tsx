import styled from "@emotion/styled"
import { AnimatePresence, motion } from "framer-motion"
import React from "react"
import { Button } from "src/styled/Components"
import Book from "./Book"
import BookBase from "./BookParts/BookBase"
import BookButton from "./BookParts/BookButton"
import BookImage from "./BookParts/BookImage"
import BookTitle from "./BookParts/BookTitle"

export interface IManageUserProps {
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}
const variants = {
    active: {
        opacity: 1,
    },
    hidden: {
        opacity: 0,
    },
}
export function ManageUser({ show, setShow }: IManageUserProps) {


    function onBodyClick(e: React.MouseEvent) {
        if (e.target !== e.currentTarget) return;

        setShow(false);
    }

    return (
        <AnimatePresence>
            {
                show && (
                    <Backdrop animate="active" initial="hidden" exit="hidden" transition={{ duration: 0.15, }} variants={variants} onClick={onBodyClick}>
                        <ManageForm>
                            <SearchSide>
                                <h1>SEARCH</h1>
                            </SearchSide>
                            <BookSide>
                                <UserBooksPaper>
                                    <BookBase>
                                        <BookImage style={{ paddingLeft: ".5rem" }} src="dsadsa" />
                                        <BookTitle>Wow test book</BookTitle>
                                        <BookButton>Add</BookButton>
                                    </BookBase>
                                    <Book name="wwowoowow" imageUrl="none" />
                                </UserBooksPaper>
                                <Button style={{ padding: "1rem", alignSelf: "flex-end", marginTop: "1rem", marginRight: "10px" }}>Confirm</Button>
                            </BookSide>
                        </ManageForm>
                    </Backdrop>
                )
            }
        </AnimatePresence>

    )
}

const UserBooksPaper = styled(motion.div)({
    backgroundColor: "#FFFFFF",
    padding: "0 1rem",
    maxHeight: "50vh",
    overflowY: "auto",
    borderRadius: ".4rem",
})

const SearchSide = styled.div({
    display: "flex",
    flexDirection: "column",
})

const BookSide = styled.div({
    display: "flex",
    flexDirection: "column",
})


const ManageForm = styled.div({
    backgroundColor: "#EFEFEF",
    borderRadius: ".4rem",
    padding: "1.25rem",
    display: "grid",
    gridTemplateColumns: "1fr 1fr"
})

const Backdrop = styled(motion.div)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: 3,
    backgroundColor: "rgba(0,0,0, 0.2)"
})