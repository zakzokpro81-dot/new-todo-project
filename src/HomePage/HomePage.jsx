import { Body } from "./Body/Body";
import { Header } from "./Header/Header";
import { useState, useEffect } from "react";
import "./HomePage.css";

export function HomePage() {
  const [search, setSearch] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [lists, setLists] = useState(() => {
    try {
      const saved = localStorage.getItem("lists");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(lists));
  }, [lists]);

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
    fetch("http://zakaria.emadinitiative.org/lists", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        Authorization: "Bearer changeme-secret-token",
      },
      body: JSON.stringify({
        title: "hello from zak",
      }),
    })
      .then((r) => r.json())
      .then((d) => {
        const newList = [...lists, { id: d.id, tasks: [] }];
        setLists(newList);
        console.log(d.id);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }

  function deleteList(listId) {
    const newList = lists.filter((list) => list.id !== listId);
    setLists(newList);
    setIsDelete((prev) => !prev);

    fetch(`http://zakaria.emadinitiative.org/lists/${listId}`, {
      method: "DELETE",
      headers: {
        "content-Type": "application/json",
        Authorization: "Bearer changeme-secret-token",
      },
    })
      .then((r) => r.json())
      .then((d) => {
        console.log(d);
      })
      .catch((error) => {
        console.log("Error", error);
      });
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
