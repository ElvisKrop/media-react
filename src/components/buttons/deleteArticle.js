import React from "react";
import { Link } from "react-router-dom";
import { withService } from "../../hocs";
import "./buttons.css";

const DeleteArticle = ({ mrService, slug }) => {
  const onDeleteArt = () => {
    mrService.deleteArticle(slug).catch((err) => console.error(err));
  };

  return (
    <Link to="/">
      <button className="btn-delete" onClick={onDeleteArt}>
        <i className="fas fa-trash"></i>
        &nbsp; Delete article
      </button>
    </Link>
  );
};

export default withService()(DeleteArticle);
