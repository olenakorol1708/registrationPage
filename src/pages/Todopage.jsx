import React from "react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import useLocalStorage from "../hook/useLocalStorage.js";
import i18n from "../i18.js";
import { Task } from "../todoComponents/Task.jsx";

export const Todopage = () => {
  const [tasks, setTasks] = useState([]); //todo array
  const [item, setItem] = useState(""); //each ite in todo array

  useEffect(() => {
    fetch("https://first-node-js-app-r.herokuapp.com/api/todos", {
      method: "GET",
      headers: {
        "Content-type": "Application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => setTasks([...data]));
  }, []);
  async function addTodoFetch(newTask) {
    try {
      const response = await fetch(
        "https://first-node-js-app-r.herokuapp.com/api/todos",
        {
          method: "POST",
          headers: {
            "Content-type": "Application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(newTask),
        }
      );
      const data = await response.json();
      setTasks((prevState) => [...prevState, data]);
    } catch (error) {
      console.log(error.message);
    }
  }

  const { t } = useTranslation();
  const [language, setLanguage] = useLocalStorage("language", "uk");

  const handleLanguageChange = () => {
    if (language === "en") {
      i18n.changeLanguage("uk");
      setLanguage("uk");
    } else if (language === "uk") {
      i18n.changeLanguage("en");
      setLanguage("en");
    }
  };

  const addItem = (e) => {
    e.preventDefault();
    const newTask = { title: item };

    addTodoFetch(newTask);
    setItem("");
  };

  const handleChange = (e) => {
    setItem(e.target.value);
  };

  return (
    <div className="container">
      <div className="todo-title">
        <div>
          <h1>{t("It's your tasks for today")}</h1>
          <p>{t("text")}</p>
          <br />
        </div>
        <div>
          <button className="changelang-button" onClick={handleLanguageChange}>
            {t("change to")} {language === "uk" ? t("english") : t("ukrainian")}
          </button>{" "}
        </div>
      </div>

      <form onSubmit={addItem}>
        <input
          className="input-add"
          onChange={handleChange}
          value={item}
          placeholder="Enter your task..."
        />
        <button className="add-button" type="submit">
          {t("Add task")}
        </button>
      </form>

      {tasks.map((item) => (
        <Task key={item.ID} item={item} tasks={tasks} setTasks={setTasks} />
      ))}
    </div>
  );
};