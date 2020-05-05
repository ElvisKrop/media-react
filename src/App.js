import React from "react";
import MediaReactService from "./services";
import ArticlePage from "./pages/articlePage";
import AuthorPage from "./pages/authorPage";

const App = () => {
  const api = new MediaReactService();
  api.getTags().then((data) => console.log(data));
  return (
    <div className="text-center">
      <h1>Hello</h1>
      <ArticlePage />
      <AuthorPage />
    </div>
  );
};

export default App;
