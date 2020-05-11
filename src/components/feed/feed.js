import React, { useState, useEffect, useCallback } from "react";
import { withService } from "../../hocs";
import Article from "./article";
import Pagination from "./pagination";
import Spinner from "../spinner";
import "./feed.css";

function Feed({ mrService, strFeed, author = "" }) {
  const [data, setDataArticle] = useState([]);
  const [articlesCount, setCountArticle] = useState(0);
  const [currentPage, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const getRequest = useCallback(
    (page, author, tag) => {
      switch (strFeed) {
        case "YourFeed":
          return mrService.getArticlesByFollow(page);
        case "GlobalFeed":
          return mrService.getArticlesAll(page);
        case "TagFeed":
          return mrService.getArticlesByTag(page, tag);
        case "MyPosts":
          return mrService.getUserArticles(page, author);
        case "FavoritedPost":
          return mrService.getArticlesByFavorited(page, author);
        default:
          return [];
      }
    },
    [mrService, strFeed]
  );

  useEffect(() => {
    setLoading(true);
    getRequest(currentPage, author, "dragons")
      .then((data) => setData(data))
      .catch((error) => console.error(error));
    // TODO обработать ошибки, как нибудь;
  }, [getRequest, currentPage, author]);

  function setData({ articles, articlesCount }) {
    setDataArticle(articles);
    setCountArticle(articlesCount);
    setLoading(false);
  }

  if (loading) return <Spinner />;

  return (
    <div className="col-md-9 m-auto">
      <Article data={data} />
      <Pagination data={{ articlesCount, currentPage, setPage }} />
    </div>
  );
}

export default withService()(Feed);
