import { useHistory, useParams } from "react-router-dom";
import {
  deletePost,
  getPost,
  resetPost,
  resetPostStatus,
  selectPost,
  selectPostById,
  selectPostStatus,
} from "../redux/reducers/postReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ArticleBlock, Main, Wrapper } from "../components/Layout";
import { Image } from "../components/Image";
import { H1, H4, H5 } from "../components/Text";
import { Button } from "../components/Button";
import { ArrowLink } from "../components/Link";
import { selectUserStatus } from "../redux/reducers/userReducer";

export default function ArticlePage() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const postById = useSelector((state) => selectPostById(state, id));
  const postByFetch = useSelector(selectPost);
  const postStatus = useSelector(selectPostStatus);
  const userStatus = useSelector(selectUserStatus);

  useEffect(() => {
    if (!postById && postStatus === "ready") dispatch(getPost(id));
  }, [postById, postStatus, dispatch, id]);

  const post = postById || postByFetch;

  const handleDelete = () => {
    if (userStatus === "succeeded") dispatch(deletePost(id));
  };

  useEffect(() => {
    if (postStatus !== "loading" && !post) history.push("/");
  }, [postStatus, post, history]);

  useEffect(() => {
    return () => {
      dispatch(resetPostStatus());
      dispatch(resetPost());
    };
  }, [dispatch]);

  return (
    <Main>
      <Wrapper>
        {post && (
          <ArticleBlock>
            <H5 $grey500>post</H5>
            <H1 className={"title"}>{post.title}</H1>
            <H5 $grey500 className={"info"}>
              {new Date(post.createdAt).toLocaleString()}
            </H5>
            <div className={"banner"}>
              <Image
                $height={"500px"}
                $image={"https://i.imgur.com/rPYnKjx.jpg"}
              />
            </div>
            <Wrapper $medium className={"content"}>
              <H4 as="p">
                {post.body}
                {userStatus === "succeeded" && (
                  <div className="group">
                    <Button $alert onClick={handleDelete}>
                      刪除
                    </Button>
                    <ArrowLink to={`/edit-${post.id}`} label={"編輯"} />
                  </div>
                )}
              </H4>
            </Wrapper>
          </ArticleBlock>
        )}
      </Wrapper>
    </Main>
  );
}
