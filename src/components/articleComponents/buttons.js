import React from "react";
import { withToken } from "../../hocs";
import { Link } from "react-router-dom";

// TODO получить username из redux-store и сравнить с автором
const user = {
  username: "Winnerza"
};
const buttons = ({ isToken, settings, toggleFollow }) => {
  const { author, favorited, favoritesCount, slug } = settings;
  if (isToken) {
    if (user.username === author.username) {
      return (
        <div>
          <button className="btn btn-outline-secondary mx-2">
            <Link to={`/editor/${slug}`}>
              <i className="fas fa-pen"></i> &nbsp;Edit Article
            </Link>
          </button>
          <button className="btn btn-outline-success">
            <Link to="/">
              <i className="fas fa-trash"></i>
              &nbsp; Delete article
            </Link>
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button
            onClick={() => toggleFollow()}
            className="btn btn-outline-secondary mx-2">
            <i className="fas fa-plus"></i> &nbsp;Follow {author.username}
          </button>
          <button className="btn btn-outline-success">
            <i className="fas fa-heart"></i>
            &nbsp; Favorite Article ({favoritesCount})
          </button>
        </div>
      );
    }
  } else {
    return (
      <div>
        <button className="btn btn-outline-secondary mx-2">
          <Link to="/login">
            <i className="fas fa-plus"></i> &nbsp;Follow {author.username}
          </Link>
        </button>
        <button className="btn btn-outline-success">
          <Link to="/login">
            <i className="fas fa-heart"></i>
            &nbsp; Favorite Article ({favoritesCount})
          </Link>
        </button>
      </div>
    );
  }
};

export default withToken(buttons);
