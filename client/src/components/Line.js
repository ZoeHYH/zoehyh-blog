import { css } from "styled-components";
import { Transition } from "./Animation";

export const Line = css`
  height: 1px;
  border-radius: 1px;
`;

export const AfterLine = css`
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  width: 0;
  ${Line}
  background: ${({ theme }) => theme.color.primaryDark};
  ${Transition}
`;
