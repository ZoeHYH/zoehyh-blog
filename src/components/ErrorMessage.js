import styled from "styled-components";
import { COLOR, DISTENCE } from "../constants/style";

export const ErrorMessage = styled.p`
  color: ${COLOR.alert};
  margin: 0;
  text-align: center;
  display: block;
  position: absolute;
  bottom: ${DISTENCE.md};
  right: 0;
  left: 0;
`;
