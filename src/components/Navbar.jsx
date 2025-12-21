import React from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Navbar = () => {
    const navigate = useNavigate();
    const user = authService.getCurrentUser();
    const isAuthenticated = authService.isAuthenticated();

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            authService.logout();
        }
    };

    const handleLogoClick = () => {
        if (isAuthenticated) {
            navigate('/home');
        } else {
            navigate('/');
        }
    };

    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="nav-logo" onClick={handleLogoClick}>
                    <div className="logo-icon">C</div>
                    <span className="logo-text">CollabSphere</span>
                </div>

                <div className="nav-links">
                    {isAuthenticated ? (
                        <>
                            <span className="nav-user">
                                Welcome, <strong>{user?.name || user?.email}</strong>
                            </span>
                            <button 
                                className="nav-link nav-logout-btn" 
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button 
                                className="nav-link" 
                                onClick={() => navigate('/')}
                            >
                                Home
                            </button>
                            <button 
                                className="nav-link nav-login-btn" 
                                onClick={() => navigate('/login')}
                            >
                                Login
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;