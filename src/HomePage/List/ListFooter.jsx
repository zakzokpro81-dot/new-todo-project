import { useEffect, useState, useRef } from "react";
import "./ListFooter.css";
export function ListFooter({ addTask, listId, tasks }) {
  const [isClick, setIsClick] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [noTask, setNoTask] = useState("");
  const myRef = useRef(null);
  useEffect(() => {
    if (isClick) {
      myRef.current.focus();
      myRef.current.select();
    }
  }, [isClick]);
  function addNewTask() {
    const lines = taskTitle.split("\n");
    const firstLine = lines[0]?.trim();
    const secondLine = lines[1]?.trim();

    if (!firstLine || !secondLine) {
      setNoTask("No task name");
    } else {

       fetch(`http://zakaria.emadinitiative.org/tasks`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        Authorization: "Bearer changeme-secret-token",
      },
      body: JSON.stringify({

         "list_id": listId,
     "title": taskTitle,
     "is_complete": false
      }),
    })
      .then((r) => r.json())
      .then((d) => {

        let newTask = {
        id: d.id,
        name: taskTitle,
        isCompleted: false,
        order: tasks.length,
      };
      addTask(listId, newTask);

        console.log(d);
      })
      .catch((error) => {
        console.log("Error", error);
      });


      
      
      setTaskTitle("");
      setIsClick((prev) => !prev);
      setNoTask("");
    }
  }
  function changeTaskTitle(event) {
    setTaskTitle(event.target.value);
  }
  function changeIsClick() {
    setIsClick((prev) => !prev);
    setNoTask("");
  }

  return (
    <div className="footer-container">
      {isClick && (
        <div className="new-task-input">
          <textarea
            className="input-new-task"
            placeholder={"Title\nDescreption"}
            ref={myRef}
            onChange={changeTaskTitle}
            type="text"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addNewTask();
              }
            }}
            value={taskTitle}
          ></textarea>
          <div>{noTask}</div>
          <div className="btn-container">
            <div
              className="ok"
              onClick={() => {
                addNewTask();
              }}
            >
              Ok
            </div>
            <div
              className="cancel"
              onClick={() => {
                changeIsClick();
              }}
            >
              Cancel
            </div>
          </div>
        </div>
      )}
      {!isClick && (
        <div className="add-new-task" onClick={changeIsClick}>
          + Add Task
        </div>
      )}
    </div>
  );
}
