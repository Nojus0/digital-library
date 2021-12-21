import { Role } from '@dl/shared'
import styled from '@emotion/styled'
import { HTMLMotionProps, motion } from 'framer-motion'
import React from 'react'

export function RankCard(props: IRankCardProps) {
    return (
        <RankPaper {...props}>
            <RankCardName>{props.rank}</RankCardName>
        </RankPaper>
    )
}

const RankPaper = styled(motion.div)({
    userSelect: "none",
    background: "#3D3D3D",
    borderRadius: ".6rem",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
})

const RankCardName = styled(motion.h1)({
    color: "white",
    padding: ".85rem 1.10rem",
    fontSize: ".80rem",
    fontWeight: "bold"
})

interface IRankCardProps extends HTMLMotionProps<"div"> {
    rank: string
}
