import React from 'react';
import { Outlet } from 'react-router-dom';
import logo from '../assets/logo.png';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 relative overflow-hidden font-inter">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10 py-10">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-10">
          <Outlet />
        </div>
        
        <p className="text-center mt-8 text-slate-400 text-xs font-medium">
          © {new Date().getFullYear()} CollabSphere Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
