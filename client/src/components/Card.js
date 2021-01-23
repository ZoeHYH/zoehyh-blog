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

export const Card = ({ to, post, $width, $image }) => (
  <StyledCard $width={$width} to={to}>
    <Image $height={"250px"} className={"image"} $image={$image} />
    <div className={"infobar"}>
      <H7 $grey500>{"post"}</H7>
      <H7 $grey500>{new Date(post.createdAt).toLocaleString()}</H7>
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
    title: PropTypes.string,
    body: PropTypes.string,
    createdAt: PropTypes.number,
    id: PropTypes.number,
  }),
  $width: PropTypes.string,
  $image: PropTypes.string,
};

const StyledImageCard = styled(Link)`
  ${({ $square }) => `width: ${$square};`}
  & > * ~ * {
    margin-top: 1rem;
  }
`;

export const ImageCard = ({ to, post, $square, $image }) => (
  <StyledImageCard $square={$square} to={to}>
    <Image $square={$square} $image={$image} />
    <H5>{post.title}</H5>
  </StyledImageCard>
);

ImageCard.propTypes = {
  to: PropTypes.string,
  post: PropTypes.shape({
    title: PropTypes.string,
  }),
  $square: PropTypes.string,
  $image: PropTypes.string,
};
