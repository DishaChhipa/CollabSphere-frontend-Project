import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import logo from "../assets/logo.png";
import Button from "../components/common/Button";
import Input from "../components/common/Input";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [successMsg, setSuccessMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMsg(location.state.message);
      // Clear location state to prevent message from showing again on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    setLoading(true);

    const result = await login(email, password);
    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <>
      {/* Logo & Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-slate-50 shadow-sm flex items-center justify-center mb-4 border border-slate-100">
          <img src={logo} alt="CollabSphere" className="w-10 h-10 object-contain" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
          Welcome back
        </h2>
        <p className="text-slate-500 font-medium">
          Enter your credentials to continue
        </p>
      </div>

      {/* Success Message */}
      {successMsg && (
        <div className="mb-6 text-sm text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <span className="mt-0.5">✅</span>
          {successMsg}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3 flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <span className="mt-0.5">⚠️</span>
          {error}
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Email Address"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@company.com"
          icon={Mail}
        />

        <div className="relative">
          <button type="button" className="absolute right-1 top-0 text-xs font-bold text-indigo-600 hover:text-indigo-700 z-10">Forgot?</button>
          <Input
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            icon={Lock}
          />
        </div>

        <Button
          type="submit"
          loading={loading}
          className="w-full py-4 mt-2"
        >
          Sign In
        </Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-slate-500 font-medium italic">or continue with</span>
          </div>
        </div>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors font-semibold text-slate-700 shadow-sm"
          onClick={() => alert("Google Login coming soon!")}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google
        </button>
      </form>

      {/* Footer */}
      <div className="mt-10 text-center pt-8 border-t border-slate-50">
        <p className="text-slate-500 text-sm font-medium">
          New to CollabSphere?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-indigo-600 font-bold hover:underline"
          >
            Create an account
          </button>
        </p>
      </div>
    </>
  );
};

export default Login;
