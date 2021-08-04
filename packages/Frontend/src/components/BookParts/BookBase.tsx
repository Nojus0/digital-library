import styled from '@emotion/styled'
import React from 'react'
import { HTMLMotionProps, motion } from 'framer-motion'


function BookBase(props: HTMLMotionProps<"div">, ref: React.Ref<HTMLDivElement>) {
    return (
        <StyledBookBase ref={ref} {...props}>
            {props.children}
        </StyledBookBase>
    )
}

export default React.forwardRef<HTMLDivElement, Parameters<typeof BookBase>[0]>(BookBase);

const StyledBookBase = styled(motion.div)(props => ({
    display: "flex",
    width: "100%",
    height: "7rem",
    background: "#EFEFEF",
    borderRadius: ".4rem",
    alignItems: "center",
}))

