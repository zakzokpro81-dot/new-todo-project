import "./List.css";
import { ListFooter } from "./ListFooter";
import { ListHeader } from "./ListHeader";
import { Tasks } from "./Tasks/Tasks";
export function List({
  listId,
  setIsDelete,
  setlistId,
  tasks,
  addTask,
  deleteTask,
  updateTask,
  completeTask,
  deleteList,
}) {
  return (
    <div key={listId} className="list-container">
      <ListHeader
        setIsDelete={setIsDelete}
        setlistId={setlistId}
        tasks={tasks}
        listId={listId}
        deleteList={deleteList}
      />
      <Tasks
        tasks={tasks}
        onTaskDeleted={deleteTask}
        listId={listId}
        onTaskUpdated={updateTask}
        onTaskCompleted={completeTask}
      />

      <ListFooter tasks={tasks} addTask={addTask} listId={listId} />
    </div>
  );
}
