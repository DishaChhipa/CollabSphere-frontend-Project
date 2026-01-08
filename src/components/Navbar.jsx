import React from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const Navbar = () => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();
  const isAuthenticated = authService.isAuthenticated();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      authService.logout();
      navigate("/login");
    }
  };

  const handleLogoClick = () => {
    navigate(isAuthenticated ? "/home" : "/");
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-500 px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <div
          onClick={handleLogoClick}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-white text-purple-600 font-bold flex items-center justify-center">
            C
          </div>
          <span className="text-white text-xl font-bold">
            CollabSphere
          </span>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <span className="text-white text-sm hidden md:block">
                Welcome, <strong>{user?.name || user?.email}</strong>
              </span>

              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-full bg-white/20 text-white font-medium hover:bg-white/30 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/")}
                className="text-white font-medium hover:underline"
              >
                Home
              </button>

              <button
                onClick={() => navigate("/login")}
                className="px-5 py-2 rounded-full bg-white text-purple-600 font-semibold hover:bg-gray-100 transition"
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
