import { Input } from "../components/Input";
import { Page } from "../components/Page";
import { FormPage } from "../components/Form";
import { useState } from "react";
import { Button } from "../components/Button";
import { ErrorMessage } from "../components/ErrorMessage";
import { createPost, setIsLoading } from "../redux/reducers/postReducer";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, selectUserIsLoading } from "../redux/reducers/userReducer";
import { Loading } from "../components/Loader";

export default function PostPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const isLogin = useSelector(selectUser);
  const isLoading = useSelector(selectUserIsLoading);
  const handleOnSubmit = (event) => {
    if (!isLogin) return history.push("/");
    dispatch(createPost(title, body)).then((data) => {
      dispatch(setIsLoading(false));
      if (data.ok === 0) return setErrorMessage(data.message);
      history.push(`/article-${data.id}`);
    });
    event.preventDefault();
  };
  return (
    <Page>
      {isLoading && <Loading />}
      <ErrorMessage>{errorMessage}</ErrorMessage>
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
        <Button>發布</Button>
      </FormPage>
    </Page>
  );
}
