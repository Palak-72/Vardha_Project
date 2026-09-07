import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
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

const solutions = [
  { id: '01', title: 'Short & Long Term Storage', desc: 'Flexible durations from a few months to multi-year leases, sized to your inventory cycle.', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80' },
  { id: '02', title: 'Bulk & Palletized Storage', desc: 'Racking and open-floor options for both palletized goods and loose bulk material.', image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&auto=format&fit=crop&q=80' },
  { id: '03', title: 'Dedicated Loading Bays', desc: 'Wide frontage designed for simultaneous multi-truck loading and unloading.', image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&auto=format&fit=crop&q=80' },
  { id: '04', title: 'Custom Warehouse Development', desc: 'Nationwide warehouse development support tailored to specific business requirements.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ_hmgml-XxwpGFP1ND3is5f0oi-dtxZuWtsHCOMsxnw&s=10' },
  { id: '05', title: 'Inventory-Ready Infrastructure', desc: 'Concrete flooring, ventilation and layout suited for commercial-grade inventory.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRc3dnGqmiAqLXkqNUr0goaa7va5eVU863HUiSrvYRFw&s=10' },
  { id: '06', title: 'Security & Surveillance', desc: 'CCTV coverage and on-site security arrangements across the facility.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM-NjCdjrkZ7VHd4bZ6RkXPiwj2MJeHoQRy-8BLyGYkA&s=10' },
];

const steps = [
  { id: '01', title: 'Tell us your requirement', desc: 'Share area, dimensions or use the calculator to get an instant estimate.' },
  { id: '02', title: 'Review transparent pricing', desc: 'See applicable rate and estimated monthly amount before you commit.' },
  { id: '03', title: 'Book & move in', desc: 'Confirm your enquiry — our team coordinates the rest, including site visits.' },
];

export default function Solutions() {
  usePageMeta('solutions');
  return (
    <div>
      <Hero />
      <SolutionsList />
      <HowItWorks />
      <CTASection />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative bg-steel-950 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
        backgroundSize: '54px 54px'
      }} />
      <div className="absolute -right-40 -top-40 w-[520px] h-[520px] rounded-full bg-amber/10 blur-3xl animate-[pulse_7s_ease-in-out_infinite]" />
      <div className="absolute -left-40 bottom-[-200px] w-[450px] h-[450px] rounded-full bg-amber/5 blur-3xl animate-[pulse_9s_ease-in-out_infinite]" />
      <div className="absolute right-[20%] top-1/2 w-28 h-28 rounded-full bg-amber/5 blur-2xl animate-[floatGlow_8s_ease-in-out_infinite]" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl">
          <motion.div className="flex items-center gap-3 mb-5" variants={fadeIn} initial="hidden" animate="visible">
            <span className="h-px w-10 bg-amber" />
            <span className="text-amber text-xs sm:text-sm font-semibold tracking-[0.18em]">WAREHOUSE SOLUTIONS</span>
          </motion.div>
          <motion.h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-3xl" variants={fadeIn} custom={1} initial="hidden" animate="visible">
            Solutions built around how you <span className="text-amber">actually operate</span>
          </motion.h1>
          <motion.p className="text-concrete-100/70 mt-6 max-w-2xl leading-relaxed text-base sm:text-lg" variants={fadeIn} custom={2} initial="hidden" animate="visible">
            From short-term overflow storage to fully custom warehouse development — flexible options for every stage of your business.
          </motion.p>
          <motion.div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-concrete-100/60" variants={fadeIn} custom={3} initial="hidden" animate="visible">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
              Flexible storage
            </span>
            <span className="hidden sm:block h-4 w-px bg-steel-700" />
            <span>Transparent pricing</span>
            <span className="hidden sm:block h-4 w-px bg-steel-700" />
            <span>Commercial-ready facility</span>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber/70 to-transparent" />
    </section>
  );
}

function SolutionsList() {
  const [solutionsRef, solutionsCount] = useCountUp(6, 2000);

  const rows = [
    solutions.slice(0, 3),
    solutions.slice(3, 6),
  ];

  return (
    <section className="relative bg-concrete-50 overflow-hidden">
      <div className="absolute -left-40 top-24 w-[420px] h-[420px] rounded-full bg-amber/5 blur-3xl pointer-events-none" />
      <div className="absolute right-[-180px] bottom-[-100px] w-[500px] h-[500px] rounded-full bg-steel-900/5 blur-3xl pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-16 lg:py-24">
        <motion.div className="mb-10 lg:mb-12" variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <span className="section-eyebrow">WHAT WE OFFER</span>
          <h2 className="font-display text-3xl sm:text-4xl text-ink">Our warehouse solutions</h2>
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
              {row.map((solution) => (
                <motion.div
                  key={solution.id}
                  className="group relative bg-white border border-concrete-200 overflow-hidden card-hover"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-amber scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
                  <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-steel-100">
                    <img
                      src={solution.image}
                      alt={solution.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-steel-950/20 group-hover:bg-steel-950/5 transition-colors duration-500" />
                    <div className="absolute top-4 left-4">
                      <span className="text-[10px] font-bold tracking-[0.2em] text-amber bg-steel-950/80 backdrop-blur-sm px-2 py-1">{solution.id}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-base sm:text-lg text-ink mb-2">{solution.title}</h3>
                    <p className="text-xs text-steel-500 leading-relaxed">{solution.desc}</p>
                  </div>
                  <div className="h-px bg-concrete-200 relative overflow-hidden">
                    <div className="absolute inset-y-0 left-0 w-12 bg-amber transition-all duration-500 group-hover:w-full" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>
        <motion.div
          ref={solutionsRef}
          className="mt-12 bg-white border border-concrete-200 p-6 text-center"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="text-xs text-steel-500">
            <span className="text-amber font-bold mr-2">+</span>
            More solutions added regularly
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const [stepsRef, stepsCount] = useCountUp(3, 2000);

  return (
    <section className="relative bg-concrete-100 py-16 lg:py-24 overflow-hidden">
      <div className="absolute -right-40 -top-40 w-[500px] h-[500px] rounded-full bg-amber/10 blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="absolute -left-48 bottom-[-240px] w-[500px] h-[500px] rounded-full bg-steel-900/5 blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div className="mb-10 lg:mb-12" variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
          <span className="section-eyebrow">HOW IT WORKS</span>
          <h2 className="font-display text-3xl sm:text-4xl text-ink">A straightforward way to get started</h2>
        </motion.div>
        <motion.div
          ref={stepsRef}
          className="bg-white border border-concrete-200 shadow-[0_20px_60px_rgba(20,27,35,0.07)] divide-y divide-concrete-200"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              className="relative px-5 sm:px-7 py-6 sm:py-7 flex items-start gap-5 sm:gap-8 group overflow-hidden"
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7, ease: 'easeOut' }}
            >
              <span className={`absolute left-0 top-0 h-full w-[3px] bg-amber transition-transform duration-300 origin-top ${false ? 'scale-y-100' : 'scale-y-0'}`} />
              <span className="text-2xl sm:text-3xl font-display text-steel-200 group-hover:text-amber/40 transition-colors shrink-0 w-12">{step.id}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-base sm:text-lg text-ink mb-1">{step.title}</h3>
                <p className="text-xs sm:text-sm text-steel-500 leading-relaxed">{step.desc}</p>
              </div>
              <span className="w-8 h-8 border border-concrete-200 flex items-center justify-center text-xs text-amber-700 font-semibold group-hover:border-amber group-hover:bg-amber group-hover:text-steel-950 transition-all duration-300 shrink-0">→</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative bg-steel-950 text-white py-16 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
        backgroundSize: '54px 54px'
      }} />
      <div className="absolute -left-32 -top-32 w-[400px] h-[400px] rounded-full bg-amber/10 blur-3xl animate-[pulse_7s_ease-in-out_infinite]" />
      <div className="absolute right-[-150px] bottom-[-180px] w-[450px] h-[450px] rounded-full bg-amber/5 blur-3xl animate-[pulse_9s_ease-in-out_infinite]" />
      <div className="relative max-w-3xl mx-auto px-5 lg:px-8 text-center">
        <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-px w-8 bg-amber" />
            <span className="text-xs font-semibold tracking-[0.18em] text-amber">NEED HELP CHOOSING?</span>
            <span className="h-px w-8 bg-amber" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6">Not sure which solution fits?</h2>
          <p className="text-concrete-100/65 mt-5 mb-8 max-w-xl mx-auto leading-relaxed">
            Use our calculator to get a tailored estimate, or talk to our team directly about your warehouse requirements.
          </p>
          <Link to="/book-space" className="btn-accent inline-flex items-center gap-3">
            <span>Calculate Your Requirement</span>
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
