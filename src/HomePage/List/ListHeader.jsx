import { useEffect, useState, useRef } from "react";

import "./ListHeader.css";
export function ListHeader({ listId, setIsDelete, setlistId, tasks }) {
  const [isEdit, setIsEdit] = useState(false);
  const [titleValue, setTitleValue] = useState("Title");
  const myref = useRef(null);
  useEffect(() => {
    if (isEdit) {
      myref.current.focus();
      myref.current.select();
    }
  }, [isEdit]);

  const handleBlur = () => {
    if (myref.current.value.trim() === "") {
      setTimeout(() => {
        myref.current.focus();
      }, 0);
    } else {
      setIsEdit((prev) => !prev);
    }
  };

  function changeTitleName(event) {
    setTitleValue(event.target.value);
  }
  function editTitle() {
    setIsEdit((prev) => !prev);
  }
  function deletListfun() {
    setIsDelete(true);
    setlistId([listId, titleValue]);
  }
  return (
    <div className="list-header-container">
      <div className="title-section">
        {isEdit && (
          <div className="title-input-container">
            <input
              className="input-title"
              ref={myref}
              type="text"
              onChange={changeTitleName}
              onBlur={handleBlur}
              value={titleValue}
            ></input>
            <div className="title-tooltip">Title is requir</div>
          </div>
        )}
        {!isEdit && (
          <div className="title-name-container">
            <div className="title-name" onClick={editTitle}>
              {titleValue}
            </div>
            <div className="name-tooltip">Click here to change</div>
          </div>
        )}
      </div>
      <div className="option-section">
        <div className="couter-container">
          <div className="task-counter">{tasks.length}</div>
          <div className="counter-tooltip">Count of tasks</div>
        </div>
        <div className="options-container">
          <div className="list-options" onClick={deletListfun}>
            X
          </div>
          <div className="options-tooltip">Options tools</div>
        </div>
      </div>
    </div>
  );
}
