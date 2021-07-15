import styled from '@emotion/styled'
import React from 'react'

export function RankCard(props: IRankCardProps) {
    return (
        <Background {...props}>
            <h1>{props.rank}</h1>
        </Background>
    )
}

const Background = styled.div({
    userSelect: "none",
    background: "#3D3D3D",
    borderRadius: ".6rem",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    width: "auto!important",
    h1: {
        color: "white",
        padding: ".85rem 1.10rem",
        fontSize: ".80rem"
    }
})

interface IRankCardProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    rank: string
}
