import React from "react";
import { ButtonFollow } from "../../../components/buttons/index";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function UserBanner({ image, bio, username, following, userStore }) {
  function renderButton() {
    if (username === userStore) {
      return (
        <Link to="/settings">
          <button type="button" className="btn-follow">
            <i className="fas fa-cog pr-1"></i>
            <span>Edit Profile Settings</span>
          </button>
        </Link>
      );
    } else {
      return (
        <ButtonFollow
          profile={{ username, following }}
          className="float-right"
        />
      );
    }
  }

  return (
    <div className="container">
      <div className="col-xs-12 col-md-10 m-auto w-100 overflow-hidden">
        <img src={image} alt={username} className="img-profile" />
        <h4 className="font-weight-bold ">{username}</h4>
        <p className="text-muted">{bio}</p>
        <div className="text-right">{renderButton()}</div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ user }) => ({
  userStore: user.username
});
UserBanner.propTypes = {
  image: PropTypes.string,
  bio: PropTypes.string,
  username: PropTypes.string,
  following: PropTypes.bool,
  userStore: PropTypes.string
};

export default connect(mapStateToProps)(UserBanner);
