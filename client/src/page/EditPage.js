import { FileInput, Input, Select, Textarea } from "../components/Input";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import {
  getPost,
  selectPost,
  updatePost,
  selectPostError,
  selectPostStatus,
  selectPostById,
  resetPostStatus,
  selectCategories,
} from "../redux/reducers/postReducer";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ArticleBlock, Form, Main, Wrapper } from "../components/Layout";
import { H1, H7 } from "../components/Text";

export default function EditPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const categories = useSelector(selectCategories);
  const postById = useSelector((state) => selectPostById(state, id));
  const postByFetch = useSelector(selectPost);
  const error = useSelector(selectPostError);
  const status = useSelector(selectPostStatus);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (!postById && !postByFetch) dispatch(getPost(id));
  }, [postById, postByFetch, id, dispatch]);

  const post = postById || postByFetch;

  if (status !== "loading" && !post) history.push("/");

  useEffect(() => {
    if (post) {
      setImage(post.image);
      setTitle(post.title);
      setBody(post.body);
      setCategory(post.CategoryId);
    }
  }, [post, dispatch]);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    dispatch(updatePost({ id, image, title, body, CategoryId: category }));
  };

  useEffect(() => {
    if (status === "succeeded") history.push(`/article/${post.id}`);
  }, [status, dispatch, history, post]);

  useEffect(() => {
    return () => {
      dispatch(resetPostStatus());
    };
  }, [dispatch]);

  return (
    <Main>
      <Wrapper>
        <ArticleBlock>
          <H1 className={"title"}>編輯文章</H1>
          {post && (
            <>
              <FileInput
                value={image}
                handleImage={(value) => setImage(value)}
              />
              <Wrapper $small className={"content"}>
                <Form onSubmit={handleOnSubmit}>
                  <Input
                    title="標題"
                    type="text"
                    name="title"
                    value={title}
                    handleOnChange={(value) => setTitle(value)}
                    alert={status === "failed"}
                    required
                  />
                  <Select
                    title={"類別"}
                    name={"category"}
                    options={categories.map(({ text, id }) => {
                      return { text, value: id };
                    })}
                    value={category}
                    handleValue={(value) => setCategory(value)}
                    alert={status === "failed"}
                    required
                  />
                  <Textarea
                    title="內文"
                    name="body"
                    value={body}
                    handleOnChange={(value) => setBody(value)}
                    alert={status === "failed"}
                    required
                  />
                  <H7 $error>{error}</H7>
                  <Button>修改完成！</Button>
                </Form>
              </Wrapper>
            </>
          )}
        </ArticleBlock>
      </Wrapper>
    </Main>
  );
}
