import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { BookNotFound } from "src/svg/BookNotFound";
import { isClientSide } from "src/graphql/client";

function BookImage(
    props: HTMLMotionProps<"img">,
    ref: React.Ref<HTMLImageElement>
) {
    const [loaded, setLoaded] = useState<boolean>(false);

    const myImg = useRef(isClientSide && new Image());


    // * Next.Js sucks something wrong with mounting
    // * and unmounting doesn't get unmounted properly
    // * or cached somehow, so real on mount doesn't get
    // * fired the second time the component is mounted
    if (isClientSide) {
        myImg.current.src = props.src;
        myImg.current.onerror = () => setLoaded(false);
        myImg.current.onload = () => setLoaded(true);
    }



    if (!loaded) return <StyledError onClick={e => setLoaded(true)} />

    return (
        <StyledImage
            onClick={e => setLoaded(false)}
            {...props}
            ref={ref}
        />

    );
}

export default React.forwardRef<
    HTMLImageElement,
    Parameters<typeof BookImage>[0]
>(BookImage);

const StyledError = styled(BookNotFound)({
    minWidth: "5rem",
    display: "flex",
    paddingLeft: ".5rem",
    alignItems: "flex-end",
});

const StyledImage = styled(motion.img)({
    objectFit: "cover",
    borderRadius: ".4rem 0 0 .4rem",
    height: "100%",
    minWidth: "5rem",
    maxWidth: "5rem"
});
