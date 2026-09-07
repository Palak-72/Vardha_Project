import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ExternalLink } from 'lucide-react';
import { contactService } from '../../services/api';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: 'easeOut' },
  }),
};

const statusConfig = {
  new: { label: 'New', class: 'bg-amber/10 text-amber' },
  read: { label: 'Read', class: 'bg-blue-400/10 text-blue-400' },
  responded: { label: 'Responded', class: 'bg-emerald-400/10 text-emerald-400' },
  closed: { label: 'Closed', class: 'bg-steel-700 text-concrete-300' },
};

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const res = await contactService.getAll();
      setContacts(res.data || []);
    } catch (err) {
      console.error('Failed to load contacts', err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = contacts.filter((c) => {
    const matchesSearch = c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase()) ||
      c.subject?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = async (id, status) => {
    try {
      await contactService.updateStatus(id, status);
      setContacts((prev) => prev.map((c) => c._id === id ? { ...c, status } : c));
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Contacts | Vardha Admin</title>
      </Helmet>

      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-white mb-1">Contacts</h1>
          <p className="text-sm text-concrete-400">Manage contact form submissions</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-steel-500" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-steel-900 border border-steel-800 rounded-lg pl-9 pr-4 py-2 text-sm text-concrete-200 placeholder:text-steel-500 outline-none focus:border-amber transition-colors w-64"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-steel-900 border border-steel-800 rounded-lg px-3 py-2 text-sm text-concrete-200 outline-none focus:border-amber transition-colors"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="responded">Responded</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-steel-900 border border-steel-800 rounded-xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-steel-800">
                <th className="px-5 py-4 text-[10px] uppercase tracking-[0.12em] text-steel-400 font-bold">Name</th>
                <th className="px-5 py-4 text-[10px] uppercase tracking-[0.12em] text-steel-400 font-bold hidden md:table-cell">Email</th>
                <th className="px-5 py-4 text-[10px] uppercase tracking-[0.12em] text-steel-400 font-bold hidden lg:table-cell">Subject</th>
                <th className="px-5 py-4 text-[10px] uppercase tracking-[0.12em] text-steel-400 font-bold">Status</th>
                <th className="px-5 py-4 text-[10px] uppercase tracking-[0.12em] text-steel-400 font-bold hidden sm:table-cell">Date</th>
                <th className="px-5 py-4 text-[10px] uppercase tracking-[0.12em] text-steel-400 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-steel-800">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-5 py-12 text-center text-sm text-steel-500">Loading...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-5 py-12 text-center text-sm text-steel-500">No contacts found</td>
                </tr>
              ) : (
                filtered.map((contact, i) => {
                  const status = statusConfig[contact.status] || statusConfig.new;
                  return (
                    <motion.tr
                      key={contact._id}
                      variants={fadeIn}
                      initial="hidden"
                      animate="visible"
                      custom={i}
                      className="hover:bg-steel-800/50 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-steel-800 text-amber rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                            {contact.name?.charAt(0)?.toUpperCase() || '?'}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-white truncate">{contact.name}</p>
                            <p className="text-xs text-steel-400 md:hidden truncate">{contact.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-concrete-300 hidden md:table-cell">{contact.email}</td>
                      <td className="px-5 py-4 text-sm text-concrete-300 hidden lg:table-cell max-w-xs truncate">{contact.subject}</td>
                      <td className="px-5 py-4">
                        <span className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full ${status.class}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-xs text-steel-400 hidden sm:table-cell">
                        {contact.createdAt ? new Date(contact.createdAt).toLocaleDateString('en-IN') : '—'}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <select
                            value={contact.status || 'new'}
                            onChange={(e) => updateStatus(contact._id, e.target.value)}
                            className="bg-steel-800 border border-steel-700 rounded text-[10px] text-concrete-200 px-2 py-1 outline-none focus:border-amber transition-colors"
                          >
                            <option value="new">New</option>
                            <option value="read">Read</option>
                            <option value="responded">Responded</option>
                            <option value="closed">Closed</option>
                          </select>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedContact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedContact(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-steel-900 border border-steel-800 rounded-xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-xl text-white">Contact Details</h3>
                <button onClick={() => setSelectedContact(null)} className="text-steel-400 hover:text-white transition-colors">
                  <ExternalLink size={20} className="rotate-45" />
                </button>
              </div>
              <div className="space-y-4">
                <Detail label="Name" value={selectedContact.name} />
                <Detail label="Email" value={selectedContact.email} />
                <Detail label="Phone" value={selectedContact.phone} />
                <Detail label="Subject" value={selectedContact.subject} />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.12em] text-steel-400 font-bold mb-1">Message</p>
                  <p className="text-sm text-concrete-200 bg-steel-800 rounded-lg p-4">{selectedContact.message}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.12em] text-steel-400 font-bold mb-1">{label}</p>
      <p className="text-sm text-concrete-200">{value || '—'}</p>
    </div>
  );
}
