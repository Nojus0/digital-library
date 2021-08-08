import styled from "@emotion/styled"
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion"
import opacity from "src/framer/opacity"


interface IBackdropProps extends HTMLMotionProps<"div"> {
    on: boolean
}

export function Backdrop({ on, children, ...props }: IBackdropProps) {

    return (
        <AnimatePresence>
            {
                on && (
                    <StyledBackdrop animate="show" initial="hidden" exit="hidden" transition={{ duration: 0.15, }} variants={opacity} {...props}>
                        {children}
                    </StyledBackdrop>
                )
            }
        </AnimatePresence>
    )
}

const StyledBackdrop = styled(motion.div)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: 3,
    backgroundColor: "rgba(0,0,0, 0.2)"
})