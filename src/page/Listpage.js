import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { LIST_LIMIT } from "../constants/variable";
import { selectPages, selectPosts } from "../redux/reducers/postReducer";
import {
  Container,
  HeadBlock,
  Main,
  Section,
  Wrapper,
} from "../components/Layout";
import { Card } from "../components/Card";
import { H1, H3 } from "../components/Text";
import { Pagination } from "../components/Pagination";
import { Nav } from "../components/Nav";

export default function ListPage() {
  const { page } = useParams();
  const posts = useSelector(selectPosts);
  const pages = useSelector(selectPages);

  return (
    <Main>
      <Wrapper>
        <H1>部落格</H1>
        <H1>文章列表</H1>
        <Section>
          <HeadBlock>
            <H3 $grey500>全部</H3>
          </HeadBlock>
          <Container $list as="ul">
            {posts &&
              posts
                .slice((page - 1) * LIST_LIMIT, page * LIST_LIMIT)
                .map((post) => (
                  <Card
                    as="li"
                    key={post.id}
                    to={`/article-${post.id}`}
                    post={post}
                    $width={"48%"}
                    $image={"https://i.imgur.com/rPYnKjx.jpg"}
                  />
                ))}
          </Container>
        </Section>
        <Pagination>
          {posts &&
            pages &&
            new Array(pages).fill("").map((_, index) => {
              return (
                <Nav
                  key={index}
                  to={`/list/${index + 1}`}
                  isExact={true}
                  label={`${index + 1}`}
                  $page
                />
              );
            })}
        </Pagination>
      </Wrapper>
    </Main>
  );
}
