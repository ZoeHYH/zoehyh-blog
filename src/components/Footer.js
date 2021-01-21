import styled from "styled-components";
import { Wrapper, Ul, Block } from "./Layout";
import { H1, H5, H7 } from "./Text";
import { StyledLink } from "./Link";

export const StyledFooter = styled.div`
  background: ${({ theme }) => theme.color.grey[100]};
  margin-top: 8rem;
  & > div {
    padding: 8rem 1rem;
    display: flex;
    justify-content: space-between;
    ${({ theme }) => theme.media.md} {
      padding: 4rem 1rem;
      flex-direction: column;
      & > * ~ * {
        margin-top: 3rem;
      }
    }
    & .block > * ~ * {
      margin-top: 2rem;
      ${({ theme }) => theme.media.md} {
        margin-top: 1rem;
      }
    }
    & > div:last-of-type {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }
  }
`;

export const StyledBlock = styled(Block)`
  ${({ theme }) => theme.media.md} {
    & > * ~ * {
      margin-top: 1rem;
    }
  }
`;

export const Footer = () => (
  <StyledFooter>
    <Wrapper>
      <div className={"block"}>
        <H1 className={"title"}>聯絡我吧！</H1>
        <Ul small>
          <li>
            <H5>0921107875</H5>
          </li>
          <li>
            <H5>c0921107875@gmail.com</H5>
          </li>
        </Ul>
      </div>
      <Ul medium>
        <li>
          <H5 $grey500>
            <StyledLink
              as="a"
              href="https://www.facebook.com/he.y.han.1/"
              target="_blank"
            >
              Facebook
            </StyledLink>
          </H5>
        </li>
        <li>
          <H5 $grey500>
            <StyledLink as="a" href="https://github.com/ZoeHYH" target="_blank">
              Github
            </StyledLink>
          </H5>
        </li>
      </Ul>
      <div>
        <H7>
          © Copyright ZoeHYH.
          <br />
          Allrights reserved
        </H7>
      </div>
    </Wrapper>
  </StyledFooter>
);
