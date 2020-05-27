import React, { useState } from "react";
import NewArticleForm from "./newArticleForm";
import { withService } from "../../hocs";
import { Redirect } from "react-router-dom";
import ErrorList from "../../components/errorList/errorList";

const SettingsPage = ({ mrService, slug }) => {
  const [checkingSendData, setCheckingSendData] = useState(false);
  const [slugForRedirect, setSlugForRedirect] = useState("");
  const [error, setError] = useState(false);
  const [objError, setObjError] = useState({});

  const sendForm = (e, newArticle) => {
    e.preventDefault();
    if (slug) {
      sendingRequest(mrService.putArticleUpdate, newArticle, slug);
    } else {
      sendingRequest(mrService.postNewArticle, newArticle);
    }
  };

  function sendingRequest(request, newArticle, slug = null) {
    return request(newArticle, slug)
      .then(({ article }) => {
        setSlugForRedirect(article.slug);
        setError(false);
        setCheckingSendData(true);
      })
      .catch(({ errors }) => {
        setError(true);
        setObjError(errors);
      });
  }
  if (!error && checkingSendData) {
    return <Redirect to={`/article/${slugForRedirect}`} />;
  }

  return (
    <div className="container">
      <div className="col-lg-6 col-sm-10 col-11 mt-5 m-auto">
        <h1 className="my-4 text-center">Your Article</h1>
        <ErrorList errors={objError} />
        <NewArticleForm {...{ slug, sendForm }} />
      </div>
    </div>
  );
};

export default withService()(SettingsPage);
