import React, { useState, useEffect, useCallback } from "react";
import { withService } from "../../hocs";
import Article from "./article";
import Pagination from "./pagination";
import Spinner from "../spinner";
import PropTypes from "prop-types";
import "./feed.scss";

function Feed({ mrService, strFeed, author = "", tagName = "" }) {
  const [data, setDataArticle] = useState([]);
  const [articlesCount, setCountArticle] = useState(0);
  const [currentPage, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPos, setCurrentPos] = useState(0);
  const [countClicks, setCountClicks] = useState(0);

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
    getRequest(currentPage, author, tagName)
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, [getRequest, currentPage, author, tagName]);

  useEffect(() => {
    setPage(0);
    setCurrentPos(0);
    setCountClicks(0);
  }, [strFeed, tagName]);

  function setData({ articles, articlesCount }) {
    setDataArticle(articles);
    setCountArticle(articlesCount);
    setLoading(false);
  }

  if (loading) return <Spinner />;

  return (
    <div>
      {data.map((item) => (
        <Article data={item} key={item.slug} />
      ))}
      <Pagination
        data={{
          articlesCount,
          currentPage,
          currentPos,
          countClicks,
          setPage,
          setCurrentPos,
          setCountClicks
        }}
      />
    </div>
  );
}

Feed.propTypes = {
  mrService: PropTypes.object,
  strFeed: PropTypes.string,
  author: PropTypes.string,
  tagName: PropTypes.string
};

export default withService()(Feed);
