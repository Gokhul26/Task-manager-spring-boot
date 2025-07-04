// File: src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../auth';

function Login() {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8080/auth/login',
                credentials
            );
            setToken(response.data.token); // 🔐 Save token
            navigate('/tasks');
        } catch (error) {
            alert('Invalid username or password');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input
                placeholder="Username"
                value={credentials.username}
                onChange={e => setCredentials({ ...credentials, username: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={e => setCredentials({ ...credentials, password: e.target.value })}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
