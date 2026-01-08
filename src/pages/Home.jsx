import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import authService from "../services/authService";

const Home = () => {
  const navigate = useNavigate();
  const isAuthenticated = authService.isAuthenticated();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-6">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">
            CollabSphere
          </span>
        </h1>

        <p className="max-w-2xl text-lg text-gray-600 mb-10">
          Your smart collaboration platform — simple, fast, and secure for teams.
        </p>

        {!isAuthenticated && (
          <button
            onClick={handleGetStarted}
            className="px-10 py-4 rounded-full bg-gradient-to-r from-purple-600 to-indigo-500 text-white text-lg font-semibold shadow-lg hover:scale-105 transition-transform"
          >
            Get Started
          </button>
        )}

        {isAuthenticated && (
          <div className="mt-12 bg-white p-8 rounded-2xl shadow-lg max-w-lg">
            <h2 className="text-2xl font-bold mb-2">🎉 You're all set!</h2>
            <p className="text-gray-600 mb-6">
              Start collaborating with your teams.
            </p>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold">0</p>
                <p className="text-sm text-gray-500">Teams</p>
              </div>
              <div>
                <p className="text-2xl font-bold">0</p>
                <p className="text-sm text-gray-500">Messages</p>
              </div>
              <div>
                <p className="text-2xl font-bold">0</p>
                <p className="text-sm text-gray-500">Files</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
          <div className="text-4xl mb-4">👥</div>
          <h3 className="text-xl font-bold mb-2">Team Collaboration</h3>
          <p className="text-gray-600 text-sm">
            Collaborate in real-time with team members across projects.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
          <div className="text-4xl mb-4">📁</div>
          <h3 className="text-xl font-bold mb-2">File Management</h3>
          <p className="text-gray-600 text-sm">
            Upload and share files securely using cloud storage.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
          <div className="text-4xl mb-4">🚀</div>
          <h3 className="text-xl font-bold mb-2">Fast & Secure</h3>
          <p className="text-gray-600 text-sm">
            JWT authentication with scalable cloud deployment.
          </p>
        </div>
      </section>

      {/* Stats Section (Public Only) */}
      {!isAuthenticated && (
        <section className="bg-white/70 backdrop-blur py-16">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-extrabold">10K+</p>
              <p className="text-gray-500 text-sm">Active Users</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold">50K+</p>
              <p className="text-gray-500 text-sm">Projects</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold">99.9%</p>
              <p className="text-gray-500 text-sm">Uptime</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold">24/7</p>
              <p className="text-gray-500 text-sm">Support</p>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} CollabSphere. Built with ❤️ for teams.
      </footer>
    </div>
  );
};

export default Home;
