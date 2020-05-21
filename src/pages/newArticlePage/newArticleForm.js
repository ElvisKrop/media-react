import React, { useState, useEffect } from "react";
import Spinner from "../../components/spinner";
import { withService } from "../../hocs";

function SettingsForm({ mrService, sendForm, slug }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [tagList, setTagList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // загрузка данных для ввода и их редактирования
    if (slug) {
      setLoading(true);
      mrService
        .getArticleForInputs(slug)
        .then(({ article }) => loadingInputsData(article))
        .catch(({ errors }) => console.error(errors))
        .finally(() => setLoading(false));
    } else {
      defaultInputsData();
    }
  }, [mrService, slug]);

  function loadingInputsData(article) {
    setTitle(article.title);
    setDescription(article.description);
    setBody(article.body);
    setTagList(article.tagList);
  }

  function defaultInputsData() {
    setTitle("");
    setDescription("");
    setBody("");
    setTagList([]);
  }

  const newArticle = {
    title,
    description,
    body,
    tagList
  };

  if (loading) return <Spinner />;

  return (
    <div className="container text-center">
      <div className="col-lg-6 col-sm-10 col-11 mt-5 m-auto">
        <h1 className="mt-4 mb-3">Your Article</h1>
        <form
          onSubmit={(e) => {
            sendForm(e, newArticle);
          }}
        >
          <fieldset>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Article Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="What's this article about?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="form-group">
              <textarea
                className="form-control"
                placeholder="Write your article (in markdown)"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows="8"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter tags with a space"
                value={tagList.join(" ")}
                onChange={(e) => setTagList(e.target.value.split(" "))}
              />
            </div>
            <button type="submit" className="btn btn-primary float-right">
              Publish Article
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default withService()(SettingsForm);
