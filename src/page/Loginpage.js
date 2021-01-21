import { ArrowButton } from "../components/Button";
import { Input } from "../components/Input";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  selectUserStatus,
  selectUserError,
  verifyUser,
  resetUserStatus,
} from "../redux/reducers/userReducer";
import { setAuthToken } from "../utils";
import { H1, H7 } from "../components/Text";
import { ArticleBlock, Form, Main, Wrapper } from "../components/Layout";

export default function LoginPage() {
  const dispatch = useDispatch();
  const status = useSelector(selectUserStatus);
  const error = useSelector(selectUserError);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleOnSubmit = (event) => {
    event.preventDefault();
    dispatch(verifyUser({ goal: "login", username, password }));
  };

  useEffect(() => {
    if (status === "suceeded") return history.push("/");
    if (status === "failed") setAuthToken(null);
  }, [status, history]);

  useEffect(() => {
    return () => {
      if (status === "failed") dispatch(resetUserStatus());
    };
  }, [status, dispatch]);

  return (
    <Main>
      <Wrapper>
        <ArticleBlock>
          <Wrapper $small>
            <H1 className={"title"}>登入部落格</H1>
            <Form className={"content"} onSubmit={handleOnSubmit}>
              <Input
                title="帳號"
                type="text"
                name="username"
                placeholder={"輸入你的帳號吧"}
                value={username}
                handleOnChange={(value) => setUsername(value)}
                alert={status === "failed"}
                required
              ></Input>
              <Input
                title="密碼"
                type="password"
                name="password"
                placeholder={"輸入密碼"}
                value={password}
                handleOnChange={(value) => setPassword(value)}
                alert={status === "failed"}
                required
              ></Input>
              <H7 $error>{status === "failed" && error}</H7>
              <ArrowButton text={"登入"} />
            </Form>
          </Wrapper>
        </ArticleBlock>
      </Wrapper>
    </Main>
  );
}
