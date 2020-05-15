import React from "react";
import { withToken } from "../../hocs";
import {
  ButtonFollow,
  ButtonLike,
  DeleteArticle,
  EditArticle
} from "../buttons";

const Buttons = ({ isToken, settings }) => {
  const { author, username, ...forBtn } = settings;
  if (username === author.username) {
    return (
      <>
        <EditArticle slug={forBtn.slug} />
        <DeleteArticle />
      </>
    );
  } else {
    // FIXME на странице два блока с этими кнопками, надо как-то синхронизировать их
    // FIXME размер у кнопки по контенту => при загрузке она становиться меньше и едет верстка
    forBtn.text = "avorite Article";
    return (
      <>
        <ButtonFollow profile={author} />
        <ButtonLike data={forBtn} />
      </>
    );
  }
};

export default withToken(Buttons);
