import React from "react";
import Header from "./components/header";
import Footer from "./components/footer";
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

const App = ({ user, userLoaded, isToken }) => {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={HomePage} />

          <Route
            path="/editor/:slug?"
            render={({ match }) => <NewArticlePage slug={match.params.slug} />}
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
              <AuthorPage username={match.params.username} strFeed="MyPosts" />
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

          <Route path="/register" render={() => <SignInUp type="register" />} />

          <Route path="*" render={() => <Redirect to="/" />} />
        </Switch>
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

export default connect(mapStateToProps, mapDispatchToProps)(withToken(App));
