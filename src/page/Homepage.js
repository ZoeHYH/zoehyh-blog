import {
  Block,
  Main,
  Section,
  Wrapper,
  ScrollContainer,
  HeadBlock,
  Container,
} from "../components/Layout";
import { useSelector } from "react-redux";
import { selectPosts } from "../redux/reducers/postReducer";
import { H1, H3, H4 } from "../components/Text";
import { ArrowLink } from "../components/Link";
import { Card, ImageCard } from "../components/Card";

export default function HomePage() {
  const posts = useSelector(selectPosts);

  return (
    <Main>
      <Wrapper>
        <H1>嗨！</H1>
        <H1>我是何宇涵</H1>
        <H1>歡迎來到我的部落格</H1>
      </Wrapper>
      <Section>
        <ScrollContainer as="ul">
          {posts &&
            posts
              .slice(3, 10)
              .map((post) => (
                <ImageCard
                  as="li"
                  key={post.id}
                  to={`/article-${post.id}`}
                  post={post}
                  $square={"40vmax"}
                  $image={"https://i.imgur.com/rPYnKjx.jpg"}
                />
              ))}
        </ScrollContainer>
      </Section>
      <Wrapper>
        <Section>
          <Container>
            <Block>
              <H3>
                前端工程師
                <br />
                我覺得你可以更靠近一點
              </H3>
              <ArrowLink
                to={"/about"}
                className={"link"}
                label={"我想了解更多"}
                $hide
              />
            </Block>
            <Block>
              <H4 as="p" $grey700>
                使用 React 前端使用 React 前端使用 React 前端使用 React 前端使用
                React 前端使用 React 前端使用 React 前端使用 React 前端
                <br />
                使用 React 前端使用 React 前端使用 React 前端使用 React 前端使用
                React 前端使用 React 前端使用 React 前端
              </H4>
            </Block>
          </Container>
        </Section>
        <Section>
          <HeadBlock>
            <H3 $grey500>最新文章</H3>
            <ArrowLink to={"/list"} label={"看看所有文章"} />
          </HeadBlock>
          <Container as="ul">
            {posts &&
              posts
                .slice(0, 3)
                .map((post) => (
                  <Card
                    as="li"
                    key={post.id}
                    to={`/article-${post.id}`}
                    post={post}
                    $width={"32%"}
                    $image={"https://i.imgur.com/rPYnKjx.jpg"}
                  />
                ))}
          </Container>
        </Section>
      </Wrapper>
    </Main>
  );
}
