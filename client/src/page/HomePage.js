import {
  Block,
  Main,
  Section,
  Wrapper,
  ScrollContainer,
  BetweenBlock,
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
            posts.length > 3 &&
            posts
              .slice(3, 10)
              .map((post) => (
                <ImageCard
                  as="li"
                  key={post.id}
                  to={`/article/${post.id}`}
                  post={post}
                  $square={["540", "400", "280"]}
                />
              ))}
        </ScrollContainer>
      </Section>
      <Wrapper>
        <Section>
          <Container>
            <Block>
              <div>
                <H3>前端工程師</H3>
                <br />
                <H3>Simple but profound.</H3>
              </div>
              <ArrowLink
                to={"/about"}
                className={"link"}
                label={"更多關於我的事情"}
                $hide
              />
            </Block>
            <Block>
              <H4 as="p" $grey700>
                {`使用 React 與 Redux 建立網站，喜歡將網站的重複元素拆解成多個 Components。\n\n同時使用 Express.js 與 Node.js 建構後端，部屬於AWS，並使用 Nginx 反向代理。`}
              </H4>
            </Block>
          </Container>
        </Section>
        <Section>
          <BetweenBlock>
            <H3 $grey500>最新文章</H3>
            <ArrowLink to={"/list"} label={"看看所有文章"} />
          </BetweenBlock>
          <Container as="ul">
            {posts &&
              posts
                .slice(0, 3)
                .map((post) => (
                  <Card
                    as="li"
                    key={post.id}
                    to={`/article/${post.id}`}
                    post={post}
                    $width={"32%"}
                  />
                ))}
          </Container>
        </Section>
      </Wrapper>
    </Main>
  );
}
