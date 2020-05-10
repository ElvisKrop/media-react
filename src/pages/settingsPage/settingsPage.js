import React from "react";
import { connect } from "react-redux";
import { Actions } from "../../redux-store";

const SettingsPage = ({ userLogOut }) => {
  return (
    <div className="text-center">
      <button className="btn btn-danger" onClick={() => userLogOut()}>
        for test
      </button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  userLogOut: () => dispatch(Actions.userLogOut())
});

export default connect(null, mapDispatchToProps)(SettingsPage);
