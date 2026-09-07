import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Save, Loader2, Bell, Shield, Palette } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
};

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: 'Vardha Warehousing',
    adminEmail: 'admin@vardhawarehousing.com',
    notifications: true,
    emailAlerts: true,
    autoRespond: true,
    darkMode: true,
    compactView: false,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setSettings((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Failed to save settings', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Settings | Vardha Admin</title>
      </Helmet>

      <div className="mb-8">
        <h1 className="font-display text-3xl text-white mb-1">Settings</h1>
        <p className="text-sm text-concrete-400">Configure your admin panel preferences</p>
      </div>

      <div className="space-y-6 max-w-3xl">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={0}
          className="bg-steel-900 border border-steel-800 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-amber/10 rounded-lg">
              <Palette size={20} className="text-amber" />
            </div>
            <div>
              <h2 className="font-display text-lg text-white">General</h2>
              <p className="text-xs text-concrete-400">Basic site configuration</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.12em] text-steel-400 font-bold mb-2">Site Name</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={handleChange('siteName')}
                className="w-full bg-steel-800 border border-steel-700 rounded-lg px-4 py-2.5 text-sm text-concrete-200 outline-none focus:border-amber transition-colors"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.12em] text-steel-400 font-bold mb-2">Admin Email</label>
              <input
                type="email"
                value={settings.adminEmail}
                onChange={handleChange('adminEmail')}
                className="w-full bg-steel-800 border border-steel-700 rounded-lg px-4 py-2.5 text-sm text-concrete-200 outline-none focus:border-amber transition-colors"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={1}
          className="bg-steel-900 border border-steel-800 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-400/10 rounded-lg">
              <Bell size={20} className="text-blue-400" />
            </div>
            <div>
              <h2 className="font-display text-lg text-white">Notifications</h2>
              <p className="text-xs text-concrete-400">Manage notification preferences</p>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { key: 'notifications', label: 'Push Notifications', desc: 'Receive notifications in the admin panel' },
              { key: 'emailAlerts', label: 'Email Alerts', desc: 'Get notified via email for new submissions' },
              { key: 'autoRespond', label: 'Auto-responder', desc: 'Send automatic replies to contact form submissions' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-white">{item.label}</p>
                  <p className="text-xs text-concrete-400">{item.desc}</p>
                </div>
                <Toggle checked={settings[item.key]} onChange={handleChange(item.key)} />
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={2}
          className="bg-steel-900 border border-steel-800 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-emerald-400/10 rounded-lg">
              <Shield size={20} className="text-emerald-400" />
            </div>
            <div>
              <h2 className="font-display text-lg text-white">Security</h2>
              <p className="text-xs text-concrete-400">Security and access settings</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-white">Dark Mode</p>
                <p className="text-xs text-concrete-400">Use dark theme for admin panel</p>
              </div>
              <Toggle checked={settings.darkMode} onChange={handleChange('darkMode')} />
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-white">Compact View</p>
                <p className="text-xs text-concrete-400">Show more data in less space</p>
              </div>
              <Toggle checked={settings.compactView} onChange={handleChange('compactView')} />
            </div>
          </div>
        </motion.div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 bg-amber hover:bg-amber-600 text-steel-950 px-5 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
          {saved && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm text-emerald-400"
            >
              Settings saved successfully
            </motion.span>
          )}
        </div>
      </div>
    </div>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${checked ? 'bg-amber' : 'bg-steel-700'}`}
    >
      <span
        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${checked ? 'translate-x-5' : 'translate-x-0'}`}
      />
    </button>
  );
}
