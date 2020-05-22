import React, { useState, useEffect } from "react";

function Pagination({ data: { articlesCount, currentPage, setPage } }) {
  const [currentPos, setCurrentPos] = useState(0);
  const [currentClick, setCurrentClick] = useState(0);
  const [widthListPx, setWidthListPx] = useState(0);
  const [maxCurrentClick, setMaxCurrentClick] = useState(0);
  const [transitionWidth, setTransitionWidth] = useState(0);
  const [remainderDivision, setRemainderDivision] = useState(0);
  const [remainderInPixel, setRemainderInPixel] = useState(0);
  const refList = React.createRef();
  const refFeed = React.createRef();
  const style = { left: currentPos + "px" };
  let classNameNext = "page-item";
  let classNamePrev = "page-item";
  if (currentClick === 0) classNamePrev = "page-item disabled";
  if (currentClick === maxCurrentClick) classNameNext = "page-item disabled";

  useEffect(() => {
    if (refList.current !== null) {
      const widthList = refList.current.offsetWidth;
      const widthFeed = refFeed.current.offsetWidth;
      console.log(
        `1.Длина всей кнопок - то что на экране${widthList - widthFeed}`
      );
      setWidthListPx(widthList);
      setTransitionWidth(widthFeed / 4);
      setMaxCurrentClick(Math.floor((widthList - widthFeed) / transitionWidth));
      setRemainderDivision(+(widthList / transitionWidth).toFixed(3).slice(1));
      setRemainderInPixel(+(remainderDivision * widthFeed).toFixed(0) - 17); // Что-то не то
    }
  }, [refList, refFeed, transitionWidth, remainderDivision]);

  const next = () => {
    console.log(`2. Количество кликов ${maxCurrentClick}`);
    console.log(`3. Один переход ${maxCurrentClick}`);
    console.log(`4.переход * на max клик ${transitionWidth * maxCurrentClick}`);
    console.log(`5. Остаток ${remainderInPixel}`);

    if (currentClick === maxCurrentClick - 1) {
      setCurrentPos(currentPos - remainderInPixel);
    } else {
      setCurrentPos(currentPos - transitionWidth);
    }

    setCurrentClick(currentClick + 1);
  };
  const prev = () => {
    if (currentClick === 1) {
      setCurrentPos(currentPos + remainderInPixel);
    } else {
      setCurrentPos(currentPos + transitionWidth);
    }

    setCurrentClick(currentClick - 1);
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
      if (widthListPx > transitionWidth * 4 - 70) classNameBtn += " rounded-0";

      return (
        <li className={classNameItem} key={item} onClick={() => setPage(item)}>
          <button className={classNameBtn}>{item + 1}</button>
        </li>
      );
    });
  }

  if (widthListPx < transitionWidth * 4 - 70) {
    return <ul className="pagination d-flex">{renderButton()}</ul>;
  }

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
