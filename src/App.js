import React from "react";
import MediaReactService from "./services";
import Header from "./components/header";
import ArticlePage from "./pages/articlePage";
import AuthorPage from "./pages/authorPage";
import HomePage from "./pages/homePage";
import NewArticlePage from "./pages/newArticlePage";
import SettingsPage from "./pages/settingsPage";
import SignInUp from "./pages/signInUp";
import Spinner from "./components/spinner";
import ErrorComponent from "./components/errorComponent";
import { withBoundry, withToken } from "./hocs";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

const App = () => {
  /* const api = new MediaReactService();
  api.getTags().then((data) => console.log(data));
  api.getArticlesAll(2).then((data) => console.log(data));
  api.getArticlesByTag("sushi").then((data) => console.log(data));
    api
    ._getResourse("articles/feed?limit=10&offset=0")
    .then((data) => console.log(data))
    .catch((error) => console.log(error)); */
  return (
    <>
      <Router>
        <Header />
        {/* <ArticlePage />
        <AuthorPage />
        <HomePage />
        <NewArticlePage />
        <SettingsPage />
        <SignInUp />
        <Spinner />
        <ErrorComponent error={new Error("ошибка").message} /> */}
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

          <Route path="/login" render={() => <SignInUp type="register" />} />

          <Route path="/register" render={() => <SignInUp type="login" />} />

          <Route path="*" render={() => <Redirect to="/" />} />
        </Switch>
      </Router>
    </>
  );
};

export default withBoundry(App);
