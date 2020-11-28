import Header from "../Header";
import Homepage from "../../page/Homepage";
import Listpage from "../../page/Listpage";
import Articlepage from "../../page/Articlepage";
import Aboutpage from "../../page/Aboutpage";
import Postpage from "../../page/Postpage";
import Editpost from "../../page/Editpage";
import Loginpage from "../../page/Loginpage";
import Registerpage from "../../page/Registerpage";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useEffect } from "react";
import { getUser, selectIsLogin } from "../../redux/reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { getAuthToken } from "../../utils";

export default function Blog() {
  const dispatch = useDispatch();
  const isLogin = useSelector(selectIsLogin);
  useEffect(() => {
    if (getAuthToken()) dispatch(getUser());
  }, [dispatch]);
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/list">
          <Redirect to="/list/1" />
        </Route>
        <Route exact path="/list/:page">
          <Listpage />
        </Route>
        <Route exact path="/article-:id">
          <Articlepage />
        </Route>
        <Route exact path="/about">
          <Aboutpage />
        </Route>
        <Route exact path="/post">
          {isLogin ? <Postpage /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/edit-:id">
          {isLogin ? <Editpost /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/login">
          {!isLogin ? <Loginpage /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/register">
          {!isLogin ? <Registerpage /> : <Redirect to="/" />}
        </Route>
      </Switch>
    </Router>
  );
}
