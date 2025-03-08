import {useEffect, useState} from "react";
import "./ToDoList.css";

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] =useState("");

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks"));
            if(savedTasks) {
                setTasks(savedTasks);
            }
    }, []);

    useEffect(() => {
        localStorage.setItem("tasks" , JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if(newTask.trim() === "") return;
        setTasks([...tasks, { Text: newTask, done: false}]);
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

    return (
        <div>
            <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Ajouter une tâche"
            />
            <button onClick={addTask}>Ajouter</button>
            <ul>
            {tasks.map((task, index) => (
                <li key={index} style={{ textDecoration: task.done ? "line-through" : "none" }}>              
                    <p>{task.text}</p>
                <button onClick={() => toggleTask(index)}>✔️</button>
                <button className="delete-btn" onClick={() => removeTask(index)}>❌</button>
                </li>
            ))}
            </ul>
        </div>
    );
}

export default ToDoList;