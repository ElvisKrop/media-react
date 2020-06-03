import React from "react";
import { Link } from "react-router-dom";
import { withService } from "../../hocs";
import "./buttons.scss";
import PropTypes from "prop-types";

const DeleteArticle = ({ mrService, slug }) => {
  const onDeleteArt = () => {
    mrService.deleteArticle(slug).catch(console.error);
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

DeleteArticle.propTypes = {
  mrService: PropTypes.object,
  slug: PropTypes.string
};

export default withService()(DeleteArticle);
