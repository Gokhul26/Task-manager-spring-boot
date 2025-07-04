// File: src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import { getToken, getUsernameFromToken } from './auth'; // ✅ FIXED: import here
import Signup from './pages/Signup';

function App() {
    const token = localStorage.getItem('token');
    console.log("Token:", token);
    console.log("Username:", getUsernameFromToken());

    return (
        <Router>
            <Routes>
                <Route path="/" element={token ? <Navigate to="/home" /> : <Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={token ? <Home /> : <Navigate to="/login" />} />
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </Router>
    );
}

export default App;
