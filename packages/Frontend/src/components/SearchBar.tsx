import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { searchStore } from "src/state/SearchBarStore";
import SearchSvg from "src/svg/SearchSvg";
import Book from "./Book";

const item = {
    show: {
        opacity: 1,
        background: "#3D3D3D"
    },
    hidden: {
        opacity: 0,
        background: "#EFEFEF"
    }
}

const searchVariant = {
    active: {
        background: "#3D3D3D",
        borderRadius: ".4rem .4rem 0rem 0rem",
    },
    inactive: {
        background: "#EFEFEF",
        borderRadius: ".4rem .4rem .4rem .4rem",
    }
}

const inputVariant = {
    active: {
        color: "#EFEFEF",
        fill: "#EFEFEF"
    },
    inactive: {
        color: "black",
        fill: "grey"
    }
}

function SearchBar() {

    useEffect(() => {
        searchStore.setShow(searchStore.value.length > 1)
    }, [searchStore.value])

    return (
        <Search initial="inactive" animate={searchStore.show ? "active" : "inactive"} variants={searchVariant}>
            <SearchSvg
                initial="inactive"
                animate={searchStore.show ? "active" : "inactive"}
                variants={inputVariant}
                fill="grey" />
            <SearchInput
                initial="inactive"
                animate={searchStore.show ? "active" : "inactive"}
                variants={inputVariant}
                value={searchStore.value}
                onChange={e => searchStore.value = e.target.value}
                placeholder="Search by Book Name"
            />
            <SearchDropdown />
        </Search>
    )
}

const SearchDropdown = observer(() => {

    return (
        <AnimatePresence>
            {
                searchStore.show && (
                    <SearchResult variants={item} exit="hidden" initial="hidden" animate="show">

                        <Book name="test" imageUrl="" id={105} />
                    </SearchResult>
                )
            }

        </AnimatePresence>
    )
})

export default observer(SearchBar);


const SearchResult = styled(motion.div)({
    width: "100%",
    top: "100%",
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    background: "#EFEFEF",
    borderRadius: "0 0 .4rem .4rem",
})

const Search = styled(motion.div)({
    position: "relative",
    display: 'flex',
    background: "#EFEFEF",
    borderRadius: ".4rem",
    alignItems: "center",
    alignSelf: "center",
    justifySelf: "center",
    width: "clamp(1px, 100%, 45rem)",
    "svg": {
        padding: "0 0 0 .75rem",
    }
})

const SearchInput = styled(motion.input)({
    fontSize: "0.75rem",
    width: "100%",
    margin: "1rem 1rem 1rem .20rem",
    background: "transparent",
    color: "black",
    outline: "none",
    border: "none",
})