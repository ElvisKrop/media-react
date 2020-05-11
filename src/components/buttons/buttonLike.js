import React, { useState } from "react";
import { withService, withToken } from "../../hocs";
import { Link } from "react-router-dom";
import MiniSpinner from "../mini-spinner";
import "./buttons.css";

function ButtonLike({ mrService, isToken, data }) {
  const { favoritesCount, favorited, slug, text = "" } = data;

  const [like, setLike] = useState(favorited);
  const [likeCount, setLikeCount] = useState(favoritesCount);
  const [loading, setLoading] = useState(false);

  function toggleFavorited(slug) {
    setLoading(true);
    if (!like) {
      mrService
        .postFavorited(slug)
        .then(updateFavorited)
        .catch((error) => console.error(error));
      // TODO обработать ошибки, как нибудь
    } else {
      mrService
        .deleteFavorited(slug)
        .then(updateFavorited)
        .catch((error) => console.error(error));
      // TODO обработать ошибки, как нибудь
    }
  }

  function updateFavorited(article) {
    setLike(article.favorited);
    setLikeCount(article.favoritesCount);
    setLoading(false);
  }

  let className = "btn-like";

  if (like) {
    className += " bg-primary text-white";
  }

  if (loading) {
    return (
      <button type="button" className={className}>
        <MiniSpinner />
      </button>
    );
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
