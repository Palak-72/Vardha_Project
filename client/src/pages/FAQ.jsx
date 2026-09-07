import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import useCountUp from '../hooks/useCountUp';
import usePageMeta from '../hooks/usePageMeta';

// export default function FAQ() {
//   usePageMeta('faq');
//   hidden: { opacity: 0, y: 30 },
//   visible: (i = 0) => ({
//     opacity: 1,
//     y: 0,
//     transition: { delay: i * 0.1, duration: 0.7, ease: 'easeOut' },
//   }),
// };

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

const faqs = [
  { q: 'What is the minimum warehouse space I can book?', a: 'The minimum bookable area is 500 sq.ft. Requirements below this size will be flagged by our calculator.' },
  { q: 'What is the maximum area available at one location?', a: 'Our Gorakhpur facility offers up to 42,000+ sq.ft. of contiguous warehouse space. Larger requirements can be discussed with our team.' },
  { q: 'How is the rent calculated?', a: 'Rent is calculated per square foot per month. The final amount depends on area, duration, and any additional services required. Use our calculator for an instant estimate.' },
  { q: 'Is the warehouse accessible 24×7?', a: 'Yes, our facility provides 24x7 truck access with dedicated entry and exit points to support your round-the-clock operations.' },
  { q: 'Is security provided on-site?', a: 'Yes, the facility includes CCTV surveillance, perimeter security, controlled access, and on-site operational staff.' },
  { q: 'How do I book warehouse space?', a: 'You can use our online calculator to estimate pricing, then submit an enquiry. Our team will contact you to confirm availability and finalize the booking.' },
  { q: 'Can I visit the facility before booking?', a: 'Yes, we encourage site visits. Contact us via WhatsApp or the enquiry form to schedule a visit to our Gorakhpur facility.' },
  { q: 'What is the maximum area available at one location?', a: 'Our Gorakhpur facility offers up to 42,000+ sq.ft. of contiguous warehouse space. Larger requirements can be discussed with our team.' },
];

export default function FAQ() {
   usePageMeta('faq');
  return (
    <div>
      <Hero />
      <FAQList />
      {/* <CTASection /> */}
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
            <span className="text-amber text-xs sm:text-sm font-bold tracking-[0.2em]">FAQ</span>
          </motion.div>
          <motion.h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight" variants={fadeIn} custom={1} initial="hidden" animate="visible">
            Frequently Asked <span className="block text-concrete-100/60 mt-2">Questions</span>
          </motion.h1>
          <motion.p className="text-concrete-100/70 mt-7 max-w-2xl text-base sm:text-lg leading-8" variants={fadeIn} custom={2} initial="hidden" animate="visible">
            Answers to what most businesses ask before booking warehouse space with us.
          </motion.p>
          <motion.div className="mt-8 h-px w-24 bg-amber" variants={fadeIn} custom={3} initial="hidden" animate="visible" />
        </div>
      </div>
      <div className="h-1 bg-steel-800 overflow-hidden">
        <div className="h-full w-1/4 bg-amber animate-[slideRight_3s_ease-in-out_infinite]" />
      </div>
    </section>
  );
}

