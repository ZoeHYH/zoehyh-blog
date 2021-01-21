import styled, { css } from "styled-components";

export const LetterSpaceL = css`
  letter-spacing: 0.3em;
  ${({ $center }) => $center && `padding-left: 0.3em;`}
`;

export const LetterSpaceM = css`
  letter-spacing: 0.1em;
  ${({ $center }) => $center && `padding-left: 0.1em;`}
`;

export const LetterSpaceS = css`
  letter-spacing: 0.05em;
  ${({ $center }) => $center && `padding-left: 0.05em;`}
`;

export const TextBase = css`
  font-size: 16px;
  line-height: 26px;
`;

export const TextColor = css`
  color: ${({ theme }) => theme.color.black};
  ${({ theme, $grey500 }) => $grey500 && `color: ${theme.color.grey[500]};`}
  ${({ theme, $grey700 }) => $grey700 && `color: ${theme.color.grey[700]};`}
  ${({ theme, $error }) => $error && `color: ${theme.color.error};`}
`;

export const StyledH1 = css`
  font-family: "Red Hat Display";
  font-size: 48px;
  line-height: 64px;
  ${LetterSpaceS}
`;

export const StyledH2 = css`
  font-family: "Red Hat Display";
  font-size: 33px;
  line-height: 50px;
  ${LetterSpaceS}
`;

export const StyledH3 = css`
  font-size: 23px;
  line-height: 38px;
  ${LetterSpaceM}
`;

export const StyledH4 = css`
  font-size: 19px;
  line-height: 32px;
  ${LetterSpaceS}
`;

export const StyledH5 = css`
  ${TextBase}
  ${LetterSpaceM}
`;

export const StyledH5Narrow = css`
  ${TextBase}
  ${LetterSpaceS}
`;

export const StyledH5Bold = css`
  font-weight: bold;
  ${TextBase}
  ${LetterSpaceM}
`;

export const StyledH6 = css`
  font-size: 13px;
  line-height: 16px;
  ${LetterSpaceL}
  text-transform: uppercase;
`;

export const StyledH7 = css`
  font-size: 12px;
  line-height: 20px;
  ${LetterSpaceM}
`;

export const H1 = styled.h2`
  ${StyledH1}
  ${TextColor}
  ${({ theme }) => theme.media.sm} {
    ${StyledH2}
  }
`;
export const H2 = styled.h2`
  ${StyledH2}
  ${TextColor}
`;

export const H3 = styled.h3`
  ${StyledH3}
  ${TextColor}
`;

export const H4 = styled.h4`
  ${StyledH4}
  ${TextColor}
`;

export const H5 = styled.h5`
  ${StyledH5}
  ${({ narrow }) => narrow && StyledH5Narrow}
  ${({ bold }) => bold && StyledH5Bold}
  ${TextColor}
`;

export const H6 = styled.h6`
  ${StyledH6}
  ${TextColor}
`;

export const H7 = styled.h6`
  ${StyledH7}
  ${TextColor}
`;
