import PropTypes from "prop-types";
import { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { imageBaseUrl } from "../constants/variable";
import { Transition } from "./Animation";

export const StyledImage = styled.div`
  width: 100%;
  overflow: hidden;
  & > div {
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
    background-image: url(${({ $image }) => $image});
  }
  ${({ $height }) => $height && `height: ${$height}px;`}
  ${({ $square }) =>
    $square &&
    ($square[0]
      ? `
      width: ${$square[0]}px;
      height: ${$square[0]}px;
    `
      : `
      width: ${$square}px;
      height: ${$square}px;
    `)}
  ${({ theme, $square }) =>
    $square &&
    $square[1] &&
    `
    ${theme.media.md} {
      width: ${$square[1]}px;
      height: ${$square[1]}px;
    }
  `}
  ${({ theme, $square }) =>
    $square &&
    $square[2] &&
    `
    ${theme.media.sm} {
      width: ${$square[2]}px;
      height: ${$square[2]}px;
    }
  `}
  ${({ $image }) =>
    Array.isArray($image) &&
    $image.length > 0 &&
    `& > div {
      background-image: url(${$image[0][0]});
      background-image: -webkit-image-set(
        url(${$image[0][0]}) 1x,
        url(${$image[0][1]}) 2x,
        url(${$image[0][2]}) 3x
      );
      background-image: image-set(
        url(${$image[0][0]}) 1x,
        url(${$image[0][1]}) 2x,
        url(${$image[0][2]}) 3x
      );
    }`}
  ${({ theme, $image }) =>
    Array.isArray($image) &&
    $image.length > 1 &&
    `& > div {
      ${theme.media.md} {
        background-image: url(${$image[1][0]});
        background-image: -webkit-image-set(
          url(${$image[1][0]}) 1x,
          url(${$image[1][1]}) 2x,
          url(${$image[1][2]}) 3x
        );
        background-image: image-set(
          url(${$image[1][0]}) 1x,
          url(${$image[1][1]}) 2x,
          url(${$image[1][2]}) 3x
        );
      }`}
  
  ${({ theme, $image }) =>
    Array.isArray($image) &&
    $image.length > 2 &&
    `& > div {
        ${theme.media.sm} {
          & > div {
            background-image: url(${$image[2][0]});
            background-image: -webkit-image-set(
              url(${$image[2][0]}) 1x,
              url(${$image[2][1]}) 2x,
              url(${$image[2][2]}) 3x
            );
            background-image: image-set(
              url(${$image[2][0]}) 1x,
              url(${$image[2][1]}) 2x,
              url(${$image[2][2]}) 3x
            );
          }
        }
      }
    `}
  &:hover > div {
    ${Transition}
    transform: scale(1.2);
  }
`;

const responsiveImageUrl = (origin, width, height, dpr) =>
  `${imageBaseUrl}w_${width},h_${height},c_fill,g_auto,dpr_${dpr}.0/${origin.slice(
    imageBaseUrl.length
  )}`;

export const Image = ({ $image, $height, $width, $square }) => {
  const theme = useContext(ThemeContext);
  let responsiveImage = [];
  if ($image.indexOf(imageBaseUrl) === 0) {
    if ($square)
      for (let i = 0; i < $square.length; i++) {
        responsiveImage[i] = [];
        for (let j = 0; j < 3; j++) {
          responsiveImage[i][j] = responsiveImageUrl(
            $image,
            $square[i],
            $square[i],
            j + 1
          );
        }
      }
    else if ($height && $width !== "max") {
      responsiveImage[0] = [];
      for (let j = 0; j < 3; j++) {
        responsiveImage[0][j] = responsiveImageUrl(
          $image,
          $width,
          $height,
          j + 1
        );
      }
    } else if ($height && $width === "max")
      for (let i = 0; i < theme.wrapper.length; i++) {
        responsiveImage[i] = [];
        for (let j = 0; j < 3; j++) {
          responsiveImage[i][j] = responsiveImageUrl(
            $image,
            i === 0
              ? theme.wrapper.lg
              : i === 1
              ? theme.wrapper.md
              : theme.wrapper.sm,
            $height,
            j + 1
          );
        }
      }
  }
  return (
    <StyledImage
      $image={responsiveImage.length > 0 ? responsiveImage : $image}
      $height={$height}
      $width={$width}
      $square={$square}
    >
      <div></div>
    </StyledImage>
  );
};

Image.propTypes = {
  $image: PropTypes.string,
  $height: PropTypes.string,
  $width: PropTypes.string,
  $square: PropTypes.arrayOf(PropTypes.string),
};
