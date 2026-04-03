import React from 'react';
import { Info, Shield, Users, Zap, Globe, Heart } from 'lucide-react';
import logo from '../assets/logo.png';

const About = () => {
    return (
        <div className="max-w-4xl mx-auto py-12 px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="text-center mb-16">
                <div className="inline-flex p-4 rounded-3xl bg-indigo-50 mb-6 border border-indigo-100 shadow-sm">
                    <img src={logo} alt="CollabSphere" className="w-16 h-16 object-contain" />
                </div>
                <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight mb-4 text-gradient">
                    CollabSphere
                </h1>
                <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
                    The next-gen collaborative workspace designed for high-performance teams.
                </p>
            </div>

            {/* Mission Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Our Mission</h2>
                    <p className="text-slate-600 leading-relaxed text-lg">
                        CollabSphere was born from a simple idea: that communication should be effortless, 
                        secure, and deeply integrated into the work we do every day.
                    </p>
                    <p className="text-slate-600 leading-relaxed text-lg">
                        We aim to provide a uniform, professional, and engaging platform that rivals the 
                        industry leaders while maintaining a focus on simplicity and user experience.
                    </p>
                </div>
                <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-white shadow-xl shadow-indigo-200">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                            <Zap size={24} />
                        </div>
                        <h3 className="text-xl font-bold">Key Philosophy</h3>
                    </div>
                    <ul className="space-y-4 font-medium text-indigo-50">
                        <li className="flex items-start gap-3">
                            <span className="text-indigo-200 font-bold">•</span>
                            Uniform Design Language
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-indigo-200 font-bold">•</span>
                            Secure-by-Default Communication
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-indigo-200 font-bold">•</span>
                            Real-time Collaboration Focus
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-indigo-200 font-bold">•</span>
                            Privacy & Data Integrity
                        </li>
                    </ul>
                </div>
            </div>

            {/* Features Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl mb-20">
                {[
                    { icon: Shield, label: 'Secure', value: 'Enterprise Grade', color: 'text-blue-600' },
                    { icon: Globe, label: 'Distributed', value: 'Global Network', color: 'text-indigo-600' },
                    { icon: Heart, label: 'Modern', value: 'Loved by Devs', color: 'text-purple-600' },
                ].map((item, i) => (
                    <div key={i} className="text-center space-y-2">
                        <div className={`mx-auto w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center ${item.color} mb-2`}>
                            <item.icon size={24} />
                        </div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
                        <h4 className="text-lg font-bold text-slate-900">{item.value}</h4>
                    </div>
                ))}
            </div>

            {/* Team/Credits */}
            <div className="text-center border-t border-slate-100 pt-16">
                <div className="flex items-center justify-center gap-2 text-slate-400 font-bold text-sm uppercase tracking-[0.2em] mb-4">
                    <Users size={16} />
                    <span>Built for the Future</span>
                </div>
                <p className="text-slate-500 italic max-w-md mx-auto">
                    "Collaboration is not just about tools, it's about connecting minds across any distance."
                </p>
            </div>
        </div>
    );
};

export default About;
