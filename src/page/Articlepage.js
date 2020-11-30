import { useHistory, useParams } from "react-router-dom";
import { Article } from "../components/Article";
import { Page } from "../components/Page";
import {
  getPost,
  selectIsLoadingPost,
  selectPost,
} from "../redux/reducers/postReducer";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../components/Loader";
import { useEffect } from "react";

export default function ArticlePage() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoadingPost);
  const post = useSelector(selectPost);
  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);
  useEffect(() => {
    if (post && post.length === 0) history.push("/");
  }, [post, history]);
  return (
    <Page>
      {isLoading && <Loading />}
      {post && (
        <Article post={post[0]} hover={false} $center={true} paragraph={true} />
      )}
    </Page>
  );
}
