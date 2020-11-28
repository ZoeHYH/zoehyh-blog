import styled from "styled-components";
import { COLOR } from "../constants/style";

const LoaderContainer = styled.div`
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: ${COLOR.primaryDark + "80"};
`;

const Loader = styled.div`
  @keyframes rect-rotate {
    0% {
      transform: rotate(0);
    }
    50%,
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes fill-rect {
    0%,
    50% {
      width: 0px;
    }
    100% {
      width: 100%;
    }
  }
  transform-origin: center center;
  color: ${COLOR.primary};
  width: 70px;
  height: 70px;
  position: relative;
  border: 3px solid;
  display: inline-block;
  animation: rect-rotate 2s linear infinite;

  &::after {
    content: "";
    height: 100%;
    display: block;
    background: ${COLOR.primaryLight};
    animation: fill-rect 2s linear infinite;
  }
`;

export function Loading() {
  return (
    <LoaderContainer>
      <Loader />
    </LoaderContainer>
  );
}
