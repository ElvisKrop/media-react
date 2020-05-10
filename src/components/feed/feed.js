import React, { useState, useEffect, useCallback } from "react";
import { withService } from "../../hocs";
import { Link } from "react-router-dom";
import UserIcon from "../userIcon";
import { ButtonLike } from "../buttons/index";
import "./feed.css";

function Feed({ mrService, str }) {
  const [data, setDataArticle] = useState([]);
  const [articlesCount, setCountArticle] = useState(0);

  const getRequest = useCallback(() => {
    switch (str) {
      case "YourFeed":
        return mrService.getArticlesByFollow().then((data) => setData(data));
      case "GlobalFeed":
        return mrService.getArticlesAll().then((data) => setData(data));
      case "TagFeed":
        return mrService.getArticlesByTag().then((data) => setData(data));
      case "MyPosts":
        return mrService.getUserArticles().then((data) => setData(data));
      case "FavoritedPost":
        return mrService.getArticlesByFavorited().then((data) => setData(data));
      default:
        return [];
    }

    function setData(data) {
      setDataArticle(data.articles);
      setCountArticle(data.articlesCount);
    }
  }, []);

  useEffect(() => {
    getRequest();
  }, [getRequest]);

  function OtherContent({ data: { title, description, tagList, slug } }) {
    return (
      <Link
        className="text-decoration-none d-flex justify-content-between"
        to={`/article/${slug}`}
      >
        <div>
          <h5 className="font-weight-bold mb-1">{title}</h5>
          <p className="card-text text-muted mb-3">{description}</p>
          <span className="text-gray">Read more...</span>
        </div>
        <ul className="tag-list text-gray w-50">
          {tagList.map((item, slug) => {
            return <li key={slug}>{item}</li>;
          })}
        </ul>
      </Link>
    );
  }

  return data.map((item) => {
    const {
      title,
      slug,
      createdAt,
      tagList,
      description,
      favorited,
      favoritesCount,
      author,
    } = item;
    const { username, image } = author;

    return (
      <div className="card-body border-top mb-1 text-left" key={slug}>
        <div className="d-flex justify-content-between">
          <UserIcon data={{ image, username, createdAt }} />
          <ButtonLike data={{ favoritesCount, favorited, slug }} />
        </div>
        <OtherContent data={{ title, description, tagList, slug }} />
      </div>
    );
  });

  function Pagination() {}
}

export default withService()(Feed);
