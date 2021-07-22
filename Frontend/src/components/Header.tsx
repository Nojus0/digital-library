import styled from '@emotion/styled';
import React, { useState } from 'react'
import useOnclickOutside from 'react-cool-onclickoutside';
import SvgLogo from 'src/svg/Logo';
import Seperator from './Seperator'
import SearchSvg from 'src/svg/SearchSvg';
import Dropdown, { DropdownItem } from './Dropdown';
import { ProfileSvg } from 'src/svg/ProfileSvg';
import Link from 'next/link';
import { useUser } from '../state/UserContext';
import { useRouter } from 'next/router';
import { useSignOutMutation } from '../graphql/user/signout';
import { CSSTransition } from 'react-transition-group';
export function Header() {
    const [isDrop, setDrop] = useState(false);
    const Router = useRouter();
    const dropdownRef = useOnclickOutside(() => setDrop(false));
    const [{ username, role, fetching }, dispatch] = useUser();
    const [{ }, signOut] = useSignOutMutation();
    async function SignOut() {
        await signOut();
        dispatch({ type: "SIGNOUT" });
        Router.push("/");
    }

    return (
        <Nav>
            <SideInfo>
                <Link href="/books">
                    <SvgLogo height="100%" />
                </Link>
            </SideInfo>

            <Search>
                <SearchSvg fill="grey" />
                <input placeholder="Search by Book Name"></input>
            </Search>

            <ProfileContainer ref={dropdownRef}>
                <div onClick={e => setDrop(prev => !prev)}>
                    <h1>{username?.substring(0, 1).toUpperCase()}</h1>
                </div>

                <Dropdown on={isDrop}>

                    <Link href={`/profile/${username}`}>
                        <DropdownItem Icon={ProfileSvg} text="Profile" />
                    </Link>

                    <Seperator width="90%" margin="" color="rgba(0,0,0,0.05)" />

                    <Link href="/addbook">
                        <DropdownItem Icon={ProfileSvg} text="Add a Book" />
                    </Link>
                    <Seperator width="90%" margin="" color="rgba(0,0,0,0.05)" />

                    <DropdownItem Icon={ProfileSvg} onClick={SignOut} text="Sign out" />
                </Dropdown>
            </ProfileContainer>
        </Nav>
    )
}


const Nav = styled.nav({
    position: "sticky",
    top: "0",
    padding: "0 .75rem",
    gap: "1rem",
    display: "grid",
    gridTemplateColumns: "0.2fr 2.6fr 0.2fr",
    gridTemplateRows: "1fr",
    alignItems: "center",
    height: "4.25rem",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    background: "#fafafa",
})

const SideInfo = styled.div({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "svg": {
        height: "3em",
    },
    "h1": {
        fontSize: "1.25rem",
    }
})

const ProfileContainer = styled.div({
    display: "flex",
    justifyContent: "center",
    userSelect: "none",
    "& > div:first-of-type": {
        position: "relative",
        cursor: "pointer",
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        background: "#EFEFEF",
        width: "3rem",
        height: "3rem",
        "h1": {
            color: "black",
            fontSize: "1.20rem"
        }
    }

})

const Search = styled.div({
    display: 'flex',
    background: "#EFEFEF",
    borderRadius: ".4rem",
    alignItems: "center",
    alignSelf: "center",
    justifySelf: "center",
    width: "clamp(1px, 100%, 45rem)",
    "svg": {
        padding: "0 0 0 .75rem",
    },
    "input": {
        fontSize: "0.75rem",
        width: "100%",
        margin: "1rem 1rem 1rem .20rem",
        background: "transparent",
        outline: "none",
        border: "none",
    }
})