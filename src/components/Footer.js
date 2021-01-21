import styled from "styled-components";
import { Wrapper, Ul, Block, BetweenBlock } from "./Layout";
import { H1, H5, H7 } from "./Text";
import { StyledLink } from "./Link";

export const StyledFooter = styled.div`
  background: ${({ theme }) => theme.color.grey[100]};
  margin-top: 8rem;
  & > div {
    padding: 6rem 1rem;
    & > * ~ * {
      margin-top: 4rem;
    }
  }
  & > div > div {
    align-items: flex-end;
  }
  & .block > * ~ * {
    margin-top: 2rem;
  }
  & .copyright {
    text-align: center;
  }
  ${({ theme }) => theme.media.md} {
    & > div {
      padding: 4rem 1rem;
    }
    & > div > div {
      align-items: flex-start;
      & > * ~ * {
        margin-top: 3rem;
      }
    }
    & .block > * ~ * {
      margin-top: 1rem;
    }
    & .copyright {
      text-align: left;
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
      <BetweenBlock>
        <div className={"block"}>
          <H1 className={"title"}>聯絡我吧！</H1>
          <Ul $small>
            <li>
              <H5>0921107875</H5>
            </li>
            <li>
              <H5>c0921107875@gmail.com</H5>
            </li>
          </Ul>
        </div>
        <Ul $medium className={"end"}>
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
              <StyledLink
                as="a"
                href="https://github.com/ZoeHYH"
                target="_blank"
              >
                Github
              </StyledLink>
            </H5>
          </li>
        </Ul>
      </BetweenBlock>
      <H7 className={"copyright"}>© Copyright ZoeHYH. Allrights reserved</H7>
    </Wrapper>
  </StyledFooter>
);
