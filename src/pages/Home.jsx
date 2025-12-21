import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import authService from '../services/authService';

const Home = () => {
    const navigate = useNavigate();
    const isAuthenticated = authService.isAuthenticated();

    useEffect(() => {
        // If user is not authenticated, show landing page
        // If authenticated, this is the main dashboard
        if (!isAuthenticated) {
            // Optional: Could redirect to login or show public landing
        }
    }, [isAuthenticated]);

    const handleGetStarted = () => {
        if (isAuthenticated) {
            // Already logged in, stay on home
            return;
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="page-container">
            <Navbar />

            <div className="home-container">
                {/* Hero Section */}
                <section className="hero-section">
                    <div className="hero-bg-decoration decoration-1"></div>
                    <div className="hero-bg-decoration decoration-2"></div>

                    <div className="hero-content">
                        <h1 className="hero-title">
                            Welcome to <span className="gradient-text">CollabSphere</span>
                        </h1>

                        <p className="hero-subtitle">
                            Your smart collaboration platform — simple, fast & powerful.
                        </p>

                        {isAuthenticated ? (
                            <div className="dashboard-welcome">
                                <h2>🎉 You're all set!</h2>
                                <p>Start collaborating with your teams.</p>
                                <div className="dashboard-quick-stats">
                                    <div className="stat-item">
                                        <div className="stat-value">0</div>
                                        <div className="stat-label">Active Teams</div>
                                    </div>
                                    <div className="stat-item">
                                        <div className="stat-value">0</div>
                                        <div className="stat-label">Messages</div>
                                    </div>
                                    <div className="stat-item">
                                        <div className="stat-value">0</div>
                                        <div className="stat-label">Files Shared</div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <button className="cta-button" onClick={handleGetStarted}>
                                Get Started
                            </button>
                        )}

                        {/* Feature Cards */}
                        <div className="feature-grid">
                            <div className="feature-card">
                                <div className="feature-icon">👥</div>
                                <h3 className="feature-title">Team Collaboration</h3>
                                <p className="feature-desc">
                                    Work together seamlessly in real-time with your team members
                                </p>
                            </div>

                            <div className="feature-card">
                                <div className="feature-icon">📁</div>
                                <h3 className="feature-title">File Management</h3>
                                <p className="feature-desc">
                                    Organize and share files effortlessly with secure cloud storage
                                </p>
                            </div>

                            <div className="feature-card">
                                <div className="feature-icon">🚀</div>
                                <h3 className="feature-title">Fast & Secure</h3>
                                <p className="feature-desc">
                                    Lightning-fast performance with enterprise-grade security
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                {!isAuthenticated && (
                    <section className="stats-section">
                        <div className="stats-container">
                            <div className="stat-box">
                                <div className="stat-value">10K+</div>
                                <div className="stat-label">Active Users</div>
                            </div>
                            <div className="stat-box">
                                <div className="stat-value">50K+</div>
                                <div className="stat-label">Projects</div>
                            </div>
                            <div className="stat-box">
                                <div className="stat-value">99.9%</div>
                                <div className="stat-label">Uptime</div>
                            </div>
                            <div className="stat-box">
                                <div className="stat-value">24/7</div>
                                <div className="stat-label">Support</div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Footer */}
                <footer className="footer">
                    <p>&copy; 2024 CollabSphere. All rights reserved. Built with ❤️ for teams.</p>
                </footer>
            </div>
        </div>
    );
};

export default Home;