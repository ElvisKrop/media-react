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
import { withBoundry } from "./hocs";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  const api = new MediaReactService();
  api.getTags().then((data) => console.log(data));
  api.getArticlesAll(2).then((data) => console.log(data));
  api.getArticlesByTag("sushi").then((data) => console.log(data));
  api
    ._getResourse("articles/feed?limit=10&offset=0")
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
  return (
    <div className="text-center container">
      <Router>
        <Header />
        <ArticlePage />
        <AuthorPage />
        <HomePage />
        <NewArticlePage />
        <SettingsPage />
        <SignInUp />
        <Spinner />
        <ErrorComponent error={new Error("ошибка").message} />
      </Router>
    </div>
  );
};

export default withBoundry(App);
