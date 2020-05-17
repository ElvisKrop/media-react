import React, { useState, useEffect } from "react";
import { withService, withToken } from "../../hocs";
import { Link } from "react-router-dom";
import "./buttons.css";

function ButtonLike({ mrService, isToken, data, onChange }) {
  const { favoritesCount, favorited, slug, text = "" } = data;

  const [like, setLike] = useState(favorited);
  const [likeCount, setLikeCount] = useState(favoritesCount);
  /*   const [loading, setLoading] = useState(false); */

  useEffect(() => {
    setLike(favorited);
    setLikeCount(favoritesCount);
  }, [favorited, favoritesCount]);

  function toggleFavorited(slug) {
    /* setLoading(true); */
    if (!like) {
      mrService
        .postFavorited(slug)
        .then(updateFavorited)
        .catch((error) => console.error(error));
    } else {
      mrService
        .deleteFavorited(slug)
        .then(updateFavorited)
        .catch((error) => console.error(error));
    }
  }

  function updateFavorited(article) {
    setLike(article.favorited);
    setLikeCount(article.favoritesCount);
    /* setLoading(false); */
    if (text) onChange();
  }

  let className = "btn-like";
  let textForLike = text;
  if (text) textForLike = ` F${text} `;

  if (like) {
    className += " bg-primary text-white";
    if (text) textForLike = ` Unf${text} `;
  }

  if (isToken) {
    return (
      <button
        type="button"
        className={className}
        onClick={() => toggleFavorited(slug)}
      >
        <i className="fas fa-heart" />
        <span>
          {textForLike}
          {likeCount}
        </span>
      </button>
    );
  }

  return (
    <Link to="/login">
      <button type="button" className={className}>
        <i className="fas fa-heart" />
        <span>
          {textForLike}
          {likeCount}
        </span>
      </button>
    </Link>
  );
}

export default withService()(withToken(ButtonLike));
