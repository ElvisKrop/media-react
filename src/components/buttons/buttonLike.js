import React, { useState } from "react";
import { withService, withToken } from "../../hocs";
import { Link } from "react-router-dom";
import "./buttons.css";

function ButtonLike({ mrService, isToken, data }) {
  const { favoritesCount, favorited, slug, text = "" } = data;

  const [like, setLike] = useState(favorited);
  const [likeCount, setLikeCount] = useState(favoritesCount);

  function toggleFavorited(slug) {
    if (!like) {
      mrService
        .postFavorited(slug)
        .then(updateFavorited)
        .catch((error) => console.log(error));
      // TODO обработать ошибки, как нибудь
    } else {
      mrService
        .deleteFavorited(slug)
        .then(updateFavorited)
        .catch((error) => console.log(error));
      // TODO обработать ошибки, как нибудь
    }
  }

  function updateFavorited(data) {
    console.log(data.article.favorited);
    setLike(data.article.favorited);
    setLikeCount(data.article.favoritesCount);
  }

  let className = "btn btn-outline-primary b-like";

  if (like) {
    className += " bg-primary text-white";
  }

  if (isToken) {
    return (
      <button
        type="button"
        className={className}
        onClick={() => toggleFavorited(slug)}
      >
        <i className="fas fa-heart">
          {text}
          {likeCount}
        </i>
      </button>
    );
  }

  return (
    <Link to="/login">
      <button type="button" className={className}>
        <i className="fas fa-heart">
          {text}
          {favoritesCount}
        </i>
      </button>
    </Link>
  );
}

export default withService()(withToken(ButtonLike));
