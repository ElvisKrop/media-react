import React, { useEffect, useCallback } from "react";
import { useUpgradeState } from "../../hooks";
import { withService } from "../../hocs";
import Article from "./article";
import Pagination from "./pagination";
import Spinner from "../spinner";
import PropTypes from "prop-types";
import "./feed.scss";

function Feed({ mrService, strFeed, author = "", tagName = "" }) {
  const [data, setDataArticle] = useUpgradeState([], !!strFeed);
  const [articlesCount, setCountArticle] = useUpgradeState(0, !!strFeed);
  const [currentPage, setPage] = useUpgradeState(0, !!strFeed);
  const [loading, setLoading] = useUpgradeState(false, !!strFeed);
  const [currentPos, setCurrentPos] = useUpgradeState(0, !!strFeed);
  const [countClicks, setCountClicks] = useUpgradeState(0, !!strFeed);

  const setData = useCallback(
    ({ articles, articlesCount }) => {
      setDataArticle(articles);
      setCountArticle(articlesCount);
      setLoading(false);
    },
    [setDataArticle, setCountArticle, setLoading]
  );

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
    getRequest(currentPage, author, tagName).then(setData).catch(console.error);
  }, [getRequest, currentPage, author, tagName, setLoading, setData]);

  useEffect(() => {
    setPage(0);
    setCurrentPos(0);
    setCountClicks(0);
  }, [strFeed, tagName, setCountClicks, setCurrentPos, setPage]);

  if (loading) return <Spinner />;
  else if (!Object.keys(data).length)
    return <h5 className="mt-5 text-center">No one article yet...</h5>;

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
