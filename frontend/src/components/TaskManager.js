// File: src/components/TaskManager.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getToken, removeToken } from '../auth';

function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '' });
    const navigate = useNavigate();
    const token = getToken(); // 🔐 Get token from storage

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        axios.get('http://localhost:8080/tasks/all', {
            headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
            setTasks(response.data);
        }).catch(error => {
            alert('Failed to fetch tasks');
        });
    }, [navigate, token]);

    const addTask = () => {
        axios.post('http://localhost:8080/tasks/add', newTask, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
            setTasks([...tasks, response.data]);
            setNewTask({ title: '', description: '', dueDate: '' });
        }).catch(() => alert('Task creation failed'));
    };

    const logout = () => {
        removeToken(); // 🔓 Clear token on logout
        navigate('/login');
    };

    return (
        <div>
            <h2>Task Manager</h2>
            <button onClick={logout}>Logout</button>

            <div>
                <input
                    placeholder="Title"
                    value={newTask.title}
                    onChange={e => setNewTask({ ...newTask, title: e.target.value })}
                />
                <input
                    placeholder="Description"
                    value={newTask.description}
                    onChange={e => setNewTask({ ...newTask, description: e.target.value })}
                />
                <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={e => setNewTask({ ...newTask, dueDate: e.target.value })}
                />
                <button onClick={addTask}>Add Task</button>
            </div>

            <ul>
                {tasks.map((task, idx) => (
                    <li key={idx}>
                        <strong>{task.title}</strong> - {task.description} (Due: {task.dueDate})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskManager;
