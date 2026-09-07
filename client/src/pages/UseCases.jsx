import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Factory, Truck, Store, Archive, Warehouse, Package } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
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

const useCases = [
  { icon: Store, title: 'FMCG Businesses', desc: 'High-turnover storage for fast-moving consumer goods with efficient picking, dispatch, and inventory management.', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80' },
  { icon: Package, title: 'E-commerce & D2C Businesses', desc: 'Fast, reliable storage and dispatch support for online retailers and direct-to-consumer brands managing high-volume inventory.', image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&auto=format&fit=crop&q=80' },
  { icon: Warehouse, title: 'Steel Businesses', desc: 'Secure, heavy-duty storage for steel materials and industrial goods with easy loading, unloading, and transport access.', image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&auto=format&fit=crop&q=80' },
  { icon: Archive, title: 'Industrial & Commercial Goods', desc: 'Flexible warehouse space for industrial equipment, commercial inventory, and bulk goods requiring organized storage.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ_hmgml-XxwpGFP1ND3is5f0oi-dtxZuWtsHCOMsxnw&s=10' },
  { icon: Truck, title: 'Distribution & Logistics Businesses', desc: 'Strategically located hub for distribution, cross-docking, and last-mile delivery with 24×7 truck access.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRc3dnGqmiAqLXkqNUr0goaa7va5eVU863HUiSrvYRFw&s=10' },
];

export default function UseCases() {
  usePageMeta('use-cases');
  return (
    <div>
      <Hero />
      <UseCasesList />
      <CTASection />
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
            <span className="text-amber text-xs sm:text-sm font-bold tracking-[0.2em]">USE CASES</span>
          </motion.div>
          <motion.h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight" variants={fadeIn} custom={1} initial="hidden" animate="visible">
            Built for every industry
          </motion.h1>
          <motion.p className="text-concrete-100/70 mt-7 max-w-2xl text-base sm:text-lg leading-8" variants={fadeIn} custom={2} initial="hidden" animate="visible">
            We work with commercial businesses of all kinds. Tell us what you need to store, how much space you require, and how your operation works.
          </motion.p>
        </div>
      </div>
      <div className="h-1 bg-steel-800 overflow-hidden">
        <div className="h-full w-1/4 bg-amber animate-[slideRight_3s_ease-in-out_infinite]" />
      </div>
    </section>
  );
}

function UseCasesList() {
  const [industriesRef, industriesCount] = useCountUp(6, 2000);

  const rows = [
    useCases.slice(0, 3),
    useCases.slice(3, 5),
  ];

  return (
    <section className="relative bg-concrete-50 py-16 lg:py-24 overflow-hidden">
      <div className="absolute -left-40 top-24 w-96 h-96 rounded-full bg-amber/8 blur-3xl pointer-events-none animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="absolute right-[-180px] bottom-0 w-[450px] h-[450px] rounded-full bg-steel-900/5 blur-3xl pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div className="text-center mb-12" variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <span className="section-eyebrow">INDUSTRIES WE SERVE</span>
          <h2 className="font-display text-3xl sm:text-4xl text-ink">Tailored for your business</h2>
          <p className="text-sm text-steel-600 max-w-xl mx-auto mt-4 leading-relaxed">
            From manufacturing to e-commerce, our warehouse solutions adapt to your industry's unique demands.
          </p>
        </motion.div>
        <div className="space-y-6 lg:space-y-8">
          {rows.map((row, rowIndex) => (
            <motion.div
              key={rowIndex}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
              variants={rowIndex % 2 === 0 ? slideInLeft : slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-120px' }}
            >
              {row.map((useCase, i) => (
                <motion.div
                  key={useCase.title}
                  className="group relative bg-white border border-concrete-200 overflow-hidden flex flex-col card-hover"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i + 1) * 0.15, duration: 0.7, ease: 'easeOut' }}
                >
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-amber scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
                  <div className="relative w-full h-52 overflow-hidden">
                    <img src={useCase.image} alt={useCase.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                    <div className="absolute inset-0 bg-steel-950/20 group-hover:bg-steel-950/5 transition-colors duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-steel-950/60 to-transparent" />
                    <span className="absolute top-4 left-4 w-9 h-9 bg-steel-950/80 text-amber flex items-center justify-center text-xs font-bold border border-amber/30">{String(rowIndex * 3 + i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="relative p-6 lg:p-7 flex-1 flex flex-col">
                    <div className="mb-4">
                      <span className="text-[10px] font-bold tracking-[0.18em] text-amber-700 uppercase">Commercial Storage</span>
                      <h3 className="font-display text-xl lg:text-2xl text-ink mt-2 mb-2">{useCase.title}</h3>
                    </div>
                    <p className="text-sm text-steel-600 leading-relaxed mb-6 flex-1">{useCase.desc}</p>
                    <Link to="/contact" className="group/link inline-flex items-center gap-2 text-sm font-semibold text-amber-700 hover:text-amber-600 transition-colors w-fit">
                      <span>Discuss your requirement</span>
                      <span className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
                    </Link>
                    <div className="mt-5 h-px bg-concrete-200 relative overflow-hidden">
                      <div className="absolute inset-y-0 left-0 w-12 bg-amber transition-all duration-500 group-hover:w-full" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>
        <motion.div
          ref={industriesRef}
          className="mt-16 relative overflow-hidden bg-steel-950 text-white p-8 sm:p-10 shadow-[0_20px_60px_rgba(20,27,35,0.15)]"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-amber/15 blur-3xl animate-[pulse_5s_ease-in-out_infinite]" />
          <div className="absolute -left-20 -bottom-28 h-52 w-52 rounded-full bg-amber/10 blur-3xl" />
          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-7">
            <div>
              <p className="text-amber text-xs font-bold tracking-[0.16em] uppercase mb-3">DON'T SEE YOUR INDUSTRY?</p>
              <h3 className="font-display text-2xl sm:text-3xl mb-2">We work with commercial businesses of all kinds</h3>
              <p className="text-sm text-concrete-100/65 max-w-md">Tell us what you need to store, how much space you require, and how your operation works.</p>
            </div>
            <Link to="/book-space" className="btn-accent inline-flex items-center gap-3">
              <span>Calculate Your Space</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
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
          <span className="section-eyebrow">JOIN OUR CLIENTS</span>
          <h2 className="font-display text-3xl sm:text-4xl text-ink mb-4">Store your inventory with Vardha</h2>
          <p className="text-sm text-steel-600 max-w-xl mx-auto mb-8 leading-relaxed">
            Tell us about your storage requirement and our team will help you find the right warehouse solution.
          </p>
          <a
            href="https://wa.me/919670111167?text=Hi%20Vardha%20Warehousing%2C%20I%20would%20like%20to%20discuss%20warehouse%20space."
            target="_blank"
            rel="noreferrer"
            className="btn-accent inline-flex items-center gap-3"
          >
            <span>WhatsApp Vardha</span>
            <ArrowRight size={18} />
          </a>
          <p className="mt-5 text-[11px] uppercase tracking-[0.15em] text-steel-400">Quick enquiry • Commercial storage • Gorakhpur</p>
        </motion.div>
      </div>
    </section>
  );
}
