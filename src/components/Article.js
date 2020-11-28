import styled from "styled-components";
import { COLOR, DISTENCE, EFFECT, FONT } from "../constants/style";
import PropTypes from "prop-types";
import { Link, useHistory, useLocation } from "react-router-dom";
import { ButtonLink, Nav } from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, setIsLoadingPost } from "../redux/reducers/postReducer";
import { selectIsLogin } from "../redux/reducers/userReducer";

const ArticleContainer = styled.div`
  color: ${COLOR.primary};
  padding: ${DISTENCE.xs};
  max-width: 600px;
  margin: 0 auto;
  & + & {
    border-top: 1px solid ${COLOR.primaryDark + "30"};
  }
  & h3 {
    color: ${COLOR.primaryDark};
    font-size: ${FONT.md};
    font-weight: bold;
    margin: 5px 0;
    ${(prop) => (prop.$center ? "text-align: center;" : "")}
  }
  & p {
    font-size: ${FONT.sm};
    margin: 5px 0;
    letter-spacing: 2px;
    white-space: pre-line;
    word-break: break-all;
  }
`;

const ArticleHoverContainer = styled(ArticleContainer)`
  display: block;
  text-decoration: none;
  &:hover {
    box-shadow: ${EFFECT.shadowDark};
  }
`;

const ArticleBar = styled.div`
  font-size: ${FONT.xs};
  background: ${COLOR.primary + "20"};
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & span {
    margin: 5px 0;
  }
`;

function ArticleFunction({ $id }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLogin = useSelector(selectIsLogin);
  const handleDelete = () => {
    if (!isLogin) return;
    dispatch(deletePost($id)).then((data) => {
      dispatch(setIsLoadingPost(false));
      if (data.ok === 0) return;
      history.push("/");
    });
  };
  return (
    <div>
      <Nav to={`/edit-${$id}`} isExact={true} label={"編輯"} />
      <span onClick={handleDelete}>
        <ButtonLink isActive={false} content={"刪除"} />
      </span>
    </div>
  );
}

function ArticleContent({ post, paragraph }) {
  const location = useLocation();
  const isLogin = useSelector(selectIsLogin);
  const isShow = location.pathname !== "/about" && isLogin;
  return (
    <>
      <h3>{post.title}</h3>
      <ArticleBar>
        <span>{new Date(post.createdAt).toLocaleString()}</span>
        {isShow && <ArticleFunction $id={post.id} />}
      </ArticleBar>
      {paragraph && <p>{post.body}</p>}
    </>
  );
}

export function Article({ post, hover, $center, paragraph }) {
  if (hover)
    return (
      <ArticleHoverContainer
        as={Link}
        to={`/article-${post.id}`}
        $center={$center}
      >
        <ArticleContent post={post} paragraph={paragraph} />
      </ArticleHoverContainer>
    );
  return (
    <ArticleContainer $center={$center}>
      <ArticleContent post={post} paragraph={paragraph} />
    </ArticleContainer>
  );
}

Article.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    createdAt: PropTypes.number,
    id: PropTypes.number,
  }),
  hover: PropTypes.bool,
  $center: PropTypes.bool,
  paragraph: PropTypes.bool,
};
ArticleContent.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    createdAt: PropTypes.number,
    id: PropTypes.number,
  }),
  paragraph: PropTypes.bool,
};
ArticleFunction.propTypes = {
  $id: PropTypes.number,
};
