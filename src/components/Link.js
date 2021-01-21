import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { H5, StyledH6 } from "./Text";
import { AfterLine } from "./Line";
import { Transition } from "./Animation";
import { ReactComponent as Arrow } from "../image/arrow.svg";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
  display: inline-block;
  text-align: center;
  color: ${({ theme }) => theme.color.grey[500]};
  cursor: pointer;
  &:hover,
  &:focus {
    color: ${({ theme }) => theme.color.primaryDark};
    ${Transition}
  }
  ${({ $nav }) =>
    $nav &&
    css`
      ${StyledH6}
      padding-top: 0.25rem;
      padding-bottom: 0.25rem;
      position: relative;
      &::after {
        ${AfterLine}
        ${({ $active }) => $active && `width: 40%;`}
      }
    `}
  ${({ $page }) =>
    $page &&
    css`
      ${({ theme, $active }) => $active && `color: ${theme.color.black};`}
    `}
`;

export const StyledArrowLink = styled(Link)`
  display: flex;
  align-items: center;
  height: 2rem;
  cursor: pointer;
  & > * ~ * {
    margin-left: 0.5rem;
  }
  & :first-child {
    ${Transition}
    ${({ $hide }) => $hide && `max-width: 0; overflow: hidden;`}
    word-break: keep-all;
  }
  & svg {
    stroke: ${({ theme }) => theme.color.grey[500]};
  }
  &:hover,
  &:focus {
    & :first-child {
      display: inline-block;
      max-width: 200px;
      color: ${({ theme }) => theme.color.primary};
    }
    & svg {
      stroke: ${({ theme }) => theme.color.primary};
    }
  }
`;

export const ArrowLink = ({ to, label, $hide }) => (
  <StyledArrowLink to={to} $hide={$hide}>
    <H5 $grey500>{label}</H5>
    <Arrow />
  </StyledArrowLink>
);

ArrowLink.propTypes = {
  to: PropTypes.string,
  label: PropTypes.string,
  $hide: PropTypes.bool,
};
