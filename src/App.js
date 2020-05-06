import React from "react";
import MediaReactService from "./services";
import ArticlePage from "./pages/articlePage";
import AuthorPage from "./pages/authorPage";
import HomePage from "./pages/homePage";
import NewArticlePage from "./pages/newArticlePage";
import SettingsPage from "./pages/settingsPage";
import SignInUp from "./pages/signInUp";

const App = () => {
  const api = new MediaReactService();
  api.getTags().then((data) => console.log(data));
  return (
    <div className="text-center">
      <h1>Hello</h1>
      <ArticlePage />
      <AuthorPage />
      <HomePage />
      <NewArticlePage />
      <SettingsPage />
      <SignInUp />
    </div>
  );
};

export default App;
