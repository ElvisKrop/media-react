import React from "react";
import {
  ButtonFollow,
  ButtonLike,
  DeleteArticle,
  EditArticle
} from "../buttons";

const Buttons = ({ settings }) => {
  const { author, username, onChange, ...forBtn } = settings;
  if (username === author.username) {
    return (
      <>
        <EditArticle slug={forBtn.slug} />
        <DeleteArticle slug={forBtn.slug} />
      </>
    );
  } else {
    forBtn.text = "avorite Article";
    return (
      <>
        <ButtonFollow profile={author} onChange={onChange} />
        <ButtonLike data={forBtn} onChange={onChange} />
      </>
    );
  }
};

export default Buttons;
