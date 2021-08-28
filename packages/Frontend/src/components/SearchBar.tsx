import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import { searchStore } from "src/state/SearchBarStore";
import SearchSvg from "src/svg/SearchSvg";
import debounce from "lodash/debounce";
import Book from "./BookParts/Book";
import { Search, SearchInput } from "src/styled/SearchBar";

function SearchBar() {
    const outsideRef = useOnclickOutside(() => searchStore.setShow(false));

    const throttledFetch = debounce(() => searchStore.fetchSuggestions(), 1000);

    useEffect(() => {
        if (searchStore.value.length < 3) return searchStore.clearResults();

        throttledFetch();
    }, [searchStore.value])

    function clicked(e: React.MouseEvent) {

        if (e.target !== e.currentTarget) return;

        searchStore.setShow(true);
    }

    const animate = searchStore.show && searchStore.results.length > 0 ? "active" : "inactive";
    return (
        <Search shadow={false} ref={outsideRef} initial="inactive" animate={animate} variants={searchVariant}>
            <SearchSvg
                initial="inactive"
                animate={animate}
                variants={inputVariant}
                fill="grey" />
            <SearchInput
                initial="inactive"
                animate={animate}
                onClick={clicked}
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
            {searchStore.show && (
                <SearchResult
                    variants={item}
                    exit="hidden"
                    initial="hidden"
                    animate="show"
                >
                    {searchStore.results.map((book) => (
                        <SearchBarBook
                            onClick={(e) => searchStore.setShow(false)}
                            key={book.id}
                            {...book}
                        />
                    ))}
                </SearchResult>
            )}
        </AnimatePresence>
    );
})

const SearchBarBook = styled(Book)({
    width: "95%",
    marginBottom: "1.25rem"
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