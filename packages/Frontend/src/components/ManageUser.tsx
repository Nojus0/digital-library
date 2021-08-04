import styled from "@emotion/styled"
import { AnimatePresence, motion } from "framer-motion"
import React from "react"
import { BaseButton } from "src/styled/Buttons"
import BookBase from "./BookParts/BookBase"
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
                                        <BaseButton variant="light" size=".75rem 1.5rem">Remove</BaseButton>
                                    </BookBase>
                                </UserBooksPaper>
                                <BaseButton variant="light" margin="1rem 10px 0 0" size="1rem" style={{ alignSelf: "flex-end" }}>Confirm</BaseButton>
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