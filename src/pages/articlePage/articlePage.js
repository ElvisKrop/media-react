import React, { useEffect, useState } from "react";
import { Buttons } from "../../components/articleComponents";
import { withService, withToken } from "../../hocs";
import Spinner from "../../components/spinner";

const ArticlePage = ({ service, slug }) => {
  const [artInfo, setArtInfo] = useState("");
  useEffect(() => {
    service.getOneArticle(slug).then((data) => setArtInfo(data));
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
        <div className=" banner">
          <div className="container">
            <h1 className="my-5">{title}</h1>
            <Buttons settings={forBtns} toggleFollow={toggleFollow} />
          </div>
        </div>
      )}
    </>
  );
};

export default withService()(ArticlePage);
