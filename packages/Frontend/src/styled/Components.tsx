import styled from '@emotion/styled'
import { motion } from 'framer-motion'

export const TextBox = styled(motion.input)(({ variant = "Dark" }: ITextInputProps) => ({
    background: "white",
    transition: "100ms box-shadow ease",
    "&::placeholder": {
        color: "#888888"
    },
    "&:focus-visible": {
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
    },
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    outline: "none",
    borderRadius: ".45rem",
    padding: "1.25rem",
    border: variant == "Dark" ? ".175rem solid black" : "none"
}))

interface ITextInputProps {
    variant?: "Dark" | "Light"
}

export const TextArea = styled.textarea(({ variant = "Dark" }: ITextInputProps) => ({
    background: "white",
    transition: "100ms box-shadow ease",
    "&::placeholder": {
        color: "#888888"
    },
    "&:focus-visible": {
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
    },
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    outline: "none",
    borderRadius: ".45rem",
    padding: "1.25rem",
    border: variant == "Dark" ? ".175rem solid black" : "none"
}))