function FAQList() {
  const [faqRef, faqCount] = useCountUp(7, 2000);

  return (
    <section className="relative bg-concrete-50 py-16 lg:py-24 overflow-hidden">
      <div className="absolute -left-40 top-20 w-96 h-96 rounded-full bg-amber/8 blur-3xl pointer-events-none animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="absolute right-[-180px] bottom-0 w-[450px] h-[450px] rounded-full bg-steel-900/5 blur-3xl pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div className="mb-10" variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
          <span className="section-eyebrow">NEED TO KNOW</span>
          <h2 className="font-display text-3xl sm:text-4xl text-ink">Common questions</h2>
        </motion.div>
        <motion.div className="grid lg:grid-cols-2 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
          <motion.div className="bg-white border border-concrete-200 shadow-[0_20px_60px_rgba(20,27,35,0.07)]" variants={slideInLeft}>
            {faqs.slice(0, 4).map((faq, i) => (
              <FAQItem key={faq.q} faq={faq} index={i} />
            ))}
          </motion.div>
          <motion.div className="bg-white border border-concrete-200 shadow-[0_20px_60px_rgba(20,27,35,0.07)]" variants={slideInRight}>
            {faqs.slice(4).map((faq, i) => (
              <FAQItem key={faq.q} faq={faq} index={i + 4} />
            ))}
          </motion.div>
        </motion.div>
        <motion.div
          ref={faqRef}
          className="mt-12 relative overflow-hidden bg-steel-950 text-white p-8 sm:p-10 shadow-[0_20px_60px_rgba(20,27,35,0.15)]"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-amber/15 blur-3xl animate-[pulse_5s_ease-in-out_infinite]" />
          <div className="absolute -left-20 -bottom-28 h-52 w-52 rounded-full bg-amber/10 blur-3xl" />
          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-7">
            <div>
              <p className="text-amber text-xs font-bold tracking-[0.16em] uppercase mb-3">NEED MORE HELP?</p>
              <h3 className="font-display text-2xl sm:text-3xl mb-2">Still have questions?</h3>
              <p className="text-sm text-concrete-100/65 max-w-md">Our team is happy to help directly over WhatsApp.</p>
            </div>
            <a
              href="https://wa.me/919670111167?text=Hi%20Vardha%20Warehousing%2C%20I%20have%20a%20question%20before%20booking%20warehouse%20space."
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1FBE5A] text-white font-semibold px-6 py-3.5 text-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(37,211,102,0.25)]"
            >
              <span className="absolute inset-0 -translate-x-full bg-white/20 skew-x-[-20deg] group-hover:translate-x-[150%] transition-transform duration-700" />
              <span className="relative">WhatsApp Vardha</span>
              <span className="relative text-lg group-hover:translate-x-1 transition-transform duration-300">→</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="group border-b border-concrete-200 last:border-b-0 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="relative w-full flex items-center justify-between text-left px-5 sm:px-7 py-6 overflow-hidden"
      >
        <span className={`absolute left-0 top-0 h-full w-[3px] bg-amber transition-transform duration-300 origin-top ${open ? 'scale-y-100' : 'scale-y-0'}`} />
        <span className={`font-medium pr-6 transition-colors duration-300 ${open ? 'text-amber-700' : 'text-ink group-hover:text-amber-700'}`}>{faq.q}</span>
        <span className={`flex h-8 w-8 shrink-0 items-center justify-center border transition-all duration-300 ${open ? 'border-amber bg-amber text-white rotate-45' : 'border-concrete-300 text-amber-700 group-hover:border-amber'}`}>
          <span className="text-xl leading-none">+</span>
        </span>
      </button>
      <div className={`grid transition-all duration-300 ease-in-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <p className="px-5 sm:px-7 pb-6 pr-16 text-sm text-steel-600 leading-relaxed">{faq.a}</p>
        </div>
      </div>
    </motion.div>
  );
}

function CTASection() {
  return (
    <section className="relative bg-concrete-100 py-16 lg:py-24 overflow-hidden">
      <div className="absolute -left-24 -top-24 w-72 h-72 border border-amber/10 rounded-full animate-[spin_20s_linear_infinite]" />
      <div className="absolute -left-12 -top-12 w-48 h-48 border border-amber/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
      <div className="absolute -right-32 -bottom-32 w-80 h-80 rounded-full bg-amber/10 blur-3xl animate-[pulse_7s_ease-in-out_infinite]" />
      <div className="relative max-w-3xl mx-auto px-5 lg:px-8 text-center">
        <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <span className="section-eyebrow">NEED MORE HELP?</span>
          <h2 className="font-display text-3xl sm:text-4xl text-ink mb-4">Still have questions?</h2>
          <p className="text-sm text-steel-600 max-w-xl mx-auto mb-8 leading-relaxed">
            Our team is happy to help directly over WhatsApp.
          </p>
          <Link to="/contact" className="btn-primary inline-flex items-center gap-3">
            <span>Get in Touch</span>
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
