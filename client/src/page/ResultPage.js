import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LIST_LIMIT } from "../constants/variable";
import {
  getPostsSearch,
  selectPostError,
  selectPostsQuery,
  selectPostsResult,
  selectPostStatus,
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
import { useEffect, useState } from "react";
import { InlineInput } from "../components/Input";

export default function ResultPage() {
  const history = useHistory();
  const postStatus = useSelector(selectPostStatus);
  const dispatch = useDispatch();
  const { search } = useLocation();
  const posts = useSelector(selectPostsResult);
  const error = useSelector(selectPostError);
  const [value, setValue] = useState("");
  const query = useSelector(selectPostsQuery);

  const handleSubmit = async (value) => {
    if (value && value !== query) {
      dispatch(getPostsSearch(value));
    }
  };

  useEffect(() => {
    const param = new URLSearchParams(search).get("search");
    if (query !== param) {
      if (postStatus === "idle" || postStatus === "ready")
        dispatch(getPostsSearch(param));
      else
        history.push({
          search: `?search=${query}`,
        });
    }
  }, [search, query, dispatch, posts, postStatus, history]);

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
                  />
                ))}
          </Container>
        </Section>
        <Section>
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
        </Section>
      </Wrapper>
    </Main>
  );
}
