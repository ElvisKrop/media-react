import React, { useState, useCallback, useEffect } from "react";
import { withService } from "../../hocs";

const SignForm = ({
  settings,
  mrService,
  userLoadFail,
  userLoaded,
  userLoading
}) => {
  const [username, setUsername] = useState("");
  //TODO In production mode: delete default values
  const [email, setEmail] = useState("loginloginlogin@mail.com");
  const [password, setPassword] = useState("loginloginlogin_pass_12345");

  const makeBlank = useCallback(() => {
    setUsername("");
    setEmail("");
    setPassword("");
  }, []);

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
  );
};

export default withService()(SignForm);
