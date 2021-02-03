import { Image } from "../components/Image";
import { ArticleBlock, Main, Wrapper } from "../components/Layout";
import { Markdown } from "../components/Markdown";
import { H1, H5 } from "../components/Text";
import { ABOUT } from "../constants/text";
import { defaultImage } from "../constants/variable";

export default function AboutPage() {
  return (
    <Main>
      <Wrapper>
        <ArticleBlock>
          <H5 $grey500>About</H5>
          <H1 className={"title"}>{ABOUT.title}</H1>
          <H5 $grey500 className={"info"}>
            {new Date(ABOUT.createdAt).toLocaleString()}
          </H5>
          <div className={"banner"}>
            <Image $width={"max"} $height={"500"} $image={defaultImage} />
          </div>
          <Wrapper $medium className={"content"}>
            <Markdown source={ABOUT.body} />
          </Wrapper>
        </ArticleBlock>
      </Wrapper>
    </Main>
  );
}
