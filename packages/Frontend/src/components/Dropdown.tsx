import styled from '@emotion/styled'
import React from 'react'
import { CSSTransition } from 'react-transition-group'
import transition from "../../styles/transitions/Fade.module.scss";

function Dropdown({ on, children }: IDropdown) {
    return (
        <CSSTransition in={on} timeout={150} unmountOnExit classNames={transition}>
            <Background>
                {children}
            </Background>
        </CSSTransition>
    )
}

export function DropdownItem(attr: IDropdownItem) {
    return (
        <>
            <BgItem {...attr}>
                <div>
                    <attr.Icon />
                    <h1>{attr.text}</h1>
                </div>
            </BgItem>
        </>
    )
}
export default Dropdown


const Background = styled.div({
    position: "absolute",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    top: "3rem",
    transform: "translate(-42.5%, 12.5%)",
    background: "#EFEFEF",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: ".2rem",
    width: "15rem"
})
const BgItem = styled.div({
    display: "flex",
    color: "black",
    alignItems: "center",
    width: "100%!important",
    borderRadius: ".4rem",
    cursor: "pointer",
    padding: ".5rem",
    "& > div:first-of-type": {
        padding: ".75rem",
        borderRadius: ".3rem",
        transition: "75ms background ease",
        width: "100%",
        display: "flex",
        alignItems: "center",
        "&:hover": {
            background: "rgba(0,0,0,0.035)",
        },
    },
    svg: {
        marginRight: ".3rem",
        height: 20,
        width: 20,
    },
    h1: {
        userSelect: "none",
        fontSize: "1.15rem"
    }
})

export interface IDropdown {
    on: boolean,
    children?: any,
}
export interface IDropdownItem extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    text: string,
    Icon: any
}