import "./Tasks.css";
import { Taskitem } from "./Taskitem";
import { useEffect, useRef } from "react";
export function Tasks({ tasks, deleteTask, updateTask, listId, completeTask }) {
  const scrollRef = useRef(null);
  useEffect(() => {
    if (scrollRef) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [tasks.length]);

  return (
    <div ref={scrollRef} key={"taskContainerKey"} className="tasks-container">
      {tasks.map((task) => {
        return (
          <Taskitem
            taskId={task.id}
            taskName={task.name}
            deleteTask={deleteTask}
            updateTask={updateTask}
            listId={listId}
            completeTask={completeTask}
            state={task.state}
          />
        );
      })}
    </div>
  );
}
