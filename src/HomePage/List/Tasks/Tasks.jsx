import "./Tasks.css";
import { Taskitem } from "./Taskitem";
import { useEffect, useRef } from "react";
export function Tasks({ tasks, onTaskDeleted, onTaskUpdated, listId, onTaskCompleted }) {
  const scrollRef = useRef(null);
  useEffect(() => {
    if (scrollRef) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [tasks.length]);

  // I recommend to handle task's callbacks here instead to pass them to the parent component of this component.

  return (
    <div ref={scrollRef} key={"taskContainerKey"} className="tasks-container">
      {tasks.map((task) => {
        return (
          <Taskitem
            taskId={task.id}
            taskName={task.name}
            listId={listId}
            isComplete={task.state}
            onTaskDeleted={onTaskDeleted}
            onTaskUpdated={onTaskUpdated}
            onTaskCompleted={onTaskCompleted}
          />
        );
      })}
    </div>
  );
}
