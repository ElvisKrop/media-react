import React, { useState, useEffect } from "react";
import SettingsForm from "./settingsForm";
import { withService } from "../../hocs";
import { connect } from "react-redux";
import { Actions } from "../../redux-store";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import ErrorList from "../../components/errorList/errorList";

const SettingsPage = ({
  mrService,
  errors,
  user,
  userUpdate,
  userLoadFail,
  clearErrors,
  ...forUserLoad
}) => {
  const [checkingSendData, setCheckingSendData] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    clearErrors();
  }, [clearErrors]);

  const sendForm = (e, newUser) => {
    e.preventDefault();
    setError(false);
    mrService
      .putUserUpdate(newUser)
      .then(({ user }) => {
        userUpdate(user);
        setCheckingSendData(true);
      })
      .catch(({ errors }) => {
        setError(true);
        userLoadFail(errors);
      });
  };

  if (!error && checkingSendData) {
    return <Redirect to={`/profile/${user.username}`} />;
  }

  return (
    <div className="container">
      <div className="col-lg-6 col-sm-10 col-11 mt-5 m-auto">
        <h1 className="my-4 text-center">Your Settings</h1>
        <ErrorList errors={errors} />
        <SettingsForm {...{ user, ...forUserLoad, sendForm }} />
      </div>
    </div>
  );
};

const mapStateToProps = ({ user, errors }) => ({
  user,
  errors
});

const mapDispatchToProps = (dispatch) => ({
  userLogOut: () => dispatch(Actions.userLogOut()),
  userUpdate: (user) => dispatch(Actions.userUpdate(user)),
  userLoadFail: (errors) => dispatch(Actions.userLoadFail(errors)),
  clearErrors: () => dispatch(Actions.clearErrors())
});

SettingsPage.propTypes = {
  mrService: PropTypes.object,
  errors: PropTypes.object,
  user: PropTypes.object,
  userUpdate: PropTypes.func,
  userLoadFail: PropTypes.func,
  clearErrors: PropTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withService()(SettingsPage));
