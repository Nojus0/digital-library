import styled from '@emotion/styled'
import { motion } from 'framer-motion'

export const Button = styled(motion.button)({
    fontWeight: 500,
    outline: "none",
    cursor: "pointer",
    border: "none",
    background: "black",
    color: "white",
    borderRadius: ".4rem",
    transition: "100ms box-shadow ease, 250ms background ease, 250ms color ease",
    "&:focus-visible": {
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    },
})

export const TextBox = styled.input({
    background: "white",
    transition: "100ms box-shadow ease",
    "&::placeholder": {
        color: "#888888"
    },
    "&:focus-visible": {
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    },
    outline: "none",
    borderRadius: ".45rem",
    padding: "1.25rem",
    border: "2.5px solid black"
})

export const TextArea = styled.textarea({
    background: "white",
    transition: "100ms box-shadow ease",
    "&::placeholder": {
        color: "#888888"
    },
    "&:focus-visible": {
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    },
    outline: "none",
    borderRadius: ".45rem",
    padding: "1.25rem",
    border: "2.5px solid black"
})
