import { FormCard } from "../components/Form";
import { ErrorMessage } from "../components/ErrorMessage";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { PageCenter } from "../components/Page";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  login,
  selectIsLoadingUser,
  setIsLoadingUser,
} from "../redux/reducers/userReducer";
import { getAuthToken, setAuthToken } from "../utils";
import { Loading } from "../components/Loader";

export default function LoginPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoadingUser);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const history = useHistory();
  const handleOnSubmit = (event) => {
    dispatch(login(username, password)).then((data) => {
      dispatch(setIsLoadingUser(false));
      if (data.ok === 1) return history.push("/");
      if (getAuthToken()) setAuthToken(null);
      setErrorMessage(data.message);
    });
    event.preventDefault();
  };
  return (
    <PageCenter>
      {isLoading && <Loading />}
      <ErrorMessage>{errorMessage}</ErrorMessage>
      <FormCard onSubmit={handleOnSubmit}>
        <Input
          content="帳號"
          type="text"
          name="username"
          alert={errorMessage ? true : false}
          value={username}
          handleOnChange={(value) => setUsername(value)}
        ></Input>
        <Input
          content="密碼"
          type="password"
          name="password"
          alert={errorMessage ? true : false}
          value={password}
          handleOnChange={(value) => setPassword(value)}
        ></Input>
        <Button>登入</Button>
      </FormCard>
    </PageCenter>
  );
}
