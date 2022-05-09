import styled from '@emotion/styled'
import React from 'react'
import { HTMLMotionProps, motion } from 'framer-motion'


function BookTitle(props: HTMLMotionProps<"h1">, ref: React.Ref<HTMLDivElement>) {

    return (
        <StyledBookTitle {...props} ref={ref}>{props.children}</StyledBookTitle>
    )
}

export default React.forwardRef<HTMLHeadingElement, Parameters<typeof BookTitle>[0]>(BookTitle);

const StyledBookTitle = styled(motion.h1)({
    flexGrow: 1,
    fontWeight: 500,
    fontSize: "1.10rem",
    padding: "1.75rem 0 1.75rem 1.30rem",
    // whiteSpace: "nowrap", flex wraps in manage menu instantly becomes mobile view.
    overflow: "hidden",
    textOverflow: "ellipsis"
})

