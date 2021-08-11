import styled from "@emotion/styled"

interface IButton {
    variant?: "light" | "dark"
    size?: string
    margin?: string
    shadow?: boolean
}

export const BaseButton = styled.button(({ size = "1rem", variant = "dark", margin = "0", shadow }: IButton) => ({
    fontWeight: 500,
    outline: "none",
    padding: size,
    cursor: "pointer",
    margin: margin && margin,
    border: "none",
    background: variant == "dark" ? "black" : "white",
    color: variant == "dark" ? "white" : "black",
    borderRadius: ".4rem",
    transition: "100ms box-shadow ease, 250ms background ease, 250ms color ease",
    boxShadow: (variant == "light" || shadow) && "0px 4px 4px rgba(0, 0, 0, 0.25)",
    "&:focus-visible": {
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.25)",
    },
}))