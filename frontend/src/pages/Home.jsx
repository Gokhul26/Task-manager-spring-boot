import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../auth';
import { jwtDecode } from 'jwt-decode';
import AnimeBoy from '../components/AnimeBoy';

const Home = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const username = token ? jwtDecode(token)?.sub : null;

    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [removingTaskId, setRemovingTaskId] = useState(null);
    const [newTaskId, setNewTaskId] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await axios.get('http://localhost:8080/tasks', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTasks(res.data);
        } catch (err) {
            console.error('Error fetching tasks:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        removeToken();
        navigate('/login');
    };

    const handleCompleteTask = async (id) => {
        setRemovingTaskId(id);
        setTimeout(async () => {
            try {
                await axios.delete(`http://localhost:8080/tasks/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTasks(tasks.filter(task => task.id !== id));
                setRemovingTaskId(null);
            } catch (err) {
                alert('Error deleting task');
                console.error(err);
                setRemovingTaskId(null);
            }
        }, 300);
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        setIsAddingTask(true);

        try {
            const res = await axios.post(
                'http://localhost:8080/tasks',
                { title, description, dueDate },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setNewTaskId(res.data.id);
            setTasks([res.data, ...tasks]);
            setTitle('');
            setDescription('');
            setDueDate('');
            setTimeout(() => setNewTaskId(null), 1000);
        } catch (err) {
            alert('Error adding task');
            console.error(err);
        } finally {
            setIsAddingTask(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-pink-500 border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-pink-400 text-lg animate-pulse">Loading your tasks...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 animate-fade-in">
            <AnimeBoy />

            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8 animate-slide-in-from-top">
                    <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 bg-clip-text text-transparent animate-pulse">
                            Welcome back, {username}! ✨
                        </h1>
                        <p className="text-muted-foreground mt-2 text-lg animate-fade-in" style={{ animationDelay: '0.4s' }}>
                            Manage your tasks with style
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl transition-all duration-300 transform hover:scale-110 hover:rotate-1 shadow-lg hover:shadow-xl animate-bounce-in"
                        style={{ animationDelay: '0.6s' }}
                    >
                        Logout 🚪
                    </button>
                </div>

                {/* Add Task Form */}
                <div className="bg-card/90 backdrop-blur-sm rounded-3xl p-8 mb-8 border-2 border-pink-500/30 shadow-2xl hover:shadow-pink-500/20 transition-all duration-500 animate-scale-in" style={{ animationDelay: '0.3s' }}>
                    <h2 className="text-3xl font-bold text-pink-400 mb-6 flex items-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
                        <span className="mr-3 text-4xl animate-bounce">➕</span>
                        Add New Task
                    </h2>
                    <form onSubmit={handleAddTask} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="animate-slide-in-from-left" style={{ animationDelay: '0.7s' }}>
                                <label className="block text-sm font-medium text-foreground mb-3">Title</label>
                                <input
                                    type="text"
                                    placeholder="✏️ What needs to be done?"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    className="w-full px-6 py-4 bg-input/80 border-2 border-border rounded-xl focus:ring-4 focus:ring-pink-500/30 focus:border-pink-500 transition-all duration-300 text-foreground placeholder-muted-foreground transform hover:scale-[1.02] focus:scale-[1.02]"
                                />
                            </div>
                            <div className="animate-slide-in-from-right" style={{ animationDelay: '0.8s' }}>
                                <label className="block text-sm font-medium text-foreground mb-3">Due Date</label>
                                <input
                                    type="date"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    required
                                    className="w-full px-6 py-4 bg-input/80 border-2 border-border rounded-xl focus:ring-4 focus:ring-pink-500/30 focus:border-pink-500 transition-all duration-300 text-foreground transform hover:scale-[1.02] focus:scale-[1.02]"
                                />
                            </div>
                        </div>
                        <div className="animate-slide-in-from-bottom" style={{ animationDelay: '0.9s' }}>
                            <label className="block text-sm font-medium text-foreground mb-3">Description</label>
                            <textarea
                                placeholder="📝 Add some details..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={4}
                                className="w-full px-6 py-4 bg-input/80 border-2 border-border rounded-xl focus:ring-4 focus:ring-pink-500/30 focus:border-pink-500 transition-all duration-300 text-foreground placeholder-muted-foreground resize-none transform hover:scale-[1.02] focus:scale-[1.02]"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isAddingTask}
                            className="w-full py-4 bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 hover:from-pink-600 hover:via-pink-700 hover:to-pink-800 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.05] hover:rotate-1 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-pink-500/40 animate-pulse-slow"
                            style={{ animationDelay: '1s' }}
                        >
                            {isAddingTask ? (
                                <span className="flex items-center justify-center">
                                    <div className="w-6 h-6 border-3 border-white border-l-transparent rounded-full animate-spin mr-3"></div>
                                    <span className="animate-pulse">Creating Magic...</span>
                                </span>
                            ) : (
                                <span className="flex items-center justify-center">
                                    <span className="mr-2 text-xl animate-bounce">🎯</span>
                                    Add Task
                                </span>
                            )}
                        </button>
                    </form>
                </div>

                {/* Task List */}
                <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    <div className="flex items-center mb-8">
                        <h2 className="text-3xl font-bold text-pink-400 animate-slide-in-from-left">
                            Your Tasks ({tasks.length})
                        </h2>
                        <span className="ml-4 text-2xl animate-bounce" style={{ animationDelay: '1.2s' }}>
                            {tasks.length === 0 ? '🎭' : '📋'}
                        </span>
                    </div>

                    {tasks.length === 0 ? (
                        <div className="text-center py-16 animate-scale-in" style={{ animationDelay: '1.4s' }}>
                            <div className="text-8xl mb-6 animate-bounce">🎯</div>
                            <p className="text-muted-foreground text-xl animate-fade-in" style={{ animationDelay: '1.6s' }}>
                                No tasks yet. Time to add your first one!
                            </p>
                            <div className="mt-4 text-6xl animate-pulse" style={{ animationDelay: '1.8s' }}>
                                ✨
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {tasks.map((task, index) => (
                                <div
                                    key={task.id}
                                    className={`bg-card/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-pink-500/20 shadow-xl transition-all duration-500 transform hover:scale-[1.02] hover:shadow-pink-500/30 hover:border-pink-500/40 ${
                                        newTaskId === task.id
                                            ? 'animate-bounce-in bg-gradient-to-r from-pink-500/20 to-purple-500/20'
                                            : 'animate-slide-in-from-left'
                                    } ${removingTaskId === task.id ? 'animate-slide-out-right opacity-0' : ''}`}
                                    style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-foreground mb-3 flex items-center">
                                                <span className="mr-2 text-2xl animate-pulse">🎯</span>
                                                {task.title}
                                            </h3>
                                            {task.description && (
                                                <p className="text-muted-foreground mb-4 leading-relaxed">
                                                    {task.description}
                                                </p>
                                            )}
                                            <div className="flex items-center text-sm text-pink-400">
                                                <span className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 px-4 py-2 rounded-full border border-pink-500/30 animate-pulse">
                                                    📅 Due: {new Date(task.dueDate).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleCompleteTask(task.id)}
                                            disabled={removingTaskId === task.id}
                                            className="ml-6 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl transition-all duration-300 transform hover:scale-110 hover:rotate-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-green-500/40"
                                        >
                                            {removingTaskId === task.id ? (
                                                <div className="w-6 h-6 border-2 border-white border-l-transparent rounded-full animate-spin"></div>
                                            ) : (
                                                <span className="flex items-center">
                                                    <span className="mr-2 text-xl animate-bounce">✅</span>
                                                    Complete
                                                </span>
                                            )}
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
