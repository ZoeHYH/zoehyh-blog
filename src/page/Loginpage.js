import { FormCard } from "../components/Form";
import { ErrorMessage } from "../components/ErrorMessage";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { PageCenter } from "../components/Page";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  selectUserIsLoading,
  selectUserStatus,
  selectUserError,
  verifyUser,
} from "../redux/reducers/userReducer";
import { getAuthToken, setAuthToken } from "../utils";
import { Loading } from "../components/Loader";

export default function LoginPage() {
  const dispatch = useDispatch();
  const status = useSelector(selectUserStatus);
  const isLoading = useSelector(selectUserIsLoading);
  const errorMessage = useSelector(selectUserError);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const handleOnSubmit = (event) => {
    event.preventDefault();
    dispatch(verifyUser({ goal: "login", username, password }));
    if (status.login === "suceeded") return history.push("/");
    if (getAuthToken()) setAuthToken(null);
  };
  return (
    <PageCenter>
      {isLoading && <Loading />}
      <ErrorMessage>
        {status.login === "failed" ? errorMessage : ""}
      </ErrorMessage>
      <FormCard onSubmit={handleOnSubmit}>
        <Input
          content="帳號"
          type="text"
          name="username"
          alert={status.login === "failed"}
          value={username}
          handleOnChange={(value) => setUsername(value)}
        ></Input>
        <Input
          content="密碼"
          type="password"
          name="password"
          alert={status.login === "failed"}
          value={password}
          handleOnChange={(value) => setPassword(value)}
        ></Input>
        <Button>登入</Button>
      </FormCard>
    </PageCenter>
  );
}
