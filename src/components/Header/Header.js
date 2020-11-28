import { useLocation, useHistory } from "react-router-dom";
import { HeaderWrapper, Wrapper, Container, Brand } from "./style";
import { Nav, ButtonLink } from "../Button";
import { setAuthToken } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/reducers/userReducer";

export default function Header() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const isLogin = useSelector((store) => (store.user.user ? true : null));
  const handleLogout = () => {
    setAuthToken("");
    dispatch(setUser(null));
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
            {isLogin ? (
              <>
                <Nav to="/post" isExact={true} label="發布文章" />
                <span onClick={handleLogout}>
                  <ButtonLink isActive={false} content="登出" />
                </span>
              </>
            ) : (
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
