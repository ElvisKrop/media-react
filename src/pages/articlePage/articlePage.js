import React, { useEffect, useState } from "react";
import { Buttons, NewComment } from "../../components/articleComponents";
import { withService, withToken } from "../../hocs";
import Spinner from "../../components/spinner";

const ArticlePage = ({ mrService, slug }) => {
  const [artInfo, setArtInfo] = useState("");
  useEffect(() => {
    mrService.getOneArticle(slug).then((data) => setArtInfo(data));
  }, []);

  const {
    author,
    body,
    createdAt,
    description,
    favorited,
    favoritesCount,
    tagList,
    title,
    updatedAt
  } = artInfo;

  const forBtns = { author, favorited, favoritesCount, slug };

  const toggleFollow = () => {
    if (author.following) {
      //TODO delete-request
    } else {
      //TODO post-request
    }
  };

  return (
    <>
      {!artInfo ? (
        <Spinner />
      ) : (
        <>
          <div className="bg-warning">
            <div className="container py-2">
              <h1 className="my-5">{title}</h1>
              <div className="d-flex ">
                <div>
                  <img
                    src={author.image}
                    className="rounded-circle"
                    width="30px"
                  />
                  <span>{author.username}</span>
                </div>
                <Buttons settings={forBtns} toggleFollow={toggleFollow} />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="py-5">{body}</div>
            <hr />
            <div className="comments-block col-md-8 m-auto">
              <div className="author-block">{author.username}</div>
              <NewComment />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default withService()(ArticlePage);
