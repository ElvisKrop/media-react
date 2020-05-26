import React, { useEffect, useState, useCallback } from "react";
import { Buttons, TagList, CommentBlock } from "./articleComponents";
import { withService } from "../../hocs";
import Spinner from "../../components/spinner";
import UserIcon from "../../components/userIcon";
import { connect } from "react-redux";

const ArticlePage = ({ mrService, slug, username, image }) => {
  const [artInfo, setArtInfo] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadLike, setLoadLike] = useState(false);
  const [loadFollow, setLoadFollow] = useState(false);

  const onChange = useCallback(
    (text) => {
      if (text === "like") setLoadLike(true);
      if (text === "follow") setLoadFollow(true);
      mrService
        .getArticle(slug)
        .then((data) => setArtInfo(data))
        .catch((err) => console.error(err))
        .finally(() => {
          setLoading(false);
          setLoadLike(false);
          setLoadFollow(false);
        });
    },
    [slug, mrService]
  );

  useEffect(() => {
    setLoading(true);
    onChange();
  }, [onChange]);

  const {
    author,
    body,
    createdAt,
    favorited,
    favoritesCount,
    title,
    tagList
  } = artInfo;

  const forBtns = {
    author,
    favorited,
    favoritesCount,
    slug,
    username,
    loadLike,
    loadFollow,
    onChange
  };
  const forUser = { ...author, createdAt };
  const classNameForButtons = "d-flex flex-wrap align-items-center mb-1";
  return (
    <>
      <div style={{ background: "#f3f3f3" }} className="py-4">
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

const mapStateToProps = ({ user }) => ({
  username: user.username,
  image: user.image
});

export default connect(mapStateToProps)(withService()(ArticlePage));
