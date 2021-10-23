import styled from "@emotion/styled"
import { motion } from "framer-motion"

interface IButton {
    variant?: "light" | "dark" | "transparent"
    size?: string
    margin?: string
    shadow?: boolean
    useTransition?: boolean
}

export const BaseButton = styled(motion.button)((
    { size = "1rem", variant = "dark", margin = "0", shadow, useTransition = true }: IButton
) => {

    function getBackground() {
        switch (variant) {
            case "dark": return "black";
            case "light": return "white";
            case "transparent": return "transparent"
        }
    }

    function getForeColor() {
        switch (variant) {
            case "dark": return "white";
            case "light": return "black";
            case "transparent": return "black"
        }
    }

    return {
        fontWeight: 500,
        outline: "none",
        padding: size,
        cursor: "pointer",
        margin: margin && margin,
        border: "none",
        background: getBackground(),
        color: getForeColor(),
        borderRadius: ".4rem",
        transition: useTransition ? "100ms box-shadow ease, 250ms background ease, 250ms color ease" : "unset",
        boxShadow: (variant == "light" || shadow) && "0px 4px 4px rgba(0, 0, 0, 0.25)",
        "&:focus-visible": {
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.25)",
        }
    }
})