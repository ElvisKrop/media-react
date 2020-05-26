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
    <>
      <NewArticleForm {...{ slug, sendForm }} />
      <ErrorList errors={objError} />
    </>
  );
};

export default withService()(SettingsPage);
