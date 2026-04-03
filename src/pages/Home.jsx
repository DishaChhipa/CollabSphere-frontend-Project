import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import authService from "../services/authService";
import teamService from "../services/teamService";
import messageService from "../services/messageService";
import fileService from "../services/fileService";
import heroImg from "../assets/hero.png";
import featuresImg from "../assets/features.png";
import logo from "../assets/logo.png";

const Home = () => {
  const navigate = useNavigate();
  const isAuthenticated = authService.isAuthenticated();
  const [stats, setStats] = useState({
    teams: 0,
    messages: 0,
    files: 0
  });

  useEffect(() => {
    if (isAuthenticated) {
      // Auto-redirect to dashboard if already logged in
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-slate-900 border-b border-white/5">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/20 via-slate-900/0 to-slate-900/0 opacity-70"></div>
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Next Gen Collaboration
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
              Reimagine How <br/>
              <span className="text-gradient">Teams Work.</span>
            </h1>
            <p className="text-xl text-slate-400 mb-10 max-w-xl mx-auto lg:mx-0">
              CollabSphere is the unified workspace that brings your teams, files, and conversations together. Simple, fast, and remarkably secure.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              {!isAuthenticated ? (
                <>
                  <button
                    onClick={() => navigate("/register")}
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-indigo-600 text-white font-bold text-lg shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:bg-indigo-700 hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] transition-all transform hover:-translate-y-0.5"
                  >
                    Start for Free
                  </button>
                  <button
                    onClick={() => navigate("/login")}
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 text-white font-bold text-lg border border-white/10 hover:bg-white/10 transition-all"
                  >
                    Live Demo
                  </button>
                </>
              ) : (
                <button
                  onClick={() => navigate("/dashboard")}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-indigo-600 text-white font-bold text-lg shadow-lg hover:bg-indigo-700 transition-all"
                >
                  Go to Dashboard
                </button>
              )}
            </div>
          </div>
          <div className="hidden lg:block relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-3xl blur-2xl"></div>
            <img 
              src={heroImg} 
              alt="CollabSphere Platform" 
              className="relative rounded-2xl shadow-2xl border border-white/10 object-cover w-full aspect-[4/3]"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Active Users", val: "10K+" },
              { label: "Projects Completed", val: "50K+" },
              { label: "File Uptime", val: "99.9%" },
              { label: "Happy Teams", val: "2.5K" }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-3xl font-extrabold text-slate-900">{stat.val}</p>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">Core Capabilities</h2>
          <h3 className="text-4xl font-extrabold text-slate-900 mb-4">Everything your team needs</h3>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Powerful features built for modern teams that want to move fast without breaking things.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Real-time Messaging", 
              desc: "Instant communication with channel-based organization for every project.",
              icon: "💬"
            },
            { 
              title: "Cloud File Storage", 
              desc: "Securely upload, share, and collaborate on documents with your entire team.",
              icon: "☁️"
            },
            { 
              title: "Team Management", 
              desc: "Control access, roles, and project permissions from a single dashboard.",
              icon: "🛡️"
            }
          ].map((feature, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all group hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-indigo-50 flex items-center justify-center text-2xl mb-6 shadow-highlight group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h4>
              <p className="text-slate-600 mb-6">{feature.desc}</p>
              <button className="text-indigo-600 font-bold text-sm flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                Learn more <span>→</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Showcase Section */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="absolute -inset-10 bg-indigo-500/5 rounded-full blur-3xl"></div>
            <img src={featuresImg} alt="Features Showcase" className="relative rounded-3xl shadow-lg" />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-6 leading-tight">
              The only platform that scales with your ambition.
            </h2>
            <div className="space-y-6">
              {[
                { t: "Intuitive Interface", d: "Designed for humans, not machines. Minimal learning curve." },
                { t: "Global Security", d: "Bank-grade encryption for all your conversations and data." },
                { t: "Seamless Integration", d: "Works with the tools you already use every day." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</div>
                  <div>
                    <h5 className="font-bold text-slate-900">{item.t}</h5>
                    <p className="text-slate-600">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center overflow-hidden">
                <img src={logo} alt="Logo" className="w-7 h-7" />
              </div>
              <span className="text-white text-xl font-bold">CollabSphere</span>
            </div>
            <p className="text-slate-400 max-w-sm mb-8">
              Empowering teams to achieve greatness together through seamless, secure, and modern collaboration tools.
            </p>
          </div>
          <div>
            <h5 className="text-white font-bold mb-6">Product</h5>
            <ul className="space-y-4 text-slate-400">
              <li><button className="hover:text-white transition">Features</button></li>
              <li><button className="hover:text-white transition">Pricing</button></li>
              <li><button className="hover:text-white transition">Enterprise</button></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-bold mb-6">Company</h5>
            <ul className="space-y-4 text-slate-400">
              <li><button className="hover:text-white transition">About Us</button></li>
              <li><button className="hover:text-white transition">Careers</button></li>
              <li><button className="hover:text-white transition">Privacy</button></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm italic">
            Built with ❤️ for teams everywhere.
          </p>
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} CollabSphere Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
