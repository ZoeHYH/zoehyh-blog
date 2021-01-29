import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { Transition } from "./Animation";
import { Line } from "./Line";
import { StyledH5 } from "./Text";
import { ReactComponent as Arrow } from "../image/arrow.svg";
import { FlexBetweenCenter, FlexCenter } from "./Layout";

export const Button = styled.button`
  ${StyledH5}
  word-break: keep-all;
  padding: 1rem 2.5rem;
  position: relative;
  color: ${({ theme }) => theme.color.white};
  background: ${({ theme }) => theme.color.grey[700]};
  ${Transition}
  ${FlexBetweenCenter}
  &:hover {
    background: ${({ theme }) => theme.color.black};
  }
  &:active {
    box-shadow: none;
    background: ${({ theme }) => theme.color.primaryDark};
  }
  & svg {
    margin-left: 0.5rem;
    margin-bottom: 1px;
    stroke: ${({ theme }) => theme.color.white};
    width: 1.25rem;
  }
  ${({ $alert }) =>
    $alert &&
    css`
      padding: 0.25rem 1rem;
      color: ${({ theme }) => theme.color.grey[500]};
      background: transparent;
      border: 1px solid ${({ theme }) => theme.color.grey[500]};
      &:hover {
        background: transparent;
        color: ${({ theme }) => theme.color.error};
        border: 1px solid ${({ theme }) => theme.color.error};
      }
    `}
`;

export const ArrowButton = ({ text, handleOnClick, value }) => (
  <Button onClick={handleOnClick} value={value}>
    {text}
    <Arrow />
  </Button>
);

ArrowButton.propTypes = {
  text: PropTypes.string,
  handleOnClick: PropTypes.func,
  value: PropTypes.string,
};

export const Pagination = styled.div`
  ${FlexCenter}
  margin-top: 3rem;
  & > * ~ * {
    margin-left: 2.5rem;
  }
`;

export const Hamburger = styled.div`
  ${Transition}
  display: block;
  position: relative;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0.5rem;
  cursor: pointer;
  & div,
  & div::before,
  & div::after {
    background: ${({ theme }) => theme.color.grey[500]};
    position: absolute;
    ${Line}
    width: 1.5rem;
  }
  & div {
    ${({ theme, $active }) =>
      $active
        ? `background: transparent;`
        : css`
            background: ${theme.color.grey[500]};
          `}
    display: block;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: background-color 0.125s 0.175s ease-in-out;
  }
  & div::before {
    content: "";
    top: -0.5rem;
    left: 0;
    transition: transform 0.1s cubic-bezier(0.6, 0.04, 0.98, 0.335),
      top 0.1s 0.2s linear, left 0.2s 0.3s ease-in;
    transition: all 0.2s ease-in-out;
    ${({ $active }) =>
      $active &&
      `left: -2rem;
        top: 2rem;
        transform: translate3d(2rem, -2rem, 0) rotate(-45deg);
        transition: left 0.2s ease-out, top 0.1s 0.2s linear,
          transform 0.2s 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  `}
  }
  & div::after {
    content: "";
    top: 0.5rem;
    right: 0;
    transition: transform 0.2s cubic-bezier(0.6, 0.04, 0.98, 0.335),
      top 0.1s 0.2s linear, right 0.2s 0.3s ease-in;
    transition: all 0.2s ease-in-out;
    ${({ $active }) =>
      $active &&
      `right: -2rem;
        top: 2rem;
        transform: translate3d(-2rem, -2rem, 0) rotate(45deg);
        transition: right 0.2s ease-out, top 0.1s 0.2s linear,
          transform 0.2s 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

      `}
  }
  &:hover div {
    ${({ theme, $active }) =>
      $active
        ? `background: transparent;`
        : css`
            background: ${theme.color.primary};
          `}
  }
  &:hover div::before,
  &:hover div::after {
    background: ${({ theme }) => theme.color.primary};
  }
`;
