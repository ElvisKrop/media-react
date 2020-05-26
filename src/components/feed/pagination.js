import React, { useState, useEffect } from "react";

function Pagination({ data: { articlesCount, currentPage, setPage } }) {
  const [currentPos, setCurrentPos] = useState(0);
  const [countClicks, setCountClicks] = useState(0);
  const [invisibleBlock, setInvisibleBlock] = useState(0);
  const [maxClick, setMaxClick] = useState(0);
  const [shearWidth, setShearWidth] = useState(0);
  const [remainderDivision, setRemainderDivision] = useState(0);

  const refList = React.createRef();
  const refFeed = React.createRef();

  useEffect(() => {
    if (refList.current !== null) {
      const wholeBlockWidth = refList.current.offsetWidth;
      const visiblePartBlock = refFeed.current.offsetWidth;
      const invisiblePartBlock = wholeBlockWidth - visiblePartBlock;

      setInvisibleBlock(invisiblePartBlock + 68);
      setShearWidth(visiblePartBlock / 4);
      setMaxClick(Math.floor(invisiblePartBlock / shearWidth));
      setRemainderDivision(invisibleBlock - shearWidth * maxClick);
    }
  }, [
    refList,
    refFeed,
    shearWidth,
    remainderDivision,
    countClicks,
    invisibleBlock,
    maxClick
  ]);

  const next = () => {
    if (currentPos === -(shearWidth * maxClick)) {
      setCurrentPos(-invisibleBlock);
    } else {
      setCurrentPos(currentPos - shearWidth);
    }
    setCountClicks(countClicks + 1);
  };

  const prev = () => {
    if (currentPos === -remainderDivision) {
      setCurrentPos(0);
    } else {
      setCurrentPos(currentPos + shearWidth);
    }
    setCountClicks(countClicks - 1);
  };

  function renderButton() {
    if (articlesCount === 1) return;
    let arr = [];
    for (let i = 0; i < articlesCount; i++) {
      arr.push(i);
    }

    return arr.map((item) => {
      let classNameItem = "page-item";
      let classNameBtn = "page-link";

      if (item === currentPage) classNameItem += " active";
      if (invisibleBlock > shearWidth * 4 - 70) classNameBtn += " rounded-0";

      return (
        <li className={classNameItem} key={item} onClick={() => setPage(item)}>
          <button className={classNameBtn}>{item + 1}</button>
        </li>
      );
    });
  }

  if (invisibleBlock < shearWidth * 4 - 70) {
    return (
      <ul className="pagination d-flex justify-content-center">
        {renderButton()}
      </ul>
    );
  }

  const style = { left: currentPos + "px" };

  let classNameNext = "page-item";
  let classNamePrev = "page-item";
  if (countClicks === 0) classNamePrev = "page-item disabled";
  if (countClicks === maxClick + 1) classNameNext = "page-item disabled";

  return (
    <div ref={refFeed}>
      <div className="d-flex justify-content-between w-100">
        <div className={classNamePrev}>
          <button className="page-link" onClick={() => prev()}>
            &laquo;
          </button>
        </div>
        <div className={classNameNext}>
          <button className="page-link" onClick={() => next()}>
            &raquo;
          </button>
        </div>
      </div>
      <div className={"block-btn-pages"}>
        <ul className="pagination list-btn-pages" style={style} ref={refList}>
          {renderButton()}
        </ul>
      </div>
    </div>
  );
}

export default Pagination;
