import styled from "@emotion/styled"
import { motion } from "framer-motion"

interface IStyledSearchBar {
    shadow?: boolean
}

export const Search = styled(motion.div)(({ shadow = true }: IStyledSearchBar) => ({
    position: "relative",
    boxShadow: shadow && "0px 4px 4px rgba(0, 0, 0, 0.25)",
    display: 'flex',
    background: "white",
    borderRadius: ".4rem",
    alignItems: "center",
    alignSelf: "center",
    justifySelf: "center",
    width: "clamp(1px, 100%, 45rem)",
    "svg": {
        padding: "0 0 0 .75rem",
    }
}))

export const SearchInput = styled(motion.input)({
    fontSize: "0.75rem",
    width: "100%",
    margin: "1rem 1rem 1rem .20rem",
    background: "transparent",
    color: "black",
    outline: "none",
    border: "none",
})