import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { setToken } from '../auth';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await axios.post('http://localhost:8080/auth/login', {
                username,
                password,
            });
            setToken(res.data.token);
            navigate('/home');
        } catch (err) {
            alert('Invalid credentials');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 animate-fade-in">
            <div className="w-full max-w-md">
                <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-pink-500/20 animate-scale-in hover:shadow-pink-500/20 transition-all duration-500">
                    <div className="text-center mb-8 animate-slide-in-from-top">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 bg-clip-text text-transparent mb-2 animate-pulse">
                            Welcome Back ✨
                        </h1>
                        <p className="text-muted-foreground animate-fade-in" style={{ animationDelay: '0.2s' }}>
                            Sign in to your magical task world
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2 animate-slide-in-from-left" style={{ animationDelay: '0.3s' }}>
                            <label className="text-sm font-medium text-foreground flex items-center">
                                <span className="mr-2 text-lg animate-bounce">👤</span>
                                Username
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-input border-2 border-border rounded-xl focus:ring-4 focus:ring-pink-500/30 focus:border-pink-500 transition-all duration-300 text-foreground placeholder-muted-foreground transform hover:scale-[1.02] focus:scale-[1.02]"
                            />
                        </div>

                        <div className="space-y-2 animate-slide-in-from-right" style={{ animationDelay: '0.4s' }}>
                            <label className="text-sm font-medium text-foreground flex items-center">
                                <span className="mr-2 text-lg animate-bounce" style={{ animationDelay: '0.1s' }}>🔒</span>
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-input border-2 border-border rounded-xl focus:ring-4 focus:ring-pink-500/30 focus:border-pink-500 transition-all duration-300 text-foreground placeholder-muted-foreground transform hover:scale-[1.02] focus:scale-[1.02]"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 hover:from-pink-600 hover:via-pink-700 hover:to-pink-800 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.05] hover:rotate-1 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-pink-500/40 animate-bounce-in"
                            style={{ animationDelay: '0.5s' }}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <div className="w-6 h-6 border-3 border-white border-l-transparent rounded-full animate-spin mr-3"></div>
                                    <span className="animate-pulse">Signing in...</span>
                                </span>
                            ) : (
                                <span className="flex items-center justify-center">
                                    <span className="mr-2 text-xl animate-bounce">🚀</span>
                                    Sign In
                                </span>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
                        <p className="text-muted-foreground">
                            Don’t have an account?{' '}
                            <Link
                                to="/signup"
                                className="text-pink-400 hover:text-pink-300 transition-all duration-300 font-medium transform hover:scale-110 inline-block hover:rotate-1"
                            >
                                <span className="mr-1 animate-bounce">✨</span>
                                Sign up here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
