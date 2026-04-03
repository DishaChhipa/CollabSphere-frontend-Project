import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { User, Mail, Shield, Camera } from 'lucide-react';
import userService from '../services/userService';

const Profile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    const result = await userService.updateProfile(user.id, { name: formData.name });
    if (result.success) {
      setStatus({ type: 'success', message: 'Profile updated successfully!' });
    } else {
      setStatus({ type: 'error', message: result.error });
    }
    setLoading(false);
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      setStatus({ type: 'error', message: 'Passwords do not match!' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    const result = await userService.updatePassword(user.id, { password: passwords.newPassword });
    if (result.success) {
      setStatus({ type: 'success', message: 'Password updated successfully!' });
      setPasswords({ newPassword: '', confirmPassword: '' });
    } else {
      setStatus({ type: 'error', message: result.error });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Account Settings</h1>
        <p className="text-slate-500 font-medium">Manage your personal information and security preferences.</p>
        
        {status.message && (
          <div className={`mt-4 p-4 rounded-xl text-sm font-medium ${
            status.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'
          }`}>
            {status.message}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: Avatar & Identity */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
            <div className="relative group mb-6">
              <div className="w-24 h-24 rounded-3xl bg-indigo-600 flex items-center justify-center text-white text-3xl font-extrabold shadow-xl shadow-indigo-100 group-hover:scale-105 transition-transform">
                {user?.name?.[0].toUpperCase()}
              </div>
              <button className="absolute -bottom-2 -right-2 p-2 bg-white border border-slate-100 rounded-xl shadow-lg text-slate-400 hover:text-indigo-600 transition-colors">
                <Camera size={16} />
              </button>
            </div>
            <h3 className="text-xl font-bold text-slate-900">{user?.name}</h3>
            <p className="text-sm text-slate-500 font-medium mb-6">{user?.email}</p>
            <div className="w-full pt-6 border-t border-slate-50">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full uppercase tracking-wider">
                <Shield size={10} /> Verified Account
              </span>
            </div>
          </div>
        </div>

        {/* Right: Forms */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h4 className="text-lg font-bold text-slate-900 mb-6">Personal Details</h4>
            <form className="space-y-6" onSubmit={handleProfileUpdate}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                  label="Full Name" 
                  value={formData.name} 
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  icon={User} 
                />
                <Input label="Email Address" value={formData.email} icon={Mail} disabled />
              </div>
              <div className="pt-4">
                <Button className="px-8" type="submit" loading={loading}>Save Changes</Button>
              </div>
            </form>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h4 className="text-lg font-bold text-slate-900 mb-6">Security</h4>
            <form className="space-y-6" onSubmit={handlePasswordUpdate}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                  label="New Password" 
                  type="password" 
                  placeholder="••••••••" 
                  value={passwords.newPassword}
                  onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                  icon={Shield} 
                />
                <Input 
                  label="Confirm New Password" 
                  type="password" 
                  placeholder="••••••••" 
                  value={passwords.confirmPassword}
                  onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                  icon={Shield} 
                />
              </div>
              <div className="pt-4">
                <Button variant="secondary" className="px-8" type="submit" loading={loading}>Update Password</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
