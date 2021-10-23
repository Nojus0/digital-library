import { ForwardRefComponent, motion, SVGMotionProps } from "framer-motion";
import React from "react";

function AddIcon(props: SVGMotionProps<SVGSVGElement>) {
    return (
        <motion.svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <motion.g id="Add Icon">
                <motion.circle id="Ellipse 1" cx="14" cy="14" r="14" fill="#37FF57" />
                <motion.path id="Vector 4" d="M14 7V21M7 14H21" stroke="white" strokeWidth="2.35" strokeLinecap="round" />
            </motion.g>
        </motion.svg>
    );
}

export default AddIcon;
