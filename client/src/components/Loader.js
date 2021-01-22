import styled from "styled-components";
import { FlexCenter } from "./Layout";
import { ReactComponent as LogoAnimated } from "../image/logo_animated.svg";

const LoaderContainer = styled.div`
  z-index: 3;
  ${FlexCenter}
  background: ${({ theme }) => theme.color.white + "ee"};
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
`;

export const Loader = styled(LogoAnimated)`
  width: 4rem;
  height: auto;
`;

export function Loading() {
  return (
    <LoaderContainer>
      <Loader />
    </LoaderContainer>
  );
}
