import React from "react";
import NewArticleForm from "./newArticleForm";
import { withService } from "../../hocs";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import ErrorList from "../../components/errorList/errorList";
import { useUpgradeState } from "../../hooks";

const NewArticlePage = ({ mrService, slug }) => {
  const [checkingSendData, setCheckingSendData] = useUpgradeState(false, true);
  const [slugForRedirect, setSlugForRedirect] = useUpgradeState("", true);
  const [error, setError] = useUpgradeState(false, true);
  const [objError, setObjError] = useUpgradeState({}, true);

  const sendForm = (e, newArticle) => {
    e.preventDefault();
    sendingRequest(newArticle, slug);
  };

  function sendingRequest(newArticle, slug = null) {
    const { putArticleUpdate, postNewArticle } = mrService;
    return (slug ? putArticleUpdate : postNewArticle)(newArticle, slug)
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

NewArticlePage.propTypes = {
  mrService: PropTypes.object,
  slug: PropTypes.string
};

export default withService()(NewArticlePage);
