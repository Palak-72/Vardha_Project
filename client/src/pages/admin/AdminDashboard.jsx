import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Users, Mail, MessageSquare, TrendingUp, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { contactService, enquiryService } from '../../services/api';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
};

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalContacts: 0,
    totalEnquiries: 0,
    pendingContacts: 0,
    pendingEnquiries: 0,
  });
  const [recentContacts, setRecentContacts] = useState([]);
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [contactsRes, enquiriesRes] = await Promise.all([
        contactService.getAll(),
        enquiryService.getAll(),
      ]);
      const contacts = contactsRes.data || [];
      const enquiries = enquiriesRes.data || [];
      setRecentContacts(contacts.slice(0, 5));
      setRecentEnquiries(enquiries.slice(0, 5));
      setStats({
        totalContacts: contacts.length,
        totalEnquiries: enquiries.length,
        pendingContacts: contacts.filter((c) => c.status === 'new').length,
        pendingEnquiries: enquiries.filter((e) => e.status === 'new').length,
      });
    } catch (err) {
      console.error('Failed to load dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      label: 'Total Contacts',
      value: stats.totalContacts,
      sub: `${stats.pendingContacts} pending`,
      icon: Mail,
      color: 'text-blue-400',
      bg: 'bg-blue-400/10',
    },
    {
      label: 'Total Enquiries',
      value: stats.totalEnquiries,
      sub: `${stats.pendingEnquiries} pending`,
      icon: MessageSquare,
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10',
    },
    {
      label: 'Pending Contacts',
      value: stats.pendingContacts,
      sub: 'Require attention',
      icon: Users,
      color: 'text-amber',
      bg: 'bg-amber/10',
    },
    {
      label: 'Pending Enquiries',
      value: stats.pendingEnquiries,
      sub: 'Require attention',
      icon: TrendingUp,
      color: 'text-rose-400',
      bg: 'bg-rose-400/10',
    },
  ];

  return (
    <div>
      <Helmet>
        <title>Dashboard | Vardha Admin</title>
      </Helmet>

      <div className="mb-8">
        <h1 className="font-display text-3xl text-white mb-1">Dashboard</h1>
        <p className="text-sm text-concrete-400">Overview of your contacts and enquiries</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 mb-8">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              custom={i}
              className="bg-steel-900 border border-steel-800 rounded-xl p-5 lg:p-6 hover:border-steel-700 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2.5 rounded-lg ${card.bg}`}>
                  <Icon size={20} className={card.color} />
                </div>
              </div>
              <p className="text-2xl lg:text-3xl font-display text-white mb-1">{loading ? '—' : card.value}</p>
              <p className="text-xs text-concrete-400 uppercase tracking-[0.12em] font-bold">{card.label}</p>
              <p className="text-xs text-steel-500 mt-1">{card.sub}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-steel-900 border border-steel-800 rounded-xl overflow-hidden"
        >
          <div className="flex items-center justify-between p-5 border-b border-steel-800">
            <h2 className="font-display text-lg text-white">Recent Contacts</h2>
            <Link to="/admin/contacts" className="text-xs text-amber hover:text-amber-400 flex items-center gap-1 transition-colors">
              View all <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="divide-y divide-steel-800">
            {recentContacts.length === 0 ? (
              <p className="text-sm text-steel-500 p-5 text-center">No contacts yet</p>
            ) : (
              recentContacts.map((contact) => (
                <div key={contact._id} className="p-4 flex items-center justify-between hover:bg-steel-800/50 transition-colors">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">{contact.name}</p>
                    <p className="text-xs text-steel-400 truncate">{contact.email}</p>
                  </div>
                  <span className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full ${
                    contact.status === 'new' ? 'bg-amber/10 text-amber' :
                    contact.status === 'read' ? 'bg-blue-400/10 text-blue-400' :
                    'bg-steel-700 text-concrete-300'
                  }`}>
                    {contact.status || 'new'}
                  </span>
                </div>
              ))
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-steel-900 border border-steel-800 rounded-xl overflow-hidden"
        >
          <div className="flex items-center justify-between p-5 border-b border-steel-800">
            <h2 className="font-display text-lg text-white">Recent Enquiries</h2>
            <Link to="/admin/enquiries" className="text-xs text-amber hover:text-amber-400 flex items-center gap-1 transition-colors">
              View all <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="divide-y divide-steel-800">
            {recentEnquiries.length === 0 ? (
              <p className="text-sm text-steel-500 p-5 text-center">No enquiries yet</p>
            ) : (
              recentEnquiries.map((enquiry) => (
                <div key={enquiry._id} className="p-4 flex items-center justify-between hover:bg-steel-800/50 transition-colors">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">{enquiry.name}</p>
                    <p className="text-xs text-steel-400 truncate">{enquiry.email}</p>
                  </div>
                  <span className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full ${
                    enquiry.status === 'new' ? 'bg-amber/10 text-amber' :
                    enquiry.status === 'read' ? 'bg-blue-400/10 text-blue-400' :
                    enquiry.status === 'responded' ? 'bg-emerald-400/10 text-emerald-400' :
                    'bg-steel-700 text-concrete-300'
                  }`}>
                    {enquiry.status || 'new'}
                  </span>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
