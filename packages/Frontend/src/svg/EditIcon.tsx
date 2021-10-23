import { ForwardRefComponent, motion, SVGMotionProps } from "framer-motion";
import React from "react";

function EditIcon(props: SVGMotionProps<SVGSVGElement>) {
    return (
        <motion.svg width="19" height="23" viewBox="0 0 19 23" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <motion.g id="Pen Icon">
                <motion.circle id="CircleBackground" cx="9.5" cy="13.5" r="9.5" fill="#C4C4C4" />
                <motion.g id="Pen">
                    <motion.path id="Rectangle 46" d="M12.7759 1.81262C13.2427 0.811536 14.4326 0.378425 15.4337 0.845236L16.1971 1.20122C17.1982 1.66803 17.6313 2.85799 17.1645 3.85907L16.3193 5.67169L11.9306 3.62523L12.7759 1.81262Z" fill="currentColor" />
                    <motion.path id="Rectangle 47" d="M11.689 4.14313L16.0776 6.18958L11.2477 16.5474L6.85904 14.5009L11.689 4.14313Z" fill="currentColor" />
                    <motion.path id="Vector 3" d="M7.16895 19.5L6.85938 14.5009L11.248 16.5474L7.16895 19.5Z" fill="currentColor" />
                </motion.g>
            </motion.g>
        </motion.svg>
    );
}

export default EditIcon;
