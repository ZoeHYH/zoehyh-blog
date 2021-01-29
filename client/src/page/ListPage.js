import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { LIST_LIMIT } from "../constants/variable";
import {
  selectCategories,
  selectCount,
  selectPosts,
} from "../redux/reducers/postReducer";
import { Container, Main, Section, Wrapper } from "../components/Layout";
import { Card } from "../components/Card";
import { H1 } from "../components/Text";
import { Pagination } from "../components/Button";
import { Nav } from "../components/Nav";
import { Select } from "../components/Input";
import { useEffect, useState } from "react";

export default function ListPage() {
  const { page } = useParams();
  const posts = useSelector(selectPosts);
  const count = useSelector(selectCount);
  const categories = useSelector(selectCategories);
  const [category, setCategory] = useState("all");
  const [sum, setSum] = useState(count);
  const [content, setContent] = useState(posts);
  const history = useHistory();

  const handleSelect = (value) => {
    setCategory(value);
  };

  useEffect(() => {
    history.replace("/list/1");
    const selectedPosts = posts.filter((post) => {
      if (category === "all") return true;
      return post.CategoryId.toString() === category;
    });
    setContent(selectedPosts);
    setSum(selectedPosts.length);
  }, [history, posts, category]);

  return (
    <Main>
      <Wrapper>
        <H1>部落格</H1>
        <H1>文章列表</H1>
        <Section>
          <Select
            title={"類別"}
            name={"category"}
            options={[
              { text: "全部", value: "all" },
              ...categories.map(({ text, id }) => {
                return { text, value: id };
              }),
            ]}
            value={category}
            handleValue={handleSelect}
          />
          <Container $list as="ul">
            {content &&
              content
                .slice((page - 1) * LIST_LIMIT, page * LIST_LIMIT)
                .map((post) => (
                  <Card
                    as="li"
                    key={post.id}
                    to={`/article/${post.id}`}
                    post={post}
                    $width={"48%"}
                  />
                ))}
          </Container>
        </Section>
        <Pagination>
          {content &&
            sum &&
            new Array(Math.ceil(sum / LIST_LIMIT)).fill("").map((_, index) => {
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
