import styled from '@emotion/styled'
import React, { useState } from 'react'
import { HTMLMotionProps, motion } from 'framer-motion'
import { BookNotFound } from 'src/svg/BookNotFound';

function BookImage(props: HTMLMotionProps<"img">, ref: React.Ref<HTMLImageElement>) {

    const [imageError, setError] = useState(false);

    if (imageError) return <StyledError />

    return (
        <StyledImage {...props} ref={ref} onError={e => setError(true)} />
    )
}

export default React.forwardRef<HTMLImageElement, Parameters<typeof BookImage>[0]>(BookImage);

const StyledError = styled(BookNotFound)({
    minWidth: "5rem",
    display: "flex",
    paddingLeft: ".5rem",
    alignItems: "flex-end",
})

const StyledImage = styled(motion.img)({
    objectFit: "cover",
    borderRadius: ".4rem 0 0 .4rem",
    height: "100%",
    minWidth: "5rem",
    width: "5rem"
})

