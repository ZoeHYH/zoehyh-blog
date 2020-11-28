import { useParams } from "react-router-dom";
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

export default function Articlepage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoadingPost);
  const post = useSelector(selectPost);
  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);
  return (
    <Page>
      {isLoading && <Loading />}
      {post && (
        <Article post={post[0]} hover={false} $center={true} paragraph={true} />
      )}
    </Page>
  );
}
