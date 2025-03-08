import { useState, useEffect } from "react";
import "./ToDoList.css";

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks"));
        if (savedTasks) {
        setTasks(savedTasks);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (newTask.trim() === "") return;
        setTasks([...tasks, { text: newTask, done: false }]);
        setNewTask("");
    };

    const removeTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const toggleTask = (index) => {
        setTasks(
        tasks.map((task, i) =>
            i === index ? { ...task, done: !task.done } : task
        )
        );
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === "done") return task.done;
        if (filter === "not_done") return !task.done;
        return true;
    });

    return (
        <div className="todo-container">
        <div className="input-section">
            <h1>To Do List</h1>
            <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Ajouter une tâche"
            className="task-input"
            />
            <button onClick={addTask} className="add-btn">
            Ajouter
            </button>
        </div>

        <div className="filter-section">
            <button
            onClick={() => setFilter("all")}
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
            >
            Toutes
            </button>
            <button
            onClick={() => setFilter("done")}
            className={`filter-btn ${filter === "done" ? "active" : ""}`}
            >
            Complétées
            </button>
            <button
            onClick={() => setFilter("not_done")}
            className={`filter-btn ${filter === "not_done" ? "active" : ""}`}
            >
            Non complétées
            </button>
        </div>

        <table className="task-table">
            <thead>
            <tr>
                <th>Done</th>
                <th>Task</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {filteredTasks.map((task, index) => (
                <tr key={index}>
                <td className="checkbox-cell">
                    <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(index)}
                    />
                </td>
                <td className={task.done ? "task-done" : ""}>{task.text}</td>
                <td>
                    <button
                    className="delete-btn"
                    onClick={() => removeTask(index)}
                    aria-label="Delete task"
                    >
                    ❌
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}

export default ToDoList;