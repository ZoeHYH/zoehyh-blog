import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { defaultImage, LIST_LIMIT } from "../constants/variable";
import {
  getPostsSearch,
  resetPostStatus,
  selectPostError,
  selectPostsQuery,
  selectPostsResult,
} from "../redux/reducers/postReducer";
import {
  Container,
  BetweenBlock,
  Main,
  Section,
  Wrapper,
} from "../components/Layout";
import { Card } from "../components/Card";
import { H1, H3, H7 } from "../components/Text";
import { useState } from "react";
import { InlineInput } from "../components/Input";

export default function ResultPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const posts = useSelector(selectPostsResult);
  const error = useSelector(selectPostError);
  const [value, setValue] = useState("");
  const query = useSelector(selectPostsQuery);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (value && value !== query) {
      dispatch(getPostsSearch(value));
      history.replace({
        search: `?search=${value}`,
      });
    }
    dispatch(resetPostStatus());
  };

  return (
    <Main>
      <Wrapper>
        <H1>在文章中搜尋：{query}</H1>
        <H1>
          {posts && (posts.length !== 0 ? "結果" : "這裡沒有你想找的東西")}
        </H1>
        <Section>
          {posts && (
            <BetweenBlock>
              <H3 $grey500>{`${posts.length} 篇文章`}</H3>
              {!posts && <H7 $error>{error}</H7>}
            </BetweenBlock>
          )}
          <Container $list as="ul">
            {posts &&
              posts.length !== 0 &&
              posts
                .slice(0, LIST_LIMIT)
                .map((post) => (
                  <Card
                    as="li"
                    key={post.id}
                    to={`/article/${post.id}`}
                    post={post}
                    $width={"48%"}
                    $image={defaultImage}
                  />
                ))}
          </Container>
        </Section>
        <Wrapper $medium>
          <InlineInput
            type={"text"}
            placeholder={"還想查詢什麼呢？"}
            buttonText={"搜尋"}
            value={value}
            handleValue={(value) => {
              setValue(value);
            }}
            handleSubmit={handleSubmit}
          />
        </Wrapper>
      </Wrapper>
    </Main>
  );
}
