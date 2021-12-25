import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import SvgLogo from "src/svg/Logo";
import Seperator from "./utils/Seperator";
import Dropdown, { DropdownItem } from "./Dropdown";
import { ProfileSvg } from "src/svg/ProfileSvg";
import Link from "next/link";
import { useRouter } from "next/router";
import { Role } from "@dl/shared";
import { observer } from "mobx-react-lite";
import { userStore } from "src/state/UserStore";
import SearchBar from "./SearchBar";
function Header() {
  const [search, setSearch] = useState("");
  const [isDrop, setDrop] = useState(false);
  const Router = useRouter();
  const dropdownRef = useOnclickOutside(() => setDrop(false));

  useEffect(() => {
    document.body.style.overflowY = "scroll";

    return () => {
      document.body.style.overflowY = "";
    };
  }, []);

  async function SignOut() {
    await userStore.signOut();
    await Router.push("/");
  }

  return (
    <Nav>
      <SideInfo>
        <SvgLogo to="/books" height="100%" />
      </SideInfo>

      <SearchBar />

      <ProfileContainer ref={dropdownRef}>
        {userStore.user.signedIn && (
          <ProfileIcon onClick={(e) => setDrop((prev) => !prev)}>
            <ProfileIconText>
              {userStore.user?.username?.substring(0, 1).toUpperCase()}
            </ProfileIconText>
          </ProfileIcon>
        )}

        <Dropdown on={isDrop}>
          <Link href={`/profile/${userStore.user?.username}`} passHref>
            <a>
              <DropdownItem Icon={ProfileSvg} text="Profile" />
            </a>
          </Link>

          <Seperator width="90%" margin="" color="rgba(0,0,0,0.05)" />

          {userStore.user?.role == Role.Administrator && (
            <>
              <Link href="/addbook" passHref>
                <a>
                  <DropdownItem Icon={ProfileSvg} text="Add a Book" />
                </a>
              </Link>
              <Seperator width="90%" margin="" color="rgba(0,0,0,0.05)" />
            </>
          )}

          <DropdownItem Icon={ProfileSvg} onClick={SignOut} text="Sign out" />
        </Dropdown>
      </ProfileContainer>
    </Nav>
  );
}

export default observer(Header);

const Nav = styled.nav({
  position: "sticky",
  zIndex: 2,
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
});

const SideInfo = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  svg: {
    height: "3em",
  },
  h1: {
    fontSize: "1.25rem",
  },
});

const ProfileIcon = styled.div({
  position: "relative",
  cursor: "pointer",
  display: "flex",
  userSelect: "none",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  background: "#EFEFEF",
  width: "3rem",
  height: "3rem",
  minWidth: "3rem",
  minHeight: "3rem",
});

const ProfileIconText = styled.h1({
  color: "black",
  userSelect: "none",
  fontSize: "1.20rem",
});

const ProfileContainer = styled.div({
  display: "flex",
  justifyContent: "center",
  userSelect: "none",
});
