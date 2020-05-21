import React from "react";
import {
  ButtonFollow,
  ButtonLike,
  DeleteArticle,
  EditArticle
} from "../../../components/buttons";

const Buttons = ({ settings }) => {
  const { author, username, onChange, loadFollow, ...forBtn } = settings;
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
        <ButtonFollow profile={{ loadFollow, ...author }} onChange={onChange} />
        <ButtonLike data={forBtn} onChange={onChange} />
      </>
    );
  }
};

export default Buttons;
