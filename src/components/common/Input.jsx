import React from 'react';

const Input = ({ 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  error, 
  icon: Icon,
  className = '',
  required = false,
  name
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
            <Icon size={18} />
          </div>
        )}
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`
            w-full py-3.5 rounded-xl border transition-all bg-slate-50/50 outline-none
            ${Icon ? 'pl-11 pr-4' : 'px-4'}
            ${error ? 'border-red-300 focus:ring-red-500/10 focus:border-red-500' : 'border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500'}
          `}
        />
      </div>
      {error && <p className="mt-1.5 ml-1 text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
