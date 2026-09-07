import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Mail,
  MessageSquare,
  User,
  Settings,
  ExternalLink,
  LogOut,
  Search,
  Bell,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/contacts', icon: Mail, label: 'Contact' },
  { to: '/admin/enquiries', icon: MessageSquare, label: 'Inquiry' },
  { to: '/admin/profile', icon: User, label: 'Profile' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' },
  { to: '/', icon: ExternalLink, label: 'Go to Website', external: true },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = () => setProfileOpen(false);
    if (profileOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [profileOpen]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-steel-950 text-white flex">
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-steel-900 border-r border-steel-800 lg:hidden"
            >
              <SidebarContent onClose={() => setSidebarOpen(false)} onLogout={handleLogout} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <aside className="hidden lg:flex flex-col w-72 bg-steel-900 border-r border-steel-800 fixed inset-y-0 left-0 z-30">
        <SidebarContent onLogout={handleLogout} />
      </aside>

      <div className="flex-1 lg:ml-72 flex flex-col min-h-screen">
        <header className="sticky top-0 z-20 bg-steel-950/80 backdrop-blur-md border-b border-steel-800 h-16 flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-concrete-300 hover:text-amber transition-colors"
              aria-label="Toggle menu"
            >
              <Menu size={22} />
            </button>
            <div className="hidden sm:flex items-center gap-3 bg-steel-900 border border-steel-800 rounded-lg px-4 py-2 w-80">
              <Search size={16} className="text-steel-500 shrink-0" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent text-sm text-concrete-200 placeholder:text-steel-500 outline-none w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2 text-concrete-300 hover:text-amber transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber rounded-full" />
            </button>

            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setProfileOpen(!profileOpen);
                }}
                className="flex items-center gap-3 p-1.5 pr-3 rounded-lg hover:bg-steel-900 transition-colors"
              >
                <div className="w-8 h-8 bg-amber text-steel-950 rounded-full flex items-center justify-center font-bold text-sm">
                  A
                </div>
                <span className="hidden sm:block text-sm font-medium text-concrete-200">Admin</span>
                <ChevronDown size={16} className="hidden sm:block text-steel-400" />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-steel-900 border border-steel-800 rounded-lg shadow-xl overflow-hidden"
                  >
                    <NavLink
                      to="/admin/profile"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-concrete-200 hover:bg-steel-800 hover:text-amber transition-colors"
                      onClick={() => setProfileOpen(false)}
                    >
                      <User size={16} />
                      Profile
                    </NavLink>
                    <NavLink
                      to="/admin/settings"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-concrete-200 hover:bg-steel-800 hover:text-amber transition-colors"
                      onClick={() => setProfileOpen(false)}
                    >
                      <Settings size={16} />
                      Settings
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-steel-800 hover:text-red-300 transition-colors"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function SidebarContent({ onClose, onLogout }) {
  return (
    <>
      <div className="p-6 border-b border-steel-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber text-steel-950 flex items-center justify-center rounded">
            <span className="font-display text-xl font-bold">V</span>
          </div>
          <div>
            <span className="font-display text-lg font-bold tracking-wide text-white block leading-tight">VARDHA</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-concrete-400">Admin Panel</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          if (item.external) {
            return (
              <a
                key={item.label}
                href={item.to}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-concrete-300 rounded-lg hover:bg-steel-800 hover:text-amber transition-all duration-200"
                onClick={onClose}
              >
                <Icon size={18} />
                {item.label}
              </a>
            );
          }
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-amber text-steel-950 shadow-lg shadow-amber/20'
                    : 'text-concrete-300 hover:bg-steel-800 hover:text-amber'
                }`
              }
              onClick={onClose}
            >
              <Icon size={18} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-steel-800">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-400 rounded-lg hover:bg-steel-800 hover:text-red-300 transition-all duration-200"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </>
  );
}
