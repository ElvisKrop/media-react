import React, { useState, useEffect, useCallback } from "react";
import { withService } from "../../hocs";
import Article from "./article";
import Pagination from "./pagination";
import Spinner from "../spinner";
import "./feed.css";

function Feed({ mrService, strFeed }) {
  const [data, setDataArticle] = useState([]);
  const [articlesCount, setCountArticle] = useState(0);
  const [currentPage, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const getRequest = useCallback(
    (page) => {
      switch (strFeed) {
        case "YourFeed":
          return mrService.getArticlesByFollow(page);
        case "GlobalFeed":
          return mrService.getArticlesAll(page);
        case "TagFeed":
          return mrService.getArticlesByTag(page, "butt");
        case "MyPosts":
          return mrService.getUserArticles(page);
        case "FavoritedPost":
          return mrService.getArticlesByFavorited(page);
        default:
          return [];
      }
    },
    [mrService, strFeed]
  );

  useEffect(() => {
    setLoading(true);
    getRequest(currentPage)
      .then((data) => setData(data))
      .catch((error) => console.error(error));
    // TODO обработать ошибки, как нибудь;
  }, [getRequest, currentPage]);

  function setData({ articles, articlesCount }) {
    setDataArticle(articles);
    setCountArticle(articlesCount);
    setLoading(false);
  }

  function switchingPage(page) {
    setPage(page);
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="col-md-9">
      <Article data={data} />
      <Pagination data={{ articlesCount, currentPage, switchingPage }} />
    </div>
  );
}

export default withService()(Feed);
