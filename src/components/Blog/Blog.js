import Navbar from "../Navbar";
import HomePage from "../../page/HomePage";
import ListPage from "../../page/ListPage";
import ArticlePage from "../../page/ArticlePage";
import AboutPage from "../../page/AboutPage";
import PostPage from "../../page/PostPage";
import LoginPage from "../../page/LoginPage";
import RegisterPage from "../../page/RegisterPage";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
  useHistory,
} from "react-router-dom";
import { useEffect, useRef } from "react";
import { selectUserStatus, verifyUser } from "../../redux/reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { getAuthToken } from "../../utils";
import EditPage from "../../page/EditPage";
import { Loading } from "../Loader";
import { getPosts, selectPostStatus } from "../../redux/reducers/postReducer";
import { Footer } from "../Footer";
import PropTypes from "prop-types";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const status = useSelector(selectUserStatus);
  const history = useHistory();
  if (status === "succeeded")
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  if (status === "logout") history.goBack();
  return null;
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
};

const PublicOnlyRoute = ({ component: Component, ...rest }) => {
  const status = useSelector(selectUserStatus);
  const history = useHistory();
  if (status === "logout" || status === "failed")
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  if (status === "succeeded") history.goBack();
  return null;
};

PublicOnlyRoute.propTypes = {
  component: PropTypes.func,
};

export default function Blog() {
  const dispatch = useDispatch();
  const postStatus = useSelector(selectPostStatus);
  const userStatus = useSelector(selectUserStatus);
  const isPost = useRef(false);
  useEffect(() => {
    getAuthToken();
    dispatch(verifyUser({ goal: "verify" }));
  }, [dispatch]);

  useEffect(() => {
    if (!isPost.current) {
      dispatch(getPosts());
      isPost.current = true;
    }
  }, [dispatch]);

  return (
    <>
      <Router>
        <ScrollToTop />
        <Navbar />
        {postStatus === "loading" || userStatus === "loading" ? (
          <Loading />
        ) : (
          <Switch>
            <Route render={(props) => <HomePage {...props} />} exact path="/" />
            <Route
              render={(props) => <ListPage {...props} />}
              exact
              path="/list/:page"
            />
            <Redirect exact from="/list" to="/list/1" />
            <Route
              render={(props) => <ArticlePage {...props} />}
              exact
              path="/article-:id"
            />
            <Route
              render={(props) => <AboutPage {...props} />}
              exact
              path="/about"
            />
            <PrivateRoute component={PostPage} exact path="/post" />
            <PrivateRoute component={EditPage} exact path="/edit-:id" />
            <PublicOnlyRoute component={LoginPage} exact path="/login" />
            <PublicOnlyRoute component={RegisterPage} exact path="/register" />
          </Switch>
        )}
        <Footer />
      </Router>
    </>
  );
}
