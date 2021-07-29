import styled from "@emotion/styled"
import { AnimatePresence, motion } from "framer-motion"

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

    return (
        <AnimatePresence>
            {
                show && (
                    <Backdrop animate="active" initial="hidden" exit="hidden" transition={{ duration: 0.15, }} variants={variants} onClick={e => setShow(false)}>
                        <ManageForm>
                            <SearchSide>
                                <h1>wow</h1>
                            </SearchSide>
                            <BookSide>
                                <h1>ads</h1>
                            </BookSide>
                        </ManageForm>
                    </Backdrop>
                )
            }
        </AnimatePresence>

    )
}

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
    padding: "1rem",
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