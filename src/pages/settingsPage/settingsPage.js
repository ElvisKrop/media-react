import React, { useState, useEffect } from "react";
import SettingsForm from "./settingsForm";
import { withService } from "../../hocs";
import { connect } from "react-redux";
import { Actions } from "../../redux-store";
import { Redirect } from "react-router-dom";
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
    <>
      <SettingsForm {...{ user, ...forUserLoad }} sendForm={sendForm} />
      <ErrorList errors={errors} />
    </>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withService()(SettingsPage));
