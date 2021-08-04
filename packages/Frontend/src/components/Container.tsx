import styled from "@emotion/styled";
import { HTMLMotionProps, motion } from "framer-motion";
import React from "react";

export interface IContainer extends HTMLMotionProps<"div"> {
    min: string;
    value: string;
    max: string;
    children?: any;
}

export function Container({ min, value, max, children, ...props }: IContainer) {

    const clamp = { width: `clamp(${min},${value}, ${max})` };

    return (
        <Wrapper {...props} >
            <Clamped style={clamp}>
                <Inner>
                    {children}
                </Inner>
            </Clamped>
        </Wrapper>
    );
}

const Inner = styled(motion.div)({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
})

const Clamped = styled(motion.div)({
});

const Wrapper = styled(motion.div)({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
});