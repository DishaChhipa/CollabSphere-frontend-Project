import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import logo from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      navigate("/login");
    }
  };

  const handleLogoClick = () => {
    navigate(isAuthenticated ? "/dashboard" : "/");
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 ${
        isScrolled ? "glass shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <div
          onClick={handleLogoClick}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center overflow-hidden group-hover:shadow-md transition-all">
            <img src={logo} alt="CollabSphere Logo" className="w-8 h-8 object-contain" />
          </div>
          <span className={`text-xl font-bold tracking-tight transition-colors ${
            isScrolled ? "text-slate-900" : "text-white"
          }`}>
            CollabSphere
          </span>
        </div>

        {/* Navigation Links (Public) */}
        {!isAuthenticated && (
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => navigate("/")} className={`font-medium transition-colors ${isScrolled ? "text-slate-600 hover:text-indigo-600" : "text-white/80 hover:text-white"}`}>Home</button>
            <a href="#features" className={`font-medium transition-colors ${isScrolled ? "text-slate-600 hover:text-indigo-600" : "text-white/80 hover:text-white"}`}>Features</a>
            <a href="#about" className={`font-medium transition-colors ${isScrolled ? "text-slate-600 hover:text-indigo-600" : "text-white/80 hover:text-white"}`}>About</a>
          </div>
        )}

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <div className={`p-2 rounded-lg flex items-center gap-2 ${isScrolled ? "bg-slate-100" : "bg-white/10 text-white"}`}>
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                  {user?.name?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium hidden md:block">
                  {user?.name || user?.email.split('@')[0]}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-lg bg-red-50 text-red-600 text-sm font-semibold hover:bg-red-100 transition shadow-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/login")}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  isScrolled 
                    ? "text-indigo-600 hover:bg-indigo-50" 
                    : "text-white hover:bg-white/10"
                }`}
              >
                Sign In
              </button>

              <button
                onClick={() => navigate("/register")}
                className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition shadow-md hover:shadow-lg"
              >
                Join Now
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
