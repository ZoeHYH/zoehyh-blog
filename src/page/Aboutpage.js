import { Image } from "../components/Image";
import { ArticleBlock, Main, Wrapper } from "../components/Layout";
import { H1, H4, H5 } from "../components/Text";
import { ABOUT } from "../constants/text";

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
            <Image
              $height={"32rem"}
              $image={"https://i.imgur.com/LmwJdsm.jpg"}
            />
          </div>
          <Wrapper $medium className={"content"}>
            <H4 as="p">{ABOUT.body}</H4>
          </Wrapper>
        </ArticleBlock>
      </Wrapper>
    </Main>
  );
}
