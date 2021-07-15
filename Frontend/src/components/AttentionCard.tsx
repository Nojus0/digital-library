import styled from '@emotion/styled'
import React from 'react'

export interface IAttentionCardProps {
    color?: string,
    children?: any
}



function AttentionCard({children, color}: IAttentionCardProps) {
    return (
        <PaperCard style={{background: color}}>
            {children}
        </PaperCard>
    )
}

export default AttentionCard

const PaperCard = styled.div({
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1.5rem",
    textAlign: "center",
    wordBreak: "break-all",
    width: "100%",
    "*":{
        fontWeight: 600,
    },
    borderRadius: ".4rem",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
})