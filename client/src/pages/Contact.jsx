import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Phone, Mail } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { SITE } from '../data/siteData';
import { contactService } from '../services/api';
import useCountUp from '../hooks/useCountUp';
import usePageMeta from '../hooks/usePageMeta';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: 'easeOut' },
  }),
};

const slideInLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: 'easeOut' },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: 'easeOut' },
  },
};

export default function Contact() {
  usePageMeta('contact');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [requestId, setRequestId] = useState('');

  const update = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await contactService.submit(formData);
      setRequestId(res.requestId || '');
      setSubmitted(true);
    } catch (err) {
      alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const [clientsRef, clientsCount] = useCountUp(200, 2200);
  const [sinceRef, sinceCount] = useCountUp(1987, 2000);
  const [experienceRef, experienceCount] = useCountUp(35, 2000);

  const stats = [
    { ref: clientsRef, count: clientsCount, suffix: '+', label: 'Happy Clients' },
    { ref: sinceRef, count: sinceCount, suffix: '', label: 'Est.' },
    { ref: experienceRef, count: experienceCount, suffix: '+', label: 'Years Experience' },
  ];

  return (
    <div>
      <Hero />
      <section className="relative bg-concrete-50 py-16 lg:py-24 overflow-hidden">
        <div className="absolute -left-40 top-24 w-96 h-96 rounded-full bg-amber/8 blur-3xl pointer-events-none animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute right-[-180px] bottom-0 w-[450px] h-[450px] rounded-full bg-steel-900/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <motion.div variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
              <span className="section-eyebrow">GET IN TOUCH</span>
              <h2 className="font-display text-3xl sm:text-4xl text-ink mb-2">Contact details</h2>
              <p className="text-sm text-steel-600 mb-8">Have a warehouse requirement or want to visit the facility? Reach out directly to our team.</p>
              <div className="space-y-3">
                <ContactInfo icon={MapPin} label="Address" value="Gorakhnath Mandir Road, Bargadwa, Gorakhpur, Uttar Pradesh" />
                <ContactInfo icon={Phone} label="Phone" value="+91 98765 43210" />
                <ContactInfo icon={Mail} label="Email" value="info@vardhawarehousing.com" />
              </div>
              <div className="mt-8 grid grid-cols-3 gap-px bg-steel-800">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    ref={stat.ref}
                    className="relative bg-steel-950 py-6 px-3 text-center group overflow-hidden hover:bg-steel-900 transition-colors duration-300"
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i}
                  >
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-amber group-hover:w-1/2 transition-all duration-500" />
                    <span className="block text-[10px] tracking-[0.2em] text-amber mb-2">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-display text-base sm:text-lg text-white/70 group-hover:text-white transition-colors">
                      {stat.count.toLocaleString('en-IN')}{stat.suffix}
                    </span>
                    <span className="block text-[10px] tracking-[0.15em] text-concrete-100/50 mt-1 uppercase">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 overflow-hidden border border-concrete-200 bg-steel-100 shadow-sm">
                <iframe
                  title="Vardha Warehousing Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.123456789!2d83.373!3d26.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDQ0JzAwLjAiTiA4M8KwMTYnMTguNCJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>
            <motion.div variants={slideInRight} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="bg-white border border-concrete-200 shadow-xl p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-5">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
                  </div>
                  <h3 className="font-display text-2xl text-ink mb-2">Message Sent</h3>
                  <p className="text-sm text-steel-600 leading-6 max-w-sm mx-auto mb-2">
                    Thanks, {formData.name || 'there'} — our team will get back to you shortly.
                  </p>
                  {requestId && (
                    <div className="bg-concrete-50 border border-concrete-200 rounded-lg p-3 max-w-sm mx-auto mb-7">
                      <p className="text-[10px] text-steel-500 uppercase tracking-wide mb-1">Your Request ID</p>
                      <p className="text-sm font-semibold text-amber-700 font-mono">{requestId}</p>
                    </div>
                  )}
                  <button onClick={() => { setSubmitted(false); setRequestId(''); setFormData({ name: '', email: '', phone: '', subject: '', message: '' }); }} className="inline-flex items-center gap-2 text-sm font-bold text-amber-700 hover:text-amber-800 transition-colors">
                    Send another message <ArrowRight size={16} />
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white border border-concrete-200 shadow-xl p-6 sm:p-8 lg:p-9">
                  <div className="mb-7">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-amber-700 font-bold mb-2 block">QUICK ENQUIRY</span>
                    <h3 className="font-display text-2xl sm:text-3xl text-ink">Send us a message</h3>
                    <p className="text-sm text-steel-500 mt-2">Tell us what you need and we will help you with the next step.</p>
                  </div>
                  <div className="space-y-5">
                    <Field label="Name" required value={formData.name} onChange={update('name')} placeholder="Your name" error={errors.name} />
                    <Field label="Email" required type="email" value={formData.email} onChange={update('email')} placeholder="you@company.com" error={errors.email} />
                    <Field label="Phone" required value={formData.phone} onChange={update('phone')} placeholder="+91 98765 43210" error={errors.phone} />
                    <Field label="Subject" required value={formData.subject} onChange={update('subject')} placeholder="How can we help?" error={errors.subject} />
                    <Field label="Message" required textarea value={formData.message} onChange={update('message')} placeholder="Tell us about your requirement..." error={errors.message} />
                  </div>
                  <button type="submit" disabled={loading} className="group relative mt-7 w-full overflow-hidden bg-steel-950 hover:bg-steel-800 text-white px-6 py-4 text-sm font-bold disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-xl">
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-white/10 skew-x-[-20deg] transition-transform duration-700" />
                    <span className="relative flex items-center justify-center gap-3">
                      {loading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>Send Message <ArrowRight size={18} /></>
                      )}
                    </span>
                  </button>
                  <p className="text-center text-[10px] text-steel-400 mt-4 uppercase tracking-[0.12em]">We typically respond to enquiries promptly</p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative bg-steel-950 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
        backgroundSize: '44px 44px'
      }} />
      <div className="absolute -right-40 -top-40 w-[480px] h-[480px] rounded-full bg-amber/10 blur-3xl animate-[pulse_6s_ease-in-out_infinite]" />
      <div className="absolute -left-32 bottom-[-120px] w-80 h-80 rounded-full bg-white/[0.03] blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl">
          <motion.div className="flex items-center gap-3 mb-5" variants={fadeIn} initial="hidden" animate="visible">
            <span className="h-px w-9 bg-amber" />
            <span className="text-amber text-xs sm:text-sm font-bold tracking-[0.2em]">CONTACT</span>
          </motion.div>
          <motion.h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight" variants={fadeIn} custom={1} initial="hidden" animate="visible">
            Talk to the <span className="block text-amber mt-2">Vardha team.</span>
          </motion.h1>
          <motion.p className="text-concrete-100/70 mt-7 max-w-2xl text-base sm:text-lg leading-8" variants={fadeIn} custom={2} initial="hidden" animate="visible">
            Reach out for site visits, custom requirements or general questions about our Gorakhpur facility.
          </motion.p>
          <motion.div className="mt-9 flex flex-wrap gap-x-7 gap-y-4 text-xs uppercase tracking-[0.14em] text-concrete-100/50" variants={fadeIn} custom={3} initial="hidden" animate="visible">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
              Site Visits
            </span>
            <span className="hidden sm:block w-px h-4 bg-steel-700" />
            <span>Custom Requirements</span>
            <span className="hidden sm:block w-px h-4 bg-steel-700" />
            <span>Warehouse Enquiries</span>
          </motion.div>
          <motion.div className="mt-9 flex flex-wrap gap-4" variants={fadeIn} custom={4} initial="hidden" animate="visible">
            <a
              href={`https://wa.me/${SITE.whatsappNumber}?text=Hi%20Vardha%20Warehousing%2C%20I%20would%20like%20to%20discuss%20warehouse%20space.`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white px-7 py-4 text-sm font-semibold transition-all duration-300 hover:-translate-y-1"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.273.298-1.045 1.02-1.045 2.488 0 1.469 1.07 2.89 1.219 3.087.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.273-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp Us
            </a>
            <Link to="/book-space" className="bg-amber hover:bg-amber-600 text-steel-950 px-7 py-4 text-sm font-bold transition-all duration-300 hover:-translate-y-1">
              Book Warehouse Space
            </Link>
          </motion.div>
        </div>
      </div>
      <div className="h-1 bg-steel-800 overflow-hidden">
        <div className="h-full w-1/4 bg-amber animate-[slideRight_3s_ease-in-out_infinite]" />
      </div>
    </section>
  );
}

