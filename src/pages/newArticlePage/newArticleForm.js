import React, { useEffect, useCallback } from "react";
import Spinner from "../../components/spinner";
import PropTypes from "prop-types";
import { withService } from "../../hocs";
import { useUpgradeState } from "../../hooks";

function SettingsForm({ mrService, sendForm, slug }) {
  const [title, setTitle] = useUpgradeState("", true);
  const [description, setDescription] = useUpgradeState("", true);
  const [body, setBody] = useUpgradeState("", true);
  const [tagList, setTagList] = useUpgradeState([], true);
  const [loading, setLoading] = useUpgradeState(false, true);

  const inputsData = useCallback(
    (article = {}) => {
      const { title = "", description = "", body = "", tagList = [] } = article;
      setTitle(title);
      setDescription(description);
      setBody(body);
      setTagList(tagList);
    },
    [setTitle, setDescription, setBody, setTagList]
  );

  useEffect(() => {
    // загрузка данных для ввода и их редактирования
    if (slug) {
      setLoading(true);
      mrService
        .getArticleForInputs(slug)
        .then(inputsData)
        .catch(console.error)
        .finally(() => setLoading(false));
    } else inputsData();
  }, [mrService, slug, inputsData, setLoading]);

  const newArticle = { title, description, body, tagList };

  if (loading) return <Spinner />;

  return (
    <form
      onSubmit={(e) => {
        sendForm(e, newArticle);
      }}>
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
  );
}

SettingsForm.propTypes = {
  mrService: PropTypes.object,
  sendForm: PropTypes.func,
  slug: PropTypes.string
};

export default withService()(SettingsForm);
