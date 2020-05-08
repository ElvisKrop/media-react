import React, { useState, useEffect } from "react";
import { withService } from "../../hocs";
import { Link } from "react-router-dom";
import UserIcon from "../userIcon";
import { ButtonLike } from "../buttons/index";
import "./feed.css";

function Feed({ mrService, str }) {
  const [data, setData] = useState([]);
  /* const [articlesCount, setCount] = useState(0); */

  useEffect(() => {
    if (str === "YourFeed") {
      mrService.getArticlesByFollow().then((data) => setData(data.articles));
    } else if (str === "GlobalFeed") {
      mrService.getArticlesAll().then((data) => setData(data.articles));
    } else if (str === "TagFeed") {
      mrService.getArticlesByTag().then((data) => setData(data.articles));
    } else if (str === "MyPosts") {
      mrService.getUserArticles().then((data) => setData(data.articles));
    } else if (str === "FavoritedPost") {
      mrService.getArticlesByFavorited().then((data) => setData(data.articles));
    }
  }, [mrService, str]);

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
}

export default withService()(Feed);
