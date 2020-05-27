import React, { useEffect } from "react";
import { withToken } from "../../hocs";
import "./signInUp.scss";
import Spinner from "../../components/spinner";
import { Actions } from "../../redux-store";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import ErrorList from "../../components/errorList/errorList";
import SignForm from "./signInUpComponents";

const SignInUp = ({
  type,
  isToken,
  errors,
  loading,
  clearErrors,
  ...forUserLoad
}) => {
  useEffect(() => {
    clearErrors();
  }, [type, clearErrors]);

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
        throw new Error("type of sign_IN_UP is not valid");
    }
  })(type);

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
        <div className="col-lg-6 col-sm-10 col-11 mt-5">
          <div className="text-center">
            <h1>Sign {settings.head}</h1>
            <Link to={`/${settings.linkTo}`}>
              {settings.linkWord} an account?
            </Link>
          </div>
          <ErrorList errors={errors} />
          <SignForm {...{ settings, ...forUserLoad }} />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ errors, loading }) => ({
  errors,
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
)(withToken(SignInUp));
