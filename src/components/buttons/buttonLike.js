import React, { useState, useEffect } from "react";
import { withService, withToken } from "../../hocs";
import { Link } from "react-router-dom";
import MiniSpinner from "../mini-spinner";
import "./buttons.scss";

function ButtonLike({ mrService, isToken, data, onChange }) {
  const { favoritesCount, favorited, loadLike, slug, text = "" } = data;
  const [like, setLike] = useState(favorited);
  const [likeCount, setLikeCount] = useState(favoritesCount);
  const [load, setLoad] = useState(loadLike);
  const [widthBtn, setWidthBtn] = useState(0);
  const ref = React.createRef();

  useEffect(() => {
    setLike(favorited);
    setLikeCount(favoritesCount);
    setLoad(loadLike);
  }, [favorited, favoritesCount, loadLike]);

  useEffect(() => {
    if (ref.current !== null) setWidthBtn(ref.current.offsetWidth);
  }, [ref]);

  function toggleFavorited(slug) {
    setLoad(true);
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
    if (onChange) onChange("like");
    setLoad(false);
  }

  let className = "btn-like";
  let textForLike = text;
  if (text) textForLike = ` F${text} `;

  if (like) {
    className += " bg-primary text-white";
    if (text) textForLike = ` Unf${text} `;
  }

  if (load) {
    return (
      <button
        type="button"
        className={className}
        style={{ minWidth: widthBtn + "px" }}
      >
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
        ref={ref}
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
