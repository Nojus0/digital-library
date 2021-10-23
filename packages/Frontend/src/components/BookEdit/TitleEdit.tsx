import styled from "@emotion/styled"
import { ChangeEventHandler, useState } from "react"
import EditIcon from "src/svg/EditIcon"


interface ITitleEditProps {
    isAllowedEdit: boolean
    initialTitle: string
    isEditing: boolean
    titleValue: string,
    onEditTitle: ChangeEventHandler<HTMLInputElement>
    onStartEdit: () => void
}

export function TitleEdit({ isAllowedEdit, initialTitle, isEditing, titleValue, onEditTitle, onStartEdit }: ITitleEditProps) {

    return (
        <>
            {
                !isEditing
                &&
                initialTitle
            }

            {
                isEditing && (
                    <CardHeaderModify
                        value={titleValue}
                        onChange={onEditTitle}
                        type="text"
                    />
                )
            }

            {
                isAllowedEdit && !isEditing && (
                    <EditIconCustom
                        onClick={onStartEdit}
                        whileTap={{ scale: 1 }}
                        whileHover={{ scale: 1.2 }}
                    />
                )
            }
        </>
    )
}


export const EditIconCustom = styled(EditIcon)({
    cursor: "pointer",
    display: "inline",
    marginLeft: ".5rem",
    verticalAlign: "middle",
    "#Pen": {
        // color: "red!important"
    }
})


const CardHeaderModify = styled.input({
    fontSize: "clamp(1.25rem, 5vw, 2.5rem)",
    marginBottom: "1rem",
    background: "transparent"
})