import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

export interface IAttentionCardProps {
    color?: string;
    children?: any;
    show: boolean;
}

const variants = {
    closed: {
        height: "0rem",
        opacity: 0,
        marginTop: 0,
        padding: 0,
    },
    open: {
        height: "4rem",
        opacity: 1,
        padding: "1.5rem",
        marginTop: ".75rem",
    }
};

function AttentionCard({ children, color, show }: IAttentionCardProps) {
    return (
        <AnimatePresence>
            {show && (
                <PaperCard
                    variants={variants}
                    animate="open"
                    initial="closed"
                    style={{ background: color }}
                >
                    {children}
                </PaperCard>
            )}
        </AnimatePresence>
    );
}

export default AttentionCard;

const PaperCard = styled(motion.div)({
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1.5rem",
    textAlign: "center",
    wordBreak: "break-all",
    width: "100%",
    "*": {
        fontWeight: 600,
    },
    borderRadius: ".4rem",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
});
