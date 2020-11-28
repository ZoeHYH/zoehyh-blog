import { COLOR, MEDIA, EFFECT, DISTENCE, FONT } from "../../constants/style";
import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderWrapper = styled.div`
  width: 100%;
  background: ${COLOR.white};
  box-shadow: ${EFFECT.shadowDark};
  position: fixed;
  z-index: 2;
  top: 0;
`;

export const Wrapper = styled.div`
  max-width: 960px;
  margin: 0 auto;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: ${COLOR.primaryDark};
  height: ${DISTENCE.lg};
  ${MEDIA.sm} {
    height: ${DISTENCE.xl};
    flex-direction: column;
  }
`;

export const Brand = styled(Link)`
  color: ${COLOR.primary};
  font-size: ${FONT.lg};
  font-weight: bold;
  text-decoration: none;
  padding: 0 ${DISTENCE.xs};
`;
