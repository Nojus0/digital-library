import { observer } from "mobx-react-lite";
import React from "react";
import { manageStore } from "src/state/ManageBookStore";
import { Search, SearchInput } from "src/styled/SearchBar";
import SearchSvg from "src/svg/SearchSvg";

function UserSearchBar() {
    return (
        <Search style={{ marginBottom: "1rem" }} initial="inactive">
            <SearchSvg
                initial="inactive"
                fill="grey" />
            <SearchInput
                value={manageStore.searchUser}
                onChange={e => manageStore.setUsernameSearch(e.target.value)}
                initial="inactive"
                placeholder="Search for a user"
            />
        </Search>
    )
}

export default observer(UserSearchBar);