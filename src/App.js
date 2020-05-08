import React, { useEffect } from "react";
import Header from "./components/header";
import ArticlePage from "./pages/articlePage";
import AuthorPage from "./pages/authorPage";
import HomePage from "./pages/homePage";
import NewArticlePage from "./pages/newArticlePage";
import SettingsPage from "./pages/settingsPage";
import SignInUp from "./pages/signInUp";
import { withToken } from "./hocs";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";
import { Actions } from "./redux-store";

// fake userdata for testing
const mockUser = {
  bio: null,
  createdAt: "2020-05-08T11:26:37.165Z",
  email: "new_human@mail.com",
  id: 96259,
  image: null,
  token:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6OTYyNTksInVzZXJuYW1lIjoiTmV3IEh1bWFuIiwiZXhwIjoxNTk0MTIxMTk3fQ.IQqST95iW4Ez3ddzKauLDFgTs1KK5u0fW2ORTOVzSkE",
  updatedAt: "2020-05-08T11:26:37.170Z",
  username: "New Human"
};

const App = ({ user, userLoaded, isToken }) => {
  // useEffect(() => {
  //   userLoaded(mockUser);
  // }, [userLoaded]);

  return (
    <div className="">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={HomePage} />

          <Route
            path="/editor/:slug?"
            render={({ match }) => <NewArticlePage slug={match.params.slug} />}
          />

          <Route
            path="/profile/:username"
            render={({ match }) => (
              <AuthorPage username={match.params.username} />
            )}
          />

          <Route path="/settings" component={SettingsPage} />

          <Route
            path="/article/:slug"
            render={({ match }) => <ArticlePage slug={match.params.slug} />}
          />

          <Route path="/login" render={() => <SignInUp type="login" />} />

          <Route path="/register" render={() => <SignInUp type="register" />} />

          <Route path="*" render={() => <Redirect to="/" />} />
        </Switch>
      </Router>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  user
});

const mapDispatchToProps = (dispatch) => ({
  userLoaded: (user) => dispatch(Actions.userLoaded(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(withToken(App));
