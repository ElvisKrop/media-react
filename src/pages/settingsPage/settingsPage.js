import React, { useEffect } from "react";
import SettingsForm from "./settingsForm";
import { withService } from "../../hocs";
import { connect } from "react-redux";
import { Actions } from "../../redux-store";
import ErrorList from "../../components/errorList/errorList";
import Spinner from "../../components/spinner";

const SettingsPage = ({
  mrService,
  clearErrors,
  errors,
  loading,
  userLoading,
  userUpdate,
  userLoadFail,
  ...forUserLoad
}) => {
  useEffect(() => {
    new Promise((resolve, reject) => {
      if (!Object.keys(errors).length) reject();
      setTimeout(resolve, 5000);
    })
      .then(() => clearErrors())
      .catch(() => {});
  }, [errors, clearErrors]);

  const sendForm = (e, userNew) => {
    e.preventDefault();
    userLoading();
    mrService
      .putUserUpdate(userNew)
      .then(({ user }) => userUpdate(user))
      .catch(({ errors }) => userLoadFail(errors));
  };

  const load = loading && !Object.keys(errors).length ? <Spinner /> : null;

  return (
    <>
      <SettingsForm {...forUserLoad} sendForm={sendForm} />
      <ErrorList errors={errors} />
      {load}
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
