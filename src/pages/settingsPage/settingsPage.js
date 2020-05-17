import React, { useState, useEffect } from "react";
import SettingsForm from "./settingsForm";
import { withService } from "../../hocs";
import { connect } from "react-redux";
import { Actions } from "../../redux-store";
import { Redirect } from "react-router-dom";
import ErrorList from "../../components/errorList/errorList";
import Spinner from "../../components/spinner";

const SettingsPage = ({
  mrService,
  clearErrors,
  errors,
  loading,
  user,
  userLoading,
  userUpdate,
  userLoadFail,
  ...forUserLoad
}) => {
  const [checkingSendData, setCheckingSendData] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    new Promise((resolve, reject) => {
      if (!Object.keys(errors).length) reject();
      setTimeout(resolve, 5000);
    })
      .then(() => clearErrors())
      .catch(() => {});
  }, [errors, clearErrors]);

  const sendForm = (e, newUser) => {
    e.preventDefault();
    userLoading();
    mrService
      .putUserUpdate(newUser)
      .then(({ user }) => userUpdate(user))
      .catch(({ errors }) => {
        userLoadFail(errors);
        setError(true);
      })
      .finally(() => setCheckingSendData(true));
  };

  // если нету ошибок и данные отправлены, то выполнить редирект
  if (!error && checkingSendData) {
    return <Redirect to={`/profile/${user.username}`} />;
  }

  return (
    <>
      <SettingsForm {...{ user, ...forUserLoad }} sendForm={sendForm} />
      <ErrorList errors={errors} />
      {!Object.keys(errors).length && loading ? <Spinner /> : null}
    </>
  );
};

const mapStateToProps = ({ user, errors, loading }) => ({
  user,
  errors,
  loading
});

const mapDispatchToProps = (dispatch) => ({
  userLogOut: () => dispatch(Actions.userLogOut()),
  userLoading: () => dispatch(Actions.userLoading()),
  userUpdate: (user) => dispatch(Actions.userUpdate(user)),
  userLoadFail: (errors) => dispatch(Actions.userLoadFail(errors)),
  clearErrors: () => dispatch(Actions.clearErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withService()(SettingsPage));
