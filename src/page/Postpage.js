import { Input, Select, Textarea, FileInput } from "../components/Input";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import {
  createPost,
  resetPostStatus,
  selectPost,
  selectPostError,
  selectPostStatus,
} from "../redux/reducers/postReducer";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ArticleBlock, Form, Main, Wrapper } from "../components/Layout";
import { H1, H7 } from "../components/Text";

export default function PostPage() {
  const dispatch = useDispatch();
  let history = useHistory();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [body, setBody] = useState("");
  const [url, setUrl] = useState("");
  const error = useSelector(selectPostError);
  const post = useSelector(selectPost);
  const postStatus = useSelector(selectPostStatus);
  const [imageError, setImageError] = useState("");

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    if (url) await dispatch(createPost({ title, body }));
    setImageError("請上傳圖片");
  };

  useEffect(() => {
    if (postStatus === "succeeded") history.push(`/article/${post.id}`);
  }, [postStatus, history, post]);

  useEffect(() => {
    return () => {
      dispatch(resetPostStatus());
    };
  }, [dispatch]);

  return (
    <Main>
      <Wrapper>
        <ArticleBlock>
          <H1 className={"title"}>發布文章</H1>
          <FileInput value={url} handleUrl={(value) => setUrl(value)} />
          <Wrapper $small className={"content"}>
            <Form onSubmit={handleOnSubmit}>
              <Input
                title="標題"
                type="text"
                name="title"
                placeholder={"想一個吸睛的標題"}
                value={title}
                handleOnChange={(value) => setTitle(value)}
                alert={postStatus === "failed"}
                required
              />
              <H7 $error>{imageError}</H7>
              <Select
                title={"類別"}
                name={"category"}
                placeholder={"文章的類別"}
                options={[
                  { name: "程式", value: "Code" },
                  { name: "設計", value: "Design" },
                ]}
                value={category}
                handleValue={(value) => setCategory(value)}
                alert={postStatus === "failed"}
                required
              />
              <Textarea
                title="內文"
                name="body"
                placeholder={"在這裡輸入內容"}
                value={body}
                handleOnChange={(value) => setBody(value)}
                alert={postStatus === "failed"}
                required={true}
              />
              <H7 $error>{error}</H7>
              <Button>決定發布</Button>
            </Form>
          </Wrapper>
        </ArticleBlock>
      </Wrapper>
    </Main>
  );
}
