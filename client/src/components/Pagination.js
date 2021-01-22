import styled from "styled-components";
import { FlexCenter } from "./Layout";

export const Pagination = styled.div`
  ${FlexCenter}
  margin-top: 3rem;
  & > * ~ * {
    margin-left: 2.5rem;
  }
`;