function ContactInfo({ icon: Icon, label, value }) {
  return (
    <motion.div
      className="group flex items-start gap-4 p-4 border border-concrete-200 bg-white hover:border-amber/50 hover:shadow-md hover:-translate-x-1 transition-all duration-300"
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="shrink-0 w-10 h-10 bg-steel-950 text-amber flex items-center justify-center group-hover:bg-amber group-hover:text-steel-950 transition-all duration-300">
        <Icon size={18} />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] text-steel-400 uppercase tracking-[0.15em] font-bold">{label}</p>
        <p className="text-sm text-ink mt-1 leading-6 break-words">{value}</p>
      </div>
    </motion.div>
  );
}

function Field({ label, required, type = 'text', value, onChange, placeholder, textarea, error }) {
  return (
    <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      <label className="block text-[11px] font-bold text-steel-600 uppercase tracking-[0.12em] mb-2">{label}{required && <span className="text-red-500 ml-1">*</span>}</label>
      {textarea ? (
        <textarea value={value} onChange={onChange} rows={5} className={`peer w-full bg-concrete-50 border px-4 py-3 text-sm text-ink placeholder:text-steel-400 outline-none resize-none transition-all duration-300 focus:bg-white focus:border-amber ${error ? 'border-red-400 bg-red-50' : 'border-concrete-200'}`} placeholder={placeholder} />
      ) : (
        <input type={type} value={value} onChange={onChange} className={`peer w-full bg-concrete-50 border px-4 py-3 text-sm text-ink placeholder:text-steel-400 outline-none transition-all duration-300 focus:bg-white focus:border-amber ${error ? 'border-red-400 bg-red-50' : 'border-concrete-200'}`} placeholder={placeholder} />
      )}
      {error && <p className="text-red-500 text-[11px] mt-1">{error}</p>}
    </motion.div>
  );
}
