import React from "react";
import { InputEdit } from "./InputEdit";

export const Task = ({ item, tasks, setTasks }) => {
  const [text, setText] = React.useState(item.title);
  const [isEdit, setIsEdit] = React.useState(false);

  async function deleteFetch(id) {
    try {
      let response = await fetch(`${process.env.REACT_APP_BASE_URL}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      let result = await response.json();
      return result.id;
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleDelete = async (id) => {
    const target = await deleteFetch(id);
    const filteredArr = tasks.filter((item) => item.id !== target);
    setTasks([...filteredArr]);

    console.log(filteredArr);
  };

  async function editFetch(id) {
    try {
      let response = await fetch(`${process.env.REACT_APP_BASE_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "Application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ title: text }),
      });
      let result = await response.json();
      return result;
    } catch (error) {
      console.log(error.message);
    }
  }
  const toggle = () => {
    if (isEdit) {
      handleEdit(item.id, text);
      setIsEdit(!isEdit);
    } else {
      setIsEdit(!isEdit);
    }
  };
  const handleEdit = async (id, text) => {
    console.log("handleEdit", id, text);
    const arr = tasks.map((item) =>
      item.id === id ? { ...item, title: text } : item
    );
    await editFetch(id);
    setTasks([...arr]);
  };
  return (
    <div className="item-block" key={item.id}>
    <InputEdit isEdit = {isEdit} item = {item} setText = {setText} text = {text}/>
      <div className="flex-button">
        <button className="change-button" onClick={() => handleDelete(item.id)}>
          Delete
        </button>
        <button className="change-button" onClick={toggle}>
          {isEdit ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
};
