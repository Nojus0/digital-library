import styled from '@emotion/styled'
import React from 'react'
import { HTMLMotionProps } from 'framer-motion'
import { Button } from 'src/styled/Components';


function BookButton(props: HTMLMotionProps<"button">, ref: React.Ref<HTMLButtonElement>) {

    return (
        <StyledButton {...props} ref={ref}>{props.children}</StyledButton>
    )
}

const StyledButton = styled(Button)({
    background: "white",
    color: "black",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    padding: ".75rem 1.5rem",
    marginRight: "2rem",
})

export default React.forwardRef<HTMLButtonElement, HTMLMotionProps<"button">>(BookButton);
