import styled, { StyledComponent } from '@emotion/styled'
import React, { forwardRef, useState } from 'react'
import { HTMLMotionProps, motion } from 'framer-motion'


function BookBase(props: HTMLMotionProps<"div">, ref: React.Ref<HTMLDivElement>) {
    return (
        <StyledBookBase ref={ref} {...props}>
            {props.children}
        </StyledBookBase>
    )
}

export default React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(BookBase);

const StyledBookBase = styled(motion.div)({
    display: "flex",
    width: "100%",
    height: "7rem",
    background: "#EFEFEF",
    marginBottom: "1.25rem",
    borderRadius: ".4rem",
    alignItems: "center",
})

