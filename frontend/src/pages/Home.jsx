import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { CheckCircle, Clock, Calendar, Plus, LogOut, Target, Zap, Trophy } from 'lucide-react';
import AnimeBoy from '../components/AnimeBoy';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../auth'; // make sure this removes token from localStorage

const Home = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const username = token ? jwtDecode(token)?.sub : null;

    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [removingTaskId, setRemovingTaskId] = useState(null);

    // Fetch tasks on load
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await axios.get('http://localhost:8080/tasks', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTasks(res.data);
        } catch (err) {
            console.error('Error fetching tasks:', err);
        }
    };

    const handleLogout = () => {
        removeToken();
        navigate('/login');
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        setIsAddingTask(true);

        try {
            const res = await axios.post('http://localhost:8080/tasks', {
                title,
                description,
                dueDate,
                startTime,
                endTime
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setTasks([res.data, ...tasks]);
            setTitle('');
            setDescription('');
            setDueDate('');
            setStartTime('');
            setEndTime('');
        } catch (err) {
            console.error('Error adding task:', err);
        } finally {
            setIsAddingTask(false);
        }
    };

    const handleCompleteTask = async (id) => {
        setRemovingTaskId(id);
        try {
            await axios.delete(`http://localhost:8080/tasks/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTasks(tasks.filter(task => task.id !== id));
        } catch (err) {
            console.error('Error deleting task:', err);
        } finally {
            setRemovingTaskId(null);
        }
    };

    const completedTasks = 0;
    const totalTasks = tasks.length;
    const todayTasks = tasks.filter(task =>
        new Date(task.dueDate).toDateString() === new Date().toDateString()
    ).length;

    return (
        <div className="min-h-screen p-4 animate-fade-in">
            <AnimeBoy />
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
                            Welcome back, {username}! ✨
                        </h1>
                        <p className="text-slate-400 mt-2 text-lg">Manage your tasks in the darkness</p>
                    </div>
                    <button onClick={handleLogout} className="btn-logout">
                        <LogOut className="w-4 h-4" /> Logout
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="stats-card">
                        <p className="text-slate-400 text-sm font-medium">Total Tasks</p>
                        <p className="text-3xl font-bold text-white">{totalTasks}</p>
                    </div>
                    <div className="stats-card">
                        <p className="text-slate-400 text-sm font-medium">Today's Tasks</p>
                        <p className="text-3xl font-bold text-white">{todayTasks}</p>
                    </div>
                    <div className="stats-card">
                        <p className="text-slate-400 text-sm font-medium">Completed</p>
                        <p className="text-3xl font-bold text-white">{completedTasks}</p>
                    </div>
                </div>

                {/* Add Task */}
                <div className="task-form">
                    <h2 className="form-heading">
                        <Plus className="mr-3 w-8 h-8" /> Add New Task
                    </h2>
                    <form onSubmit={handleAddTask} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required className="input" />
                            <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} required className="input" />
                            <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} required className="input" />
                            <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} required className="input" />
                        </div>
                        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="input" />
                        <button type="submit" disabled={isAddingTask} className="btn">
                            {isAddingTask ? "Adding..." : <><Zap className="w-4 h-4 mr-2" /> Add Task</>}
                        </button>
                    </form>
                </div>

                {/* Task List */}
                <div className="task-list mt-8">
                    <h2 className="text-3xl font-bold text-purple-400 mb-6 flex items-center">
                        <Calendar className="mr-3 w-8 h-8" /> Your Tasks ({tasks.length})
                    </h2>
                    {tasks.length === 0 ? (
                        <p className="text-slate-500 text-lg">No tasks yet.</p>
                    ) : (
                        <div className="space-y-4">
                            {tasks.map(task => (
                                <div key={task.id} className={`task-card ${removingTaskId === task.id ? 'opacity-50' : ''}`}>
                                    <div className="flex justify-between">
                                        <div>
                                            <h3 className="text-xl font-bold text-white">{task.title}</h3>
                                            <p className="text-slate-400">{task.description}</p>
                                            <div className="flex space-x-4 text-sm text-slate-300">
                                                <span><Calendar className="inline w-4 h-4 mr-1" /> {new Date(task.dueDate).toLocaleDateString()}</span>
                                                <span><Clock className="inline w-4 h-4 mr-1" /> {task.startTime} - {task.endTime}</span>
                                            </div>
                                        </div>
                                        <button onClick={() => handleCompleteTask(task.id)} className="btn-complete">
                                            <CheckCircle className="w-4 h-4" /> Complete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
