import React from "react";
import { withService } from "../../hocs";
import "./signInUp.css";
import { Link } from "react-router-dom";

const SignInUp = ({ type }) => {
  const sendFormFields = (event) => {
    event.preventDefault();
    console.log(event);
  };

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

  return (
    <div className="container d-flex wrapper">
      <div className="col-lg-4 col-sm-10 col-11 mt-5 text-center">
        <h1>Sign {settings.head}</h1>
        <Link to={`/${settings.linkTo}`}>{settings.linkWord} an account?</Link>
        <form onSubmit={(e) => sendFormFields(e)}>
          <fieldset>
            {settings.isUsername && (
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                />
              </div>
            )}
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default withService()(SignInUp);
