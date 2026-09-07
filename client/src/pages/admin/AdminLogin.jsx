import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, Loader2 } from 'lucide-react';
import { authService } from '../../services/api';

export default function AdminLogin() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const update = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await authService.login(formData);
      localStorage.setItem('adminToken', data.token);
      if (data.user) localStorage.setItem('adminUser', JSON.stringify(data.user));
      window.location.href = '/admin';
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-steel-950 flex items-center justify-center p-4">
      <Helmet>
        <title>Admin Login | Vardha</title>
      </Helmet>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[480px] h-[480px] rounded-full bg-amber/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[480px] h-[480px] rounded-full bg-white/[0.02] blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative w-full max-w-md"
      >
        <div className="bg-steel-900 border border-steel-800 rounded-2xl p-8 lg:p-10 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-amber text-steel-950 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber/20">
              <span className="font-display text-2xl font-bold">V</span>
            </div>
            <h1 className="font-display text-2xl text-white mb-1">Admin Login</h1>
            <p className="text-sm text-concrete-400">Sign in to access the admin panel</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-lg mb-6"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.12em] text-steel-400 font-bold mb-2">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-steel-500" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={update('email')}
                  required
                  placeholder="admin@example.com"
                  className="w-full bg-steel-800 border border-steel-700 rounded-lg pl-10 pr-4 py-3 text-sm text-concrete-200 placeholder:text-steel-500 outline-none transition-all duration-300 focus:bg-steel-800/80 focus:border-amber"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.12em] text-steel-400 font-bold mb-2">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-steel-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={update('password')}
                  required
                  placeholder="Enter your password"
                  className="w-full bg-steel-800 border border-steel-700 rounded-lg pl-10 pr-12 py-3 text-sm text-concrete-200 placeholder:text-steel-500 outline-none transition-all duration-300 focus:bg-steel-800/80 focus:border-amber"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-steel-500 hover:text-concrete-300 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full overflow-hidden bg-amber hover:bg-amber-600 text-steel-950 px-6 py-3.5 text-sm font-bold rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-amber/20 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-white/10 skew-x-[-20deg] transition-transform duration-700" />
              <span className="relative flex items-center justify-center gap-3">
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </span>
            </button>
          </form>

          <p className="text-center text-xs text-steel-500 mt-6">
            <Link to="/" className="text-amber hover:text-amber-400 transition-colors">
              Back to website
            </Link>
          </p>
        </div>

        <p className="text-center text-[10px] text-steel-600 mt-6 uppercase tracking-[0.12em]">
          Vardha Warehousing Admin Panel
        </p>
      </motion.div>
    </div>
  );
}
