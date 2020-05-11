import React, { useState, useEffect, useCallback } from "react";
import { withService, withToken } from "../../hocs";
import "./signInUp.css";
import Spinner from "../../components/spinner";
import { Actions } from "../../redux-store";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import ErrorList from "../../components/errorList/errorList";

const SignInUp = ({
  type,
  isToken,
  mrService,
  errors,
  user,
  loading,
  userLoaded,
  userLoading,
  clearErrors,
  userLoadFail
}) => {
  const [username, setUsername] = useState("");
  //TODO delete this in production version
  const [email, setEmail] = useState("loginloginlogin@mail.com");
  const [password, setPassword] = useState("loginloginlogin_pass_12345");

  const makeBlank = useCallback(() => {
    setUsername("");
    setEmail("");
    setPassword("");
  }, []);

  useEffect(() => {
    // TODO turn on in production
    //   makeBlank();
  }, [type, makeBlank]);

  useEffect(() => {
    new Promise((resolve, reject) => {
      if (!Object.keys(errors).length) reject();
      setTimeout(resolve, 5000);
    })
      .then(() => clearErrors())
      .catch(() => {});
  }, [errors, clearErrors]);

  const settings = ((type) => {
    switch (type) {
      case "login":
        return {
          head: "In",
          linkWord: "Need",
          linkTo: "register",
          isUsername: false
        };
      case "register":
        return {
          head: "Up",
          linkWord: "Have",
          linkTo: "login",
          isUsername: true
        };
      default:
        throw new Error("type of signIN_UP is not valid");
    }
  })(type);

  const sendFormFields = (event) => {
    event.preventDefault();
    userLoading();
    const user = {
      email,
      password
    };
    makeBlank();
    if (settings.isUsername) {
      user.username = username;
      mrService
        .postUserToRegister(user)
        .then(({ user }) => userLoaded(user))
        .catch(({ errors }) => userLoadFail(errors));
      return;
    }
    mrService
      .postUserToLogin(user)
      .then(({ user }) => userLoaded(user))
      .catch(({ errors }) => userLoadFail(errors));
  };

  // TODO errorlines(another component) for handling service errors
  if (isToken) return <Redirect to="/" />;
  if (loading && !Object.keys(errors).length)
    return (
      <div className="container d-flex wrapper">
        <Spinner />
      </div>
    );
  return (
    <>
      <div className="container d-flex wrapper">
        <div className="col-lg-6 col-sm-10 col-11 mt-5 text-center">
          <h1>Sign {settings.head}</h1>
          <Link to={`/${settings.linkTo}`}>
            {settings.linkWord} an account?
          </Link>
          <form onSubmit={(e) => sendFormFields(e)}>
            <fieldset>
              {settings.isUsername && (
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              )}
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Sign {settings.head}
              </button>
            </fieldset>
          </form>
        </div>
      </div>
      {Object.keys(errors).length ? <ErrorList errors={errors} /> : null}
    </>
  );
};

const mapStateToProps = ({ errors, user, loading }) => ({
  errors,
  user,
  loading
});

const mapDispatchToProps = (dispatch) => ({
  userLoaded: (user) => dispatch(Actions.userLoaded(user)),
  userLoading: () => dispatch(Actions.userLoading()),
  userLoadFail: (errors) => dispatch(Actions.userLoadFail(errors)),
  clearErrors: () => dispatch(Actions.clearErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withService()(withToken(SignInUp)));
