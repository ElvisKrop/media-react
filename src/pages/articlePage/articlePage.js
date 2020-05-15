import React, { useEffect, useState } from "react";
import {
  Buttons,
  TagList,
  CommentBlock
} from "../../components/articleComponents";
import { withService } from "../../hocs";
import Spinner from "../../components/spinner";
import UserIcon from "../../components/userIcon";
import { connect } from "react-redux";

const ArticlePage = ({ mrService, slug, username, image }) => {
  const [artInfo, setArtInfo] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    mrService
      .getArticle(slug)
      .then((data) => setArtInfo(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [mrService, slug]);

  const {
    author,
    body,
    createdAt,
    // description,
    favorited,
    favoritesCount,
    title,
    tagList
  } = artInfo;

  const forBtns = { author, favorited, favoritesCount, slug, username };
  const forUser = { ...author, createdAt };

  return (
    <>
      <div style={{ background: "#f3f3f3" }} className="py-4">
        {loading ? (
          <Spinner />
        ) : (
          <div className="container">
            <h1 className="my-5 overflow-hidden">{title}</h1>
            <div className="col-md-8 d-flex justify-content-around align-items-center">
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
            <div className="d-flex justify-content-between align-items-center">
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
