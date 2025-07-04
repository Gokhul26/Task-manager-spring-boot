// File: src/auth.js
import { jwtDecode } from 'jwt-decode';

export const setToken = (token) => {
    localStorage.setItem('token', token);
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const removeToken = () => {
    localStorage.removeItem('token');
};

export const isAuthenticated = () => {
    return !!getToken();
};

export const getUsernameFromToken = () => {
    const token = getToken();
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        return decoded.sub;
    } catch (error) {
        console.error('Invalid token:', error);
        return null;
    }
};
