import styled from "styled-components";
import { COLOR, EFFECT, FONT } from "../constants/style";
import PropTypes from "prop-types";
import { Link, useRouteMatch } from "react-router-dom";

const ButtonUnderlineHover = styled.button`
  background: none;
  border: none;
  display: inline-block;
  cursor: pointer;
  text-decoration: none;
  color: ${COLOR.primary};
  font-size: inherit;
  font-weight: bold;
  padding: 10px;
  & span {
    z-index: 1;
    position: relative;
  }
  & span::before {
    z-index: -1;
    content: "";
    display: block;
    background: ${COLOR.primaryLight};
    transition: width 0.3s ease-in-out;
    position: absolute;
    height: 50%;
    width: 0;
    left: 10%;
    bottom: -10%;
  }
  &:hover span::before,
  &.active span::before,
  &:focus span::before {
    width: 100%;
  }
`;

export function ButtonLink({ isActive, content }) {
  return (
    <ButtonUnderlineHover className={isActive ? "active" : ""}>
      <span>{content}</span>
    </ButtonUnderlineHover>
  );
}

ButtonLink.propTypes = {
  isActive: PropTypes.bool,
  content: PropTypes.string,
};

export const Button = styled.button`
  z-index: 1;
  ${EFFECT.block}
  font-size: ${FONT.md};
  font-weight: bold;
  position: relative;
  box-shadow: ${EFFECT.shadowDark};
  &:hover {
    color: ${COLOR.white};
    font-weight: normal;
  }
  &::before {
    z-index: -1;
    content: "";
    display: block;
    background: ${COLOR.primaryDark};
    transition: width 0.3s ease-in-out;
    position: absolute;
    height: 100%;
    width: 0;
    left: 0;
    top: 0;
  }
  &:hover::before {
    width: 100%;
  }
  &:active {
    box-shadow: none;
  }
`;

export function Nav({ to, isExact, label }) {
  const match = useRouteMatch({
    path: to,
    exact: isExact,
  });
  return (
    <Link to={to}>
      <ButtonLink isActive={match ? true : false} content={label} />
    </Link>
  );
}

Nav.propTypes = {
  to: PropTypes.string,
  isExact: PropTypes.bool,
  label: PropTypes.string,
};

export const Pagination = styled.div`
  text-align: center;
`;
