import { IBook } from "@dl/shared";
import styled from "@emotion/styled";
import { BaseButton } from "src/styled/Buttons";
import BookBase from "../BookParts/BookBase";
import BookImage from "../BookParts/BookImage";
import BookTitle from "../BookParts/BookTitle";
import { HTMLMotionProps } from "framer-motion"
import React, { useState } from "react";
import opacity from "src/framer/opacity";

export interface IManageBook extends IBook {
    isBorowing: boolean,
}

interface IManageBookProps extends Omit<Omit<HTMLMotionProps<"div">, "id">, "title">, IManageBook {
    onRemove?: (e: React.MouseEvent) => void
    onAdd?: (e: React.MouseEvent) => void
}
//
export function ManageBook({ imageUrl, title, isBorowing, id, onAdd, onRemove, ...props }: IManageBookProps) {

    return (
        <BookBase variants={opacity} exit="hidden" initial="hidden" animate="show" style={{ margin: ".5rem 0" }} {...props}>
            <BookImage src={imageUrl} />
            <BookTitle>{title}</BookTitle>
            {
                isBorowing ?
                    <RemoveButton onClick={onRemove} variant="dark" margin="0rem 1rem 0 0" size=".75rem 1.5rem">Remove</RemoveButton>
                    :
                    <AddButton onClick={onAdd} shadow variant="dark" margin="0rem 1rem 0 0" size=".75rem 1.5rem">Add</AddButton>

            }
        </BookBase>
    )
}

const AddButton = styled(BaseButton)({
    backgroundColor: "#00D455",
    fontWeight: "bold"
})

const RemoveButton = styled(BaseButton)({
    backgroundColor: "#FF4242",
    fontWeight: "bold"
})