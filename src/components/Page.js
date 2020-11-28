import styled from "styled-components";
import { COLOR, DISTENCE, MEDIA } from "../constants/style";

export const Page = styled.div`
  color: ${COLOR.primaryDark};
  margin-top: ${DISTENCE.lg};
  padding: ${DISTENCE.xs} ${DISTENCE.xs};
  ${MEDIA.sm} {
    margin-top: ${DISTENCE.xl};
  }
`;

export const PageCenter = styled.div`
  color: ${COLOR.primaryDark};
  margin-top: ${DISTENCE.lg};
  padding: 15vh ${DISTENCE.xs};
  display: flex;
  justify-content: center;
  position: relative;
  ${MEDIA.sm} {
    margin-top: ${DISTENCE.xl};
  }
`;
