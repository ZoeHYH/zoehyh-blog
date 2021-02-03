import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { xonokai } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import PropTypes from "prop-types";
import { Code, H1, H2, H3, H4, H5, H6, H7, P } from "./Text";
import { StyledLink } from "./Link";
import styled from "styled-components";

const CodeBlock = ({ language, value }) => (
  <SyntaxHighlighter
    language={language}
    style={xonokai}
    showLineNumbers={true}
    children={value}
  />
);

CodeBlock.propTypes = {
  language: PropTypes.string,
  value: PropTypes.string,
};

const Headings = ({ level, children }) => {
  switch (level) {
    case 1:
      return <H1>{children}</H1>;
    case 2:
      return <H2>{children}</H2>;
    case 3:
      return <H3>{children}</H3>;
    case 4:
      return <H4>{children}</H4>;
    case 5:
      return <H5>{children}</H5>;
    case 6:
      return <H6>{children}</H6>;
    case 7:
      return <H7>{children}</H7>;
    default:
      return <H1>{children}</H1>;
  }
};

Headings.propTypes = {
  level: PropTypes.number,
  children: PropTypes.array,
};

const StyledMarkdown = styled.div`
  & h1,
  & h2,
  & h3,
  & h4,
  & h5,
  & h6 {
    margin: 2rem 0 1rem;
  }
`;

export const Markdown = ({ source }) => (
  <StyledMarkdown>
    <ReactMarkdown
      source={source}
      plugins={[gfm]}
      skipHtml={true}
      renderers={{
        code: CodeBlock,
        heading: Headings,
        paragraph: P,
        inlineCode: Code,
        link: StyledLink,
      }}
      linkTarget="_blank"
    />
  </StyledMarkdown>
);

Markdown.propTypes = {
  source: PropTypes.string,
};
