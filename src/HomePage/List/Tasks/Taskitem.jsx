import { useState, useRef, useEffect } from "react";

export function Taskitem({
  taskId,
  taskName,
  isComplete,
  listId,
  onTaskDeleted,
  onTaskUpdated,
  onTaskCompleted,
}) {
  const [taskState, setTaskState] = useState("view");
  const [textValue, setTextValue] = useState("");
  const myRef = useRef(null);

  useEffect(() => {
    if (taskState === "edite") {
      myRef.current.focus();
      myRef.current.select();
    }
  }, [taskState]);

  function changeTextValue(event) {
    setTextValue(event.target.value);
  }

  function checkTextValue(listId, taskId, value) {
    if (!textValue) {
      setTaskState("taskRequier");
    } else {
      onTaskUpdated(listId, taskId, value);
      setTaskState("view");
    }
  }
  if (taskState === "view") {
    return (
      <div key={taskId} className="task-body">
        <div className="task-name">{taskName}</div>
        <div
          className="task-tooltip"
          onClick={() => {
            setTaskState("options");
          }}
        >
          ...
        </div>
        {isComplete && <div className="task-complete"> ✓ complete</div>}
      </div>
    );
  }

  if (taskState === "options") {
    return (
      <div key={taskId} className="task-body">
        <div
          className="task-name"
          onClick={() => {
            setTaskState("view");
          }}
        >
          {taskName}
        </div>
        {isComplete && <div className="task-complete"> ✓ complete</div>}
        <div className="options-list">
          <div
            className="delete"
            onClick={() => {
              setTaskState("delete");
            }}
          >
            Delete
          </div>
          <div
            className="edite"
            onClick={() => {
              setTextValue(taskName);
              setTaskState("edite");
            }}
          >
            Edite
          </div>
          <div
            className="complete"
            onClick={() => {
              onTaskCompleted(listId, taskId, true);
              setTaskState("view");
            }}
          >
            Complete
          </div>
        </div>
      </div>
    );
  }

  if (taskState === "edite") {
    return (
      <>
        <textarea
          className="task-input"
          ref={myRef}
          value={textValue}
          onChange={changeTextValue}
          onBlur={() => {
            checkTextValue(listId, taskId, textValue);
          }}
        ></textarea>
      </>
    );
  }

  if (taskState === "delete") {
    return (
      <div key={taskId} className="task-body">
        Are you sure you want to delete this task ?
        <div className="btn-container">
          <div
            className="ok"
            onClick={() => {
              onTaskDeleted(listId, taskId);
              setTaskState("view");
            }}
          >
            Ok
          </div>
          <div
            className="cancel"
            onClick={() => {
              setTaskState("view");
            }}
          >
            Cancel
          </div>
        </div>
      </div>
    );
  }

  if (taskState === "taskRequier") {
    return (
      <div key={taskId} className="task-body">
        The task is empty
        <div className="btn-container">
          <div
            className="ok"
            onClick={() => {
              setTaskState("edite");
            }}
          >
            Ok
          </div>
        </div>
      </div>
    );
  }
}
