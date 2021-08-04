import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";
import { observer } from "mobx-react";
import React, { useCallback, useEffect, useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import { searchStore } from "src/state/SearchBarStore";
import SearchSvg from "src/svg/SearchSvg";
import Book from "./Book";
import debounce from "lodash/debounce";

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
        color: "#000000",
        fill: "#808080"
    }
}

function SearchBar() {
    const outsideRef = useOnclickOutside(() => searchStore.setShow(false));

    const throttledFetch = debounce(() => searchStore.fetchSuggestions(), 1000);

    function Clicked(e: React.MouseEvent) {

        if (!searchStore.show && searchStore.value.length >= 3) searchStore.setShow(true);
    }

    useEffect(() => {
        throttledFetch();
    }, [searchStore.value])


    const animate = searchStore.show && searchStore.results.length > 0 ? "active" : "inactive";

    return (
        <Search onBlur={e => searchStore.setShow(false)} onFocus={e => searchStore.setShow(true)} onClick={Clicked} ref={outsideRef} initial="inactive" animate={animate} variants={searchVariant}>
            <SearchSvg
                initial="inactive"
                animate={animate}
                variants={inputVariant}
                fill="grey" />
            <SearchInput
                initial="inactive"
                animate={animate}
                variants={inputVariant}
                value={searchStore.value}
                onChange={e => searchStore.setValue(e.target.value)}
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
                        {
                            searchStore.results.map(book => <Book onClick={e => searchStore.setShow(false)} key={book.id} style={{ width: "95%" }} {...book} />)
                        }
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
    alignItems: "center",
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