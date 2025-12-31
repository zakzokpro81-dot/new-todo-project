import { Body } from "./Body/Body";
import { Header } from "./Header/Header";
import { useState } from "react";
import "./HomePage.css";

export function HomePage() {
  const [search, setSearch] = useState("");
  const [lists, setLists] = useState([]);
  const [isDelete, setIsDelete] = useState(false);

  const filteredLists = lists
    .map((list) => {
      const matchedTasks = list.tasks.filter((task) =>
        task.name.toLowerCase().includes(search.toLowerCase())
      );
      return {
        ...list,
        tasks: matchedTasks,
      };
    })
    .filter((list) => list.tasks.length > 0);

  const listsToShow = search ? filteredLists : lists;

  function addNewList() {
    const newList = [...lists, { id: crypto.randomUUID(), tasks: [] }];
    setLists(newList);
  }

  function deleteList(listId) {
    const newList = lists.filter((list) => list.id !== listId);
    setLists(newList);
    setIsDelete((prev) => !prev);
  }

  function addTask(listId, newTask) {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: [...list.tasks, newTask],
            }
          : list
      )
    );
  }
  function deleteTask(lId, tId) {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === lId
          ? {
              ...list,
              tasks: list.tasks.filter((task) => task.id !== tId),
            }
          : list
      )
    );
  }

  function updateTask(listId, taskId, updatedName) {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.map((task) =>
                task.id === taskId ? { ...task, name: updatedName } : task
              ),
            }
          : list
      )
    );
  }

  function completeTask(listId, taskId, value) {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.map((task) =>
                task.id === taskId ? { ...task, state: value } : task
              ),
            }
          : list
      )
    );
  }

  return (
    <div className="home-page">
      <Header search={search} setSearch={setSearch} />
      <Body
        lists={listsToShow}
        setLists={setLists}
        deleteTask={deleteTask}
        addNewList={addNewList}
        updateTask={updateTask}
        completeTask={completeTask}
        addTask={addTask}
        deleteList={deleteList}
        setIsDelete={setIsDelete}
        isDelete={isDelete}
      />
    </div>
  );
}
