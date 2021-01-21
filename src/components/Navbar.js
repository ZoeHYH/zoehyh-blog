import { useLocation, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { Hamburger } from "./Button";
import { StyledLink } from "./Link";
import { setAuthToken } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import {
  resetUser,
  resetUserStatus,
  selectUser,
  selectUserStatus,
} from "../redux/reducers/userReducer";
import { Logo } from "./Logo";
import styled from "styled-components";
import { H6 } from "./Text";
import { Transition } from "./Animation";
import { SearchInput } from "./Input";
import { Wrapper } from "./Layout";
import { FlexBetweenCenter } from "./Layout";
import { Nav } from "./Nav";
import PropTypes from "prop-types";

const StyledNavbar = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.color.white};
  position: fixed;
  z-index: 2;
  top: 0;
  & > div {
    ${FlexBetweenCenter}
    padding: 1rem;
    & > div {
      ${FlexBetweenCenter}
      &:first-of-type {
        flex-grow: 1;
      }
    }
    & .logo {
      margin-right: auto;
    }
    & .hamburger {
      display: none;
      ${({ theme }) => theme.media.md} {
        display: block;
      }
    }
    & .menu > * {
      margin-left: 1.5rem;
    }
  }
  ${({ theme }) => theme.media.md} {
    &.active {
      border-bottom: 1px solid ${({ theme }) => theme.color.primary};
      .menu {
        max-height: 32rem;
      }
    }
    & > div {
      flex-direction: column;
      align-items: stretch;
    }
    & .menu {
      & > * {
        margin: 0.5rem 0;
      }
      width: 100%;
      ${Transition}
      max-height: 0;
      overflow: hidden;
      flex-direction: column;
    }
  }
`;

export default function Navbar() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const history = useHistory();
  const status = useSelector(selectUserStatus);
  const [isActive, setIsActive] = useState(false);
  const user = useSelector(selectUser);

  const handleLogout = () => {
    setAuthToken(null);
    dispatch(resetUserStatus());
    dispatch(resetUser());
    if (pathname.indexOf("/post") >= 0 || pathname.indexOf("/edit" >= 0)) {
      history.push("/");
    }
  };

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    setIsActive(false);
  }, [pathname]);

  return (
    <StyledNavbar className={isActive ? "active" : ""}>
      <Wrapper>
        <div>
          <Logo to={"/"} className={"logo"}>
            <h1>ZoeHYH</h1>
          </Logo>
          <SearchInput />
          <Hamburger
            className={"hamburger"}
            onClick={handleToggle}
            $active={isActive}
          >
            <div></div>
          </Hamburger>
        </div>
        <div className={"menu"}>
          <Nav to="/list" isExact={false} label="文章列表" />
          <Nav to="/about" isExact={true} label="關於" />
          {status === "succeeded" && (
            <>
              <Nav to="/post" isExact={true} label="發布文章" />
              <StyledLink as={H6} onClick={handleLogout} $nav>
                {"登出"}
              </StyledLink>
            </>
          )}
          {!user && (
            <>
              <Nav to="/login" isExact={true} label="登入" />
              <Nav to="/register" isExact={true} label="註冊" />
            </>
          )}
        </div>
      </Wrapper>
    </StyledNavbar>
  );
}

Navbar.propTypes = {
  isVerified: PropTypes.bool,
};
