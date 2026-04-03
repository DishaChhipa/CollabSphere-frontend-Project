import React, { useState } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import { Users, Info } from 'lucide-react';

const CreateTeamModal = ({ isOpen, onClose, onCreate }) => {
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    
    setLoading(true);
    setError('');
    
    const result = await onCreate(formData.name, formData.description);
    if (result.success) {
      setFormData({ name: '', description: '' });
      onClose();
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Team">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 text-xs font-bold text-red-500 bg-red-50 border border-red-100 rounded-xl">
            {error}
          </div>
        )}
        
        <Input
          label="Team Name"
          placeholder="e.g., Marketing Squad, Dev Team"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          icon={Users}
        />

        <div className="w-full">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
            Description (Optional)
          </label>
          <div className="relative group">
            <div className="absolute left-4 top-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
              <Info size={18} />
            </div>
            <textarea
              placeholder="What is this team about?"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full py-3.5 pl-11 pr-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-slate-50/50 min-h-[100px] resize-none text-sm font-medium"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button variant="secondary" className="flex-1" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" className="flex-2" loading={loading}>
            Create Team
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateTeamModal;
