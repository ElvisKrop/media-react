import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { withService } from "../../../hocs";
import { useUpgradeState } from "../../../hooks";

const SignForm = ({
  settings,
  mrService,
  userLoadFail,
  userLoaded,
  userLoading
}) => {
  const [username, setUsername] = useUpgradeState("", true);
  //TODO In production mode: delete default values
  const [email, setEmail] = useUpgradeState("new_human@mail.com", true);
  const [password, setPassword] = useUpgradeState("human_password_12345", true);

  const makeBlank = useCallback(() => {
    setUsername("");
    setEmail("");
    setPassword("");
  }, [setEmail, setPassword, setUsername]);

  useEffect(() => {
    // TODO In production mode: turn on this
    //   makeBlank();
  }, [makeBlank]);

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

  return (
    <form onSubmit={(e) => sendFormFields(e)}>
      <fieldset className="text-center">
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
  );
};

SignForm.propTypes = {
  settings: PropTypes.shape({
    isUsername: PropTypes.bool,
    head: PropTypes.string
  }),
  mrService: PropTypes.object,
  userLoadFail: PropTypes.func,
  userLoaded: PropTypes.func,
  userLoading: PropTypes.func
};

export default withService()(SignForm);
