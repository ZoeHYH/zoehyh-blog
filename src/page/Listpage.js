import { useEffect } from "react";
import { Article } from "../components/Article";
import { Page } from "../components/Page";
import { useParams } from "react-router-dom";
import { Nav, Pagination } from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../components/Loader";
import { LIST_LIMIT } from "../constants/varaible";
import {
  getPosts,
  selectIsLoadingPost,
  selectPages,
  selectPosts,
} from "../redux/reducers/postReducer";

export default function ListPage() {
  let { page } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoadingPost);
  const posts = useSelector(selectPosts);
  const pages = useSelector(selectPages);
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  return (
    <Page>
      {isLoading && <Loading />}
      {posts &&
        posts
          .slice((page - 1) * LIST_LIMIT, page * LIST_LIMIT)
          .map((post) => (
            <Article
              key={post.id}
              post={post}
              hover={true}
              $center={false}
              paragraph={true}
            />
          ))}
      <Pagination>
        {posts &&
          pages &&
          new Array(pages).fill("").map((item, index) => {
            return (
              <Nav
                key={index}
                to={`/list/${index + 1}`}
                isExact={false}
                label={`${index + 1}`}
              />
            );
          })}
      </Pagination>
    </Page>
  );
}
