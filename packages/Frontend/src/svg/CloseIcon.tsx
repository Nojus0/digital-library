import { ForwardRefComponent, motion, SVGMotionProps } from "framer-motion";
import React from "react";

function CloseIcon(props: SVGMotionProps<SVGSVGElement>) {
    return (
        <motion.svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <motion.g id="Close Button">
                <motion.circle id="Ellipse 1" cx="9.5" cy="9.5" r="9.5" fill="#C4C4C4" />
                <motion.g id="Group 5">
                    <motion.path id="Vector" d="M5.32031 13.5196L13.8703 5.13004M5.32031 5.29045L13.8703 13.68" stroke="white" strokeWidth="1.85" strokeLinecap="round" />
                </motion.g>
            </motion.g>
        </motion.svg>
    );
}

export default CloseIcon;
