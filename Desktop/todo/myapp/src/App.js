import React, { useState } from "react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [priority, setPriority] = useState("medium");
  const [todos, setTodos] = useState([]);
  const [livetask, setLivetask] = useState(0);
  const [deletedtask, setDeletedtask] = useState(0);
  const [hightask, sethightask] = useState(0);
  const [mediumtask, setmediumtask] = useState(0);
  const [lowtask, setlowtask] = useState(0);
  const [prepri, setprepri] = useState("");
  const [completedtask, setCompletedtask] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  function onchangehandler(e) {
    setInputValue(e.target.value);
    setErrorMessage("");
  }

  function onPriorityChange(e) {
    setPriority(e.target.value);
  }

  function onclickhandler() {
    if (!inputValue.trim()) {
      setErrorMessage("Task cannot be empty");
      return;
    }

    if (priority === "high" && editingIndex === null) {
      sethightask(hightask + 1);
    } else if (priority === "medium" && editingIndex === null) {
      setmediumtask(mediumtask + 1);
    } else if (priority === "low" && editingIndex === null) {
      setlowtask(lowtask + 1);
    }

    if (editingIndex != null) {
      if (prepri === "high") {
        sethightask(hightask - 1);
      } else if (prepri === "medium") {
        setmediumtask(mediumtask - 1);
      } else if (prepri === "low") {
        setlowtask(lowtask - 1);
      }
    }

    if (editingIndex != null) {
      if (priority === "high") {
        sethightask(hightask + 1);
      } else if (priority === "medium") {
        setmediumtask(mediumtask + 1);
      } else if (priority === "low") {
        setlowtask(lowtask + 1);
      }
    }

    if (editingIndex !== null) {
      // If we are editing a task
      const updatedTodos = todos.map((todo, index) =>
        index === editingIndex
          ? { ...todo, text: inputValue, priority: priority }
          : todo
      );
      setTodos(updatedTodos);
      setEditingIndex(null);
    } else {
      // If we are adding a new task
      setLivetask(livetask + 1);
      setTodos([
        ...todos,
        { text: inputValue, completed: false, priority: priority },
      ]);
    }
    setInputValue(""); // Clear the input field after adding or editing
    setPriority("medium"); // Reset priority to default
  }

  function ondelete(index, p) {
    setDeletedtask(deletedtask + 1);
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    setLivetask(livetask - 1);
    if (p === "high") {
      sethightask(hightask - 1);
    } else if (p === "medium") {
      setmediumtask(mediumtask - 1);
    } else if (p === "low") {
      setlowtask(lowtask - 1);
    }
  }

  function onedit(index) {
    setInputValue(todos[index].text);
    setPriority(todos[index].priority);
    setEditingIndex(index);

    setprepri(todos[index].priority);
  }

  function oncomplete(index, p) {
    setCompletedtask(completedtask + 1);
    setLivetask(livetask - 1);
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    if (p === "high") {
      sethightask(hightask - 1);
    } else if (p === "medium") {
      setmediumtask(mediumtask - 1);
    } else if (p === "low") {
      setlowtask(lowtask - 1);
    }
  }

  function getPriorityValue(priority) {
    switch (priority) {
      case "high":
        return 3;
      case "medium":
        return 2;
      case "low":
        return 1;
      default:
        return 0;
    }
  }

  const sortedTodos = todos.sort(
    (a, b) => getPriorityValue(b.priority) - getPriorityValue(a.priority)
  );

  return (
    <div className="App">
      <div className="todo-section">
        <div className="top-div">
          <h1>Todo List</h1>
          <div className="input-div">
            <input
              className="input"
              type="text"
              id="textInput"
              placeholder="Hey! What's your task today"
              value={inputValue}
              onChange={onchangehandler}
              onKeyPress={(e) => {
                if (e.key === "Enter") onclickhandler();
              }}
            />
            <select
              value={priority}
              onChange={onPriorityChange}
              className={`priority-select ${priority}`}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button
              className={editingIndex !== null ? "button1" : "button"}
              onClick={onclickhandler}
            >
              {editingIndex !== null ? "Update" : "Add"}
            </button>
          </div>
          {errorMessage && <p className="error">{errorMessage}</p>}
        </div>

        <div className="todo-list">
          {sortedTodos.map((todo, index) => (
            <div key={index} className={`todo-item ${todo.priority}`}>
              <p className="txt">
                <span className="priority">{todo.text}</span>
              </p>
              <div className="icons">
                <span
                  className="material-symbols-outlined"
                  onClick={() => onedit(index)}
                >
                  edit
                </span>
                <span
                  className="material-symbols-outlined"
                  onClick={() => ondelete(index, todo.priority)}
                >
                  delete
                </span>
                <input
                  type="checkbox"
                  className="checkbox1"
                  checked={todo.completed}
                  onChange={() => oncomplete(index, todo.priority)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="right">
        <div className="livetask">
          <p>Live Task</p>
          <p className="livetask-txt">{livetask}</p>
        </div>
        <div className="livetask">
          <p>Completed Tasks</p>
          <p className="livetask-txt">{completedtask}</p>
        </div>
        <div className="livetask">
          <p>High Priorty Tasks</p>
          <p className="livetask-txt">{hightask}</p>
        </div>
        <div className="livetask">
          <p>Medium Priorty Tasks</p>
          <p className="livetask-txt">{mediumtask}</p>
        </div>
        <div className="livetask">
          <p>Low Priorty Tasks</p>
          <p className="livetask-txt">{lowtask}</p>
        </div>
      </div>
    </div>
  );
}

export default App;

