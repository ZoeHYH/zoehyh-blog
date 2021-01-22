import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logoName from "../image/logo_name.svg";
import logoNameAnimated from "../image/logo_name_animated.svg";

const HideText = css`
  text-indent: 101%;
  overflow: hidden;
  white-space: nowrap;
`;

export const StyledLogo = styled(Link)`
  &,
  & h1 {
    ${HideText}
  }
  display: inline-block;
  width: 120px;
  height: 60px;
  background: url(${logoName}) center/contain no-repeat;
  &:hover {
    background: url(${logoNameAnimated}) center/contain no-repeat;
  }
`;

export const Logo = ({ to, text }) => (
  <StyledLogo to={to}>
    <h1>{text}</h1>
  </StyledLogo>
);

Logo.propTypes = {
  to: PropTypes.string,
  text: PropTypes.string,
};
