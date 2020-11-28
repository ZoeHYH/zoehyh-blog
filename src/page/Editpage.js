import { Input } from "../components/Input";
import { Page } from "../components/Page";
import { FormPage } from "../components/Form";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { ErrorMessage } from "../components/ErrorMessage";
import {
  getPost,
  selectIsLoadingPost,
  selectPost,
  setIsLoadingPost,
  updatePost,
} from "../redux/reducers/postReducer";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLogin } from "../redux/reducers/userReducer";
import { Loading } from "../components/Loader";

export default function EditPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const post = useSelector(selectPost);
  const [errorMessage, setErrorMessage] = useState(null);
  const isLogin = useSelector(selectIsLogin);
  const isLoading = useSelector(selectIsLoadingPost);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);
  useEffect(() => {
    console.log(post);
    setTitle(post[0].title);
    setBody(post[0].body);
  }, [post]);
  const handleOnSubmit = (event) => {
    if (!isLogin) return history.push("/");
    dispatch(updatePost(id, title, body)).then((data) => {
      dispatch(setIsLoadingPost(false));
      if (data.ok === 0) return setErrorMessage(data.message);
      history.push(`/article-${data.id}`);
    });
    event.preventDefault();
  };
  return (
    <Page>
      {isLoading && <Loading />}
      <ErrorMessage>{errorMessage}</ErrorMessage>
      {post && (
        <FormPage onSubmit={handleOnSubmit}>
          <Input
            content="標題"
            type="text"
            name="title"
            alert={errorMessage ? true : false}
            value={title}
            handleOnChange={(value) => setTitle(value)}
          />
          <Input
            content="內文"
            type="textarea"
            name="body"
            alert={errorMessage ? true : false}
            value={body}
            handleOnChange={(value) => setBody(value)}
          />
          <Button>修改</Button>
        </FormPage>
      )}
    </Page>
  );
}
