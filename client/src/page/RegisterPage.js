import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useHistory } from "react-router-dom";
import {
  selectUserStatus,
  selectUserError,
  verifyUser,
  resetUserStatus,
} from "../redux/reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { setAuthToken } from "../utils";
import { ArticleBlock, Group, Form, Main, Wrapper } from "../components/Layout";
import { H1, H7 } from "../components/Text";
import { StyledLink } from "../components/Link";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const status = useSelector(selectUserStatus);
  const error = useSelector(selectUserError);
  const [nickname, setNickname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleOnSubmit = (event) => {
    event.preventDefault();
    dispatch(verifyUser({ goal: "register", nickname, username, password }));
  };

  useEffect(() => {
    if (status === "succeeded") return history.push("/");
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
            <H1 className={"title"}>註冊部落格</H1>
            <Form className={"content"} onSubmit={handleOnSubmit}>
              <Input
                title="暱稱"
                type="text"
                name="nickname"
                placeholder={"取一個暱稱吧"}
                value={nickname}
                handleOnChange={(value) => setNickname(value)}
                alert={status === "failed"}
                required
              />
              <Input
                title="帳號"
                type="text"
                name="username"
                placeholder={"設定帳號"}
                value={username}
                handleOnChange={(value) => setUsername(value)}
                alert={status === "failed"}
                required
              />
              <Input
                title="密碼"
                type="password"
                name="password"
                placeholder={"設定密碼"}
                value={password}
                handleOnChange={(value) => setPassword(value)}
                alert={status === "failed"}
                required
              />
              <H7 $error>{status === "failed" && error}</H7>
              <Group>
                <Button>註冊</Button>
                <StyledLink to={"/login"} $text>
                  登入
                </StyledLink>
              </Group>
            </Form>
          </Wrapper>
        </ArticleBlock>
      </Wrapper>
    </Main>
  );
}
