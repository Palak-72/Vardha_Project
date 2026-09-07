import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Building2, Save, Loader2 } from 'lucide-react';
import { authService } from '../../services/api';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
};

export default function AdminProfile() {
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@vardhawarehousing.com',
    phone: '+91 98765 43210',
    role: 'Administrator',
    bio: 'Managing Vardha Warehousing operations.',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('adminUser'));
    if (user) {
      setProfile((prev) => ({ ...prev, ...user }));
    }
  }, []);

  const handleChange = (field) => (e) => {
    setProfile((prev) => ({ ...prev, [field]: e.target.value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await authService.updateProfile(profile);
      setProfile((prev) => ({ ...prev, ...updated }));
      localStorage.setItem('adminUser', JSON.stringify(updated));
      setSaved(true);
      setIsEditing(false);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Failed to update profile', err);
      alert('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Profile | Vardha Admin</title>
      </Helmet>

      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-white mb-1">Profile</h1>
          <p className="text-sm text-concrete-400">View and edit your profile</p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-amber hover:bg-amber-600 text-steel-950 px-5 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            Edit Profile
          </button>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-steel-900 border border-steel-800 rounded-xl overflow-hidden max-w-3xl"
      >
        <div className="bg-steel-800/50 p-6 flex items-center gap-5 border-b border-steel-800">
          <div className="w-16 h-16 bg-amber text-steel-950 rounded-full flex items-center justify-center text-2xl font-display font-bold shrink-0">
            {profile.name?.charAt(0)?.toUpperCase() || 'A'}
          </div>
          <div>
            <h2 className="font-display text-xl text-white">{profile.name}</h2>
            <p className="text-sm text-concrete-400">{profile.role}</p>
            {saved && <p className="text-xs text-emerald-400 mt-1">Profile updated successfully</p>}
          </div>
        </div>

        <div className="p-6 space-y-5">
          <Field
            label="Full Name"
            icon={User}
            value={profile.name}
            onChange={handleChange('name')}
            disabled={!isEditing}
          />
          <Field
            label="Email"
            icon={Mail}
            type="email"
            value={profile.email}
            onChange={handleChange('email')}
            disabled={!isEditing}
          />
          <Field
            label="Phone"
            icon={Phone}
            value={profile.phone}
            onChange={handleChange('phone')}
            disabled={!isEditing}
          />
          <Field
            label="Role"
            icon={Building2}
            value={profile.role}
            onChange={handleChange('role')}
            disabled
          />

          <div>
            <label className="block text-[10px] uppercase tracking-[0.12em] text-steel-400 font-bold mb-2">Bio</label>
            <textarea
              value={profile.bio}
              onChange={handleChange('bio')}
              disabled={!isEditing}
              rows={3}
              className="w-full bg-steel-800 border border-steel-700 rounded-lg px-4 py-3 text-sm text-concrete-200 placeholder:text-steel-500 outline-none resize-none transition-all duration-300 focus:bg-steel-800/80 focus:border-amber disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {isEditing && (
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 bg-amber hover:bg-amber-600 text-steel-950 px-5 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  const user = JSON.parse(localStorage.getItem('adminUser'));
                  if (user) setProfile((prev) => ({ ...prev, ...user }));
                }}
                disabled={saving}
                className="px-5 py-2.5 text-sm font-medium text-concrete-300 hover:text-white border border-steel-700 hover:border-steel-600 rounded-lg transition-colors disabled:opacity-60"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function Field({ label, icon: Icon, type = 'text', value, onChange, disabled }) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.12em] text-steel-400 font-bold mb-2">{label}</label>
      <div className="relative">
        <Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-steel-500" />
        <input
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="w-full bg-steel-800 border border-steel-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-concrete-200 placeholder:text-steel-500 outline-none transition-all duration-300 focus:bg-steel-800/80 focus:border-amber disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>
    </div>
  );
}
