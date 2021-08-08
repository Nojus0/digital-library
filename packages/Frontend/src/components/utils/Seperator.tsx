import { HTMLMotionProps, motion } from 'framer-motion'
import React from 'react'

export interface ISeperatorProps extends HTMLMotionProps<"div"> {
    color?: string,
    height?: string,
    margin?: string,
    width?: string,
}

function Seperator({ color = "rgba(0,0,0,0.06)", height = ".25rem", margin = "1rem", width = "100%", ...props }: ISeperatorProps) {
    return (
        <motion.div style={{
            width,
            borderRadius: ".5rem",
            background: color,
            margin,
            height,
        }} {...props}>
        </motion.div>
    )
}

export default Seperator
