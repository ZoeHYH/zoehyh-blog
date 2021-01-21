import styled, { css } from "styled-components";

export const FlexBetweenCenter = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Wrapper = styled.div`
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 1rem;
  ${({ $medium }) => $medium && `max-width: 46rem;`}
  ${({ $small }) => $small && `max-width: 35rem;`}
`;

export const Main = styled.main`
  margin-top: 15rem;
  ${({ theme }) => theme.media.md} {
    margin-top: 7rem;
  }
`;

export const Section = styled.section`
  margin-top: 8rem;
  ${({ theme }) => theme.media.md} {
    margin-top: 3rem;
  }
  & > * ~ * {
    margin-top: 3rem;
  }
`;

export const ScrollContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  & > :first-of-type {
    margin-left: 2rem;
  }
  & > * {
    margin-left: 2rem;
  }
`;
export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  ${({ $list }) =>
    $list &&
    `flex-wrap: wrap;
    & > *:nth-of-type(2) ~ * {
      margin-top: 8rem;
    }
  `}
  ${({ theme }) => theme.media.md} {
    flex-direction: column;
    & > * ~ * {
      margin-top: 3rem;
    }
  }
`;

export const Block = styled.div`
  width: 45%;
  ${({ theme }) => theme.media.md} {
    width: 100%;
  }
  & > * ~ * {
    margin-top: 5rem;
    ${({ theme }) => theme.media.md} {
      margin-top: 1.5rem;
    }
  }
`;

export const HeadBlock = styled.div`
  ${FlexBetweenCenter}
  ${({ theme }) => theme.media.md} {
    flex-direction: column;
    align-items: flex-start;
    & > * ~ * {
      margin-top: 0.5rem;
    }
  }
`;

export const ArticleBlock = styled.div`
  & .title {
    margin-top: 2.5rem;
  }
  & .info {
    margin-top: 3rem;
  }
  & .banner {
    margin-top: 4rem;
  }
  & .content {
    margin-top: 6rem;
  }
  & .group {
    ${FlexBetweenCenter}
    margin-top: 2rem;
  }
  ${({ theme }) => theme.media.sm} {
    & .title,
    & .info {
      margin-top: 1rem;
    }
    & .banner {
      margin-top: 2.5rem;
    }
  }
`;

export const Ul = styled.ul`
  & > li ~ li {
    ${({ medium }) => medium && `margin-top: 1.5rem;`}
    ${({ small }) => small && `margin-top: 1rem;`}
  }
`;

export const Form = styled.form`
  & > * ~ * {
    margin-top: 3rem;
  }
  & > button {
    margin-top: 4rem;
  }
`;
