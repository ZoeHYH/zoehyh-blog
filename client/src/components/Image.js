import PropTypes from "prop-types";
import styled from "styled-components";
import { Transition } from "./Animation";

export const StyledImage = styled.div`
  width: 100%;
  ${({ $height }) => $height && `height: ${$height};`}
  ${({ $square }) =>
    $square &&
    `width: ${$square};
      height: ${$square};`}
    overflow: hidden;
  & > div {
    width: 100%;
    height: 100%;
    background: url(${({ $image }) => $image}) center/cover;
  }
  &:hover > div {
    ${Transition}
    transform: scale(1.2);
  }
`;

export const Image = ({ $image, $height, $square }) => (
  <StyledImage $image={$image} $height={$height} $square={$square}>
    <div></div>
  </StyledImage>
);

Image.propTypes = {
  $image: PropTypes.string,
  $height: PropTypes.string,
  $square: PropTypes.string,
};
