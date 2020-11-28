import { useEffect } from "react";
import { Page } from "../components/Page";
import { Article } from "../components/Article";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../components/Loader";
import {
  getPosts,
  selectIsLoadingPost,
  selectPosts,
} from "../redux/reducers/postReducer";

export default function HomePage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoadingPost);
  const posts = useSelector(selectPosts);
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  return (
    <Page>
      {isLoading && <Loading />}
      {posts &&
        posts.map((post) => (
          <Article
            key={post.id}
            post={post}
            hover={true}
            $center={false}
            paragraph={false}
          ></Article>
        ))}
    </Page>
  );
}
