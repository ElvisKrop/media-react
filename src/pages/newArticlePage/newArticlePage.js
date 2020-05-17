import React, { useState, useEffect } from "react";
import NewArticleForm from "./newArticleForm";
import { withService } from "../../hocs";
import { Redirect } from "react-router-dom";
import ErrorList from "../../components/errorList/errorList";
import Spinner from "../../components/spinner";

const SettingsPage = ({ mrService, slug }) => {
  const [checkingSendData, setCheckingSendData] = useState(false);
  const [slugForRedirect, setSlugForRedirect] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [objError, setObjError] = useState({});

  useEffect(() => {
    new Promise((resolve, reject) => {
      if (!Object.keys(objError).length) reject();
      setTimeout(resolve, 5000);
    })
      .then(() => setObjError({}))
      .catch(() => {});
  }, [objError]);

  const sendForm = (e, newArticle) => {
    e.preventDefault();
    setLoading(true);
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
        setObjError(errors);
        setError(true);
      });
  }

  // если нету ошибок и данные отправлены, то выполнить редирект
  if (!error && checkingSendData) {
    return <Redirect to={`/article/${slugForRedirect}`} />;
  } // из-за редиректа идет утечка памяти

  return (
    <>
      <NewArticleForm {...{ slug, sendForm }} />
      <ErrorList errors={objError} />
      {loading && !error ? <Spinner /> : null}
    </>
  );
};

export default withService()(SettingsPage);
