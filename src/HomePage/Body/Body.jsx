import { List } from "../List/List";
import "./Body.css";
import { useState } from "react";
export function Body({
  lists,
  deleteTask,
  addNewList,
  updateTask,
  completeTask,
  addTask,
  deleteList,
  setIsDelete,
  isDelete,
}) {
  const [listId, setlistId] = useState("");

  function changeIsDelete() {
    setIsDelete((prev) => !prev);
  }

  return (
    <main key={"mainKey"} className="main-container">
      {isDelete && (
        <div key={"modalOverlayKey"} className="modal-overlay">
          <div className="modal-box">
            <div className="modal-text">
              <div className="message-of-delete">
                do you want to delet the List
              </div>

              <div className="name-of-list">{listId[1]} </div>
            </div>

            <div className="modal-actions">
              <button
                className="ok"
                onClick={() => {
                  deleteList(listId[0]);
                }}
              >
                Ok
              </button>
              <button className="cancel" onClick={changeIsDelete}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div key={"gridContainerKey"} className="grid-container">
        {lists.map((list) => {
          return (
            <List
              listId={list.id}
              setIsDelete={setIsDelete}
              setlistId={setlistId}
              tasks={list.tasks}
              addTask={addTask}
              deleteTask={deleteTask}
              updateTask={updateTask}
              completeTask={completeTask}
              deleteList={deleteList}
            />
          );
        })}
        <div
          key={"addNewListKey"}
          className="add-new-list"
          onClick={addNewList}
        >
          + Add New List
        </div>
      </div>
    </main>
  );
}
