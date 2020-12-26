import { useLocation, useHistory } from "react-router-dom";
import { HeaderWrapper, Wrapper, Container, Brand } from "./style";
import { Nav, ButtonLink } from "../Button";
import { setAuthToken } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUser,
  selectUserIsLoading,
  selectUserStatus,
  verifyUser,
} from "../../redux/reducers/userReducer";

export default function Header() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const isLogin = useSelector(selectUser);
  const isLoading = useSelector(selectUserIsLoading);
  const status = useSelector(selectUserStatus);
  const handleLogout = () => {
    setAuthToken("");
    dispatch(verifyUser({ goal: "verify" }));
    if (location.pathname === "/post") {
      history.push("/");
    }
  };
  return (
    <HeaderWrapper>
      <Wrapper>
        <Container>
          <Brand to="/">
            <ButtonLink isActive={true} content="ZoeHYH" />
          </Brand>
          <div>
            <Nav to="/list" isExact={false} label="文章列表" />
            <Nav to="/about" isExact={false} label="關於" />
            {status.verify !== "idle" && !isLoading && isLogin && (
              <>
                <Nav to="/post" isExact={true} label="發布文章" />
                <span onClick={handleLogout}>
                  <ButtonLink isActive={false} content="登出" />
                </span>
              </>
            )}
            {status.verify !== "idle" && !isLoading && !isLogin && (
              <>
                <Nav to="/login" isExact={true} label="登入" />
                <Nav to="/register" isExact={true} label="註冊" />
              </>
            )}
          </div>
        </Container>
      </Wrapper>
    </HeaderWrapper>
  );
}
