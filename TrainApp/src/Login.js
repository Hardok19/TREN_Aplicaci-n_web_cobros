import React, { useState } from 'react';
import axios from 'axios';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
import RoutesDashboard from './RoutesDashboard';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [showRoutesDashboard      , setShowRoutesDashboard] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/authenticate', {
                username,
                password,
            });
            setUserInfo(response.data);
            setMessage('Login successful');
        } catch (error) {
            setMessage('Login failed');
        }
    };

    if (userInfo) {
        if (username === 'admin' && password === 'admin') {
            return <AdminDashboard />;
        } else {
            return <UserDashboard />;
        }
    }

    const handleRoutesClick = () => {
        setShowRoutesDashboard(true);
    };

    if (showRoutesDashboard) {
        return <RoutesDashboard />;
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
            <button onClick={handleRoutesClick}>Routes</button>
        </div>
    );
}

export default Login;
