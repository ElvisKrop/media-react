import React from "react";
import { Link } from "react-router-dom";
import { withToken } from "../../hocs";
import { connect } from "react-redux";
import "./header.scss";

function NavPanel({ isToken, username, data: { burgerMenu, setburgerMenu } }) {
  const linkList = {
    privat: [
      ["/editor", "far fa-clipboard", "New Article"],
      ["/settings", "fas fa-cog", "Setting"],
      [`/profile/${username}`, "fas fa-user", username]
    ],
    public: [
      ["/login", "fas fa-sign-in-alt", "Sign in"],
      ["/register", "fas fa-sign-out-alt", "Sign up"]
    ],
    rest: [
      ["/", "fas fa-home", "Home"],
      ["/about_developers", "fas fa-users-cog", "About"]
    ]
  };

  function renderLink(arr) {
    return arr.map((item, index) => {
      return (
        <li
          key={index}
          className="nav-item text-shedow"
          onClick={() => setburgerMenu(false)}
        >
          <Link className="nav-link" to={item[0]}>
            <i className={`${item[1]} pr-1`} />
            <span>{item[2]}</span>
          </Link>
        </li>
      );
    });
  }

  const className = "toolbar nav pull-xs-right";

  return (
    <>
      <ul className={burgerMenu ? `${className} open` : className}>
        {renderLink(linkList.rest)}
        {isToken ? renderLink(linkList.privat) : renderLink(linkList.public)}
      </ul>
    </>
  );
}

const mapStateToProps = ({ user }) => ({
  username: user.username
});

export default connect(mapStateToProps)(withToken(NavPanel));
