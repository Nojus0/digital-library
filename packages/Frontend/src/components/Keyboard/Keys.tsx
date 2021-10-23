import styled from "@emotion/styled";
import React from "react";

interface IKeyProps {
    keyname: string
}

export const Key: React.FC<IKeyProps> = ({ keyname: key }) => {
    return (
        <KeyBG>
            <KeyText>{key}</KeyText>
        </KeyBG>
    )
}

const KeyText = styled.p({
    fontFamily: "Courier New",
    fontSize: "1.15rem",
    fontWeight: "normal",
    userSelect: "none",
    color: "black",
    margin: 0
})

const KeyBG = styled.div({
    boxShadow: "0px -1px 0px #EBEBEB, 0px 2px 0px rgba(0, 0, 0, 0.25)",
    background: "#E2E2E2",
    borderRadius: ".4rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: ".65rem 1rem",
    transition: "ease-in-out 150ms transform",
    cursor: "pointer"
})