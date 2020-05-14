import React from "react";
import { Link } from "react-router-dom";
import UserIcon from "../userIcon";
import { ButtonLike } from "../buttons/index";

function Article({ data }) {
  const {
    title,
    slug,
    createdAt,
    tagList,
    description,
    favorited,
    favoritesCount,
    author
  } = data;
  const { username, image } = author;
  const forUser = { image, username, createdAt };

  return (
    <div className="border-top mb-1 py-4 text-left">
      <div className="d-flex justify-content-between">
        <UserIcon {...forUser} />
        <ButtonLike data={{ favoritesCount, favorited, slug }} />
      </div>
      <Link
        className="text-decoration-none d-flex flex-wrap justify-content-between"
        to={`/article/${slug}`}
      >
        <div className="col-lg-7 w-100 overflow-hidden p-0">
          <h5 className="font-weight-bold mb-1">{title}</h5>
          <p className="card-text text-muted mb-3">{description}</p>
          <span className="text-gray">Read more...</span>
        </div>
        <ul className="tag-list text-gray col-lg-5 pt-3">
          {tagList.map((item, slug) => {
            return <li key={slug}>{item}</li>;
          })}
        </ul>
      </Link>
    </div>
  );
}

export default Article;
