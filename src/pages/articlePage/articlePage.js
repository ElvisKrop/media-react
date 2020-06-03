import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Buttons, TagList, CommentBlock } from "./articleComponents";
import Spinner from "../../components/spinner";
import UserIcon from "../../components/userIcon";
import { connect } from "react-redux";
import { withService } from "../../hocs";
import { useUpgradeState } from "../../hooks";

import "./articlePage.scss";

const ArticlePage = ({ mrService, slug, username, image }) => {
  const [artInfo, setArtInfo] = useUpgradeState("", !!slug);
  const [loading, setLoading] = useUpgradeState(true, !!slug);
  const [loadLike, setLoadLike] = useUpgradeState(false, !!slug);
  const [loadFollow, setLoadFollow] = useUpgradeState(false, !!slug);

  const onChange = useCallback(
    (text) => {
      if (text === "like") setLoadLike(true);
      if (text === "follow") setLoadFollow(true);
      mrService
        .getArticle(slug)
        .then(setArtInfo)
        .catch(console.error)
        .finally(() => {
          setLoading(false);
          setLoadLike(false);
          setLoadFollow(false);
        });
    },
    [slug, mrService, setLoading, setArtInfo, setLoadFollow, setLoadLike]
  );

  useEffect(() => {
    setLoading(true);
    onChange();
  }, [onChange, setLoading]);

  const { author, createdAt, body, title, tagList, ...rest } = artInfo;
  const forBtns = { author, username, loadLike, loadFollow, onChange, ...rest };
  const forUser = { ...author, createdAt };

  const classNameForButtons = "d-flex flex-wrap align-items-center mb-1";
  return (
    <>
      <div className="article-banner py-4">
        {loading ? (
          <Spinner />
        ) : (
          <div className="container">
            <h1 className="my-5 overflow-hidden">{title}</h1>
            <div className={`${classNameForButtons}`}>
              <UserIcon {...forUser} />
              <Buttons settings={forBtns} />
            </div>
          </div>
        )}
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="container">
          <div className="article-content py-4">
            <p>{body}</p>
            <TagList tagList={tagList} />
          </div>
          <hr />
          <div className="comments-block col-md-8 m-auto">
            <div className={`${classNameForButtons} justify-content-around`}>
              <UserIcon {...forUser} />
              <Buttons settings={forBtns} />
            </div>
            <CommentBlock slug={slug} username={username} image={image} />
          </div>
        </div>
      )}
    </>
  );
};

ArticlePage.propTypes = {
  mrService: PropTypes.object,
  slug: PropTypes.string,
  username: PropTypes.string,
  image: PropTypes.string
};

const mapStateToProps = ({ user }) => ({
  username: user.username,
  image: user.image
});

export default connect(mapStateToProps)(withService()(ArticlePage));
