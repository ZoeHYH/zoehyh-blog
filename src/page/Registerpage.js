import { useState } from "react";
import { FormCard } from "../components/Form";
import { ErrorMessage } from "../components/ErrorMessage";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { PageCenter } from "../components/Page";
import { useHistory } from "react-router-dom";
import {
  selectUserIsLoading,
  selectUserStatus,
  selectUserError,
  verifyUser,
} from "../redux/reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { getAuthToken, setAuthToken } from "../utils";
import { Loading } from "../components/Loader";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const status = useSelector(selectUserStatus);
  const isLoading = useSelector(selectUserIsLoading);
  const errorMessage = useSelector(selectUserError);
  const [nickname, setNickname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const handleOnSubmit = (event) => {
    event.preventDefault();
    dispatch(verifyUser({ goal: "register", nickname, username, password }));
    if (status.register === "suceeded") return history.push("/");
    if (getAuthToken()) setAuthToken(null);
  };
  return (
    <PageCenter>
      {isLoading && <Loading />}
      <ErrorMessage>
        {status.register === "failed" ? errorMessage : ""}
      </ErrorMessage>
      <FormCard onSubmit={handleOnSubmit}>
        <Input
          content="暱稱"
          type="text"
          name="nickname"
          alert={status.register === "failed"}
          value={nickname}
          handleOnChange={(value) => setNickname(value)}
        ></Input>
        <Input
          content="帳號"
          type="text"
          name="username"
          alert={status.register === "failed"}
          value={username}
          handleOnChange={(value) => setUsername(value)}
        ></Input>
        <Input
          content="密碼"
          type="password"
          name="password"
          alert={status.register === "failed"}
          value={password}
          handleOnChange={(value) => setPassword(value)}
        ></Input>
        <Button>{"註冊"}</Button>
      </FormCard>
    </PageCenter>
  );
}
