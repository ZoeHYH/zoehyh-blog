import styled from "styled-components";
import PropTypes from "prop-types";
import { FlexBetweenCenter } from "./Layout";
import { H3, H5, H7 } from "./Text";
import { Link } from "react-router-dom";
import { Image } from "./Image";

const StyledCard = styled(Link)`
  ${({ $width }) => `width: ${$width};`}
  ${({ theme }) => theme.media.md} {
    width: 100%;
  }
  & > * ~ * {
    margin-top: 1.5rem;
  }
  & .infobar {
    ${FlexBetweenCenter}
    ${({ theme }) => theme.media.sm} {
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      & > * ~ * {
        margin-top: 0.5rem;
      }
    }
  }
  & .content {
    width: 100%;
    & .preview {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    & > * ~ * {
      margin-top: 1.5rem;
    }
  }
`;

export const Card = ({ to, post, $width }) => (
  <StyledCard $width={$width} to={to}>
    <Image
      $width={"600"}
      $height={"250"}
      className={"image"}
      $image={post.image}
    />
    <div className={"infobar"}>
      <H7 $grey500>{post.Category.text}</H7>
      <H7 $grey500>{new Date(post.updatedAt).toLocaleString()}</H7>
    </div>
    <div className={"content"}>
      <H3>{post.title}</H3>
      <H5 as="p" $narrow $grey700 className="preview">
        {post.body}
      </H5>
    </div>
  </StyledCard>
);

Card.propTypes = {
  to: PropTypes.string,
  post: PropTypes.shape({
    id: PropTypes.number,
    image: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    CategoryId: PropTypes.number,
    Category: PropTypes.shape({
      id: PropTypes.number,
      text: PropTypes.string,
    }),
  }),
  $width: PropTypes.string,
  $image: PropTypes.string,
};

const StyledImageCard = styled(Link)`
  ${({ $square }) =>
    $square &&
    $square[0] &&
    `width: ${$square[0]};
      `}
  ${({ theme, $square }) =>
    $square &&
    $square[1] &&
    `${theme.media.md} {
      width: ${$square[1]};
    }`}
    ${({ theme, $square }) =>
    $square &&
    $square[1] &&
    `${theme.media.sm} {
      width: ${$square[2]};
    }`}
  & > * ~ * {
    margin-top: 1rem;
  }
`;

export const ImageCard = ({ to, post, $square }) => (
  <StyledImageCard $square={$square} to={to}>
    <Image $square={$square} $image={post.image} />
    <H5>{post.title}</H5>
  </StyledImageCard>
);

ImageCard.propTypes = {
  to: PropTypes.string,
  post: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
  }),
  $square: PropTypes.arrayOf(PropTypes.string),
  $image: PropTypes.string,
};
