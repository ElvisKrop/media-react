import React, { useEffect } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import ArticlePage from "./pages/articlePage";
import AuthorPage from "./pages/authorPage";
import HomePage from "./pages/homePage";
import NewArticlePage from "./pages/newArticlePage";
import SettingsPage from "./pages/settingsPage";
import SignInUp from "./pages/signInUp";
import DeveloperPage from "./pages/developersPage";
import { withToken, withService } from "./hocs";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";
import { Actions } from "./redux-store";

const App = ({ userLoaded, isToken, mrService }) => {
  useEffect(() => {
    if (isToken) mrService.getUser().then(userLoaded).catch(console.error);
  }, [isToken, mrService, userLoaded]);

  return (
    <>
      <Router>
        <div className="content">
          <Header />
          <Switch>
            <Route path="/" exact component={HomePage} />

            <Route path="/about_developers" exact component={DeveloperPage} />

            <Route
              path="/editor/:slug?"
              render={({ match }) => (
                <NewArticlePage slug={match.params.slug} />
              )}
            />
            <Route
              path="/profile/:username/favorites"
              render={({ match }) => (
                <AuthorPage
                  username={match.params.username}
                  strFeed="FavoritedPost"
                />
              )}
            />
            <Route
              path="/profile/:username"
              render={({ match }) => (
                <AuthorPage
                  username={match.params.username}
                  strFeed="MyPosts"
                />
              )}
            />
            <Route path="/settings">
              {isToken ? <SettingsPage /> : <Redirect to="/" />}
            </Route>
            <Route
              path="/article/:slug"
              render={({ match }) => <ArticlePage slug={match.params.slug} />}
            />
            <Route path="/login" render={() => <SignInUp type="login" />} />
            <Route
              path="/register"
              render={() => <SignInUp type="register" />}
            />
            <Route path="*" render={() => <Redirect to="/" />} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </>
  );
};

const mapStateToProps = ({ user }) => ({
  user
});

const mapDispatchToProps = (dispatch) => ({
  userLoaded: (user) => dispatch(Actions.userLoaded(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withToken(withService()(App)));
