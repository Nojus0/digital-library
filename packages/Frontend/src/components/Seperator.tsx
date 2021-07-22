import React from 'react'

export interface ISeperatorProps {
    color?: string,
    height?: string,
    margin?: string,
    width?: string,
    style?: React.CSSProperties
}

function Seperator({ color = "rgba(0,0,0,0.06)", height = ".25rem", margin = "1rem", width = "100%", style }: ISeperatorProps) {
    return (
        <div style={{
            width,
            borderRadius: ".5rem",
            background: color,
            margin,
            height,
            ...style
        }}>
        </div>
    )
}

export default Seperator
