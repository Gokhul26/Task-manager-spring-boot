import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [user, setUser] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await axios.post('http://localhost:8080/auth/register', user);
            alert('Registration successful');
            navigate('/login');
        } catch (error) {
            alert('Registration failed');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <input placeholder="Username" onChange={e => setUser({ ...user, username: e.target.value })} />
            <input type="password" placeholder="Password" onChange={e => setUser({ ...user, password: e.target.value })} />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
}

export default Register;
