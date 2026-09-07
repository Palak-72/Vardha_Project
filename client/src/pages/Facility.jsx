import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Warehouse, Clock, Shield, MapPin, Truck } from 'lucide-react';
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

const galleryImages = [
  { id: '01', src: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80', alt: 'Warehouse interior with racking' },
  { id: '02', src: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&auto=format&fit=crop&q=80', alt: 'Warehouse operations' },
  { id: '03', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReaOj5raVkftb5G1k6vvlr_NsRjdz-5Qk_GQtvXJmjIA&s=10', alt: 'Storage facility' },
  { id: '04', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqzF9dTzOSHK4EIQTUXahdYcyLE2r2ZxxdGwsABheBFl-iHh4zJmYmhNc&s=10', alt: 'Warehouse loading area' },
  { id: '05', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThjqc9Zh01z16MVxtWQoe8DqS274VYj5lCg73D2f-sEg&s=10', alt: 'Warehouse overview' },
  { id: '06', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-YAhZfQEFqvN3uDLOuB2TWsvmJAqj_E4nDTz-JAwFtQ&s=10', alt: 'Facility operations' },
];

const specs = [
  { label: 'Company', value: 'Vardha Warehousing' },
  { label: 'Location', value: 'Gorakhnath Mandir Road, Bargadwa, Gorakhpur, Uttar Pradesh' },
  { label: 'Property Type', value: 'Commercial warehouse property' },
  { label: 'Road Frontage', value: 'Approximately 36 metres / 118 feet wide' },
  { label: 'Truck Access', value: '24×7 commercial truck access' },
  { label: 'Transport & Loading', value: 'Easy transport and loading/unloading movement' },
  { label: 'Security', value: 'CCTV surveillance and security arrangements' },
  { label: 'Office Facility', value: 'Office facility for operational requirements' },
];

const whyUs = [
  { id: '01', icon: MapPin, title: '36m / 118 ft Road Frontage', desc: 'Approximately 36 metres / 118 feet wide road frontage for easy transport and loading/unloading movement.' },
  { id: '02', icon: Truck, title: '24×7 Commercial Truck Access', desc: 'Round-the-clock commercial truck access with dedicated entry and exit for smooth logistics operations.' },
  { id: '03', icon: Shield, title: 'CCTV Surveillance & Security', desc: 'Comprehensive CCTV surveillance and security arrangements to protect your inventory 24 hours a day.' },
  { id: '04', icon: Warehouse, title: 'Office Facility for Operations', desc: 'Dedicated office facility for operational requirements, billing, coordination and day-to-day management.' },
];

export default function Facility() {
  usePageMeta('facility');
  return (
    <div>
      <Hero />
      <Gallery />
      <Specifications />
      <WhyThisFacility />
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
            <span className="text-amber text-xs sm:text-sm font-semibold tracking-[0.18em]">WAREHOUSE FACILITY</span>
          </motion.div>
          <motion.h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-3xl" variants={fadeIn} custom={1} initial="hidden" animate="visible">
            A commercial warehouse facility <span className="text-amber">built for real logistics.</span>
          </motion.h1>
          <motion.p className="text-concrete-100/70 mt-6 max-w-2xl leading-relaxed text-base sm:text-lg" variants={fadeIn} custom={2} initial="hidden" animate="visible">
            Vardha Warehousing offers a commercial-grade property with approximately 36 metres / 118 feet wide road frontage, 24×7 commercial truck access, easy transport and loading/unloading movement, CCTV surveillance, security arrangements, and office facility for operational requirements.
          </motion.p>
          <motion.div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-concrete-100/60" variants={fadeIn} custom={3} initial="hidden" animate="visible">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
              42,000+ sq.ft capacity
            </span>
            <span className="hidden sm:block h-4 w-px bg-steel-700" />
            <span>118 ft road frontage</span>
            <span className="hidden sm:block h-4 w-px bg-steel-700" />
            <span>24×7 access</span>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber/70 to-transparent" />
    </section>
  );
}

function Gallery() {
  const rows = [
    galleryImages.slice(0, 3),
    galleryImages.slice(3, 6),
  ];

  return (
    <section className="relative bg-concrete-50 py-16 lg:py-24 overflow-hidden">
      <div className="absolute -left-40 top-24 w-96 h-96 rounded-full bg-amber/8 blur-3xl pointer-events-none animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="absolute right-[-180px] bottom-0 w-[450px] h-[450px] rounded-full bg-steel-900/5 blur-3xl pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div className="mb-10" variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
          <span className="section-eyebrow">FACILITY GALLERY</span>
          <h2 className="font-display text-3xl sm:text-4xl text-ink">Inside Vardha Warehousing</h2>
          <p className="text-sm text-steel-600 mt-2 max-w-xl">A practical commercial facility designed around access, movement and day-to-day warehouse operations.</p>
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
              {row.map((image) => (
                <motion.div
                  key={image.id}
                  className="group relative h-64 sm:h-72 lg:h-80 overflow-hidden border border-concrete-200 bg-steel-100 shadow-sm card-hover"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                  <img src={image.src} alt={image.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-steel-950/10 group-hover:bg-steel-950/0 transition-colors duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-amber bg-steel-950/80 backdrop-blur-sm px-2 py-1">{image.id}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Specifications() {
  const [specsRef, specsCount] = useCountUp(8, 2000);

  return (
    <section className="relative bg-concrete-100 py-16 lg:py-24 overflow-hidden">
      <div className="absolute -right-40 -top-40 w-[500px] h-[500px] rounded-full bg-amber/10 blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="absolute -left-48 bottom-[-240px] w-[500px] h-[500px] rounded-full bg-steel-900/5 blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div className="mb-10" variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
          <span className="section-eyebrow">FACILITY SPECIFICATIONS</span>
          <h2 className="font-display text-3xl sm:text-4xl text-ink">Key facility details</h2>
          <p className="text-sm text-steel-600 mt-2 max-w-xl">The infrastructure behind a practical, reliable commercial warehousing operation.</p>
        </motion.div>
        <motion.div
          ref={specsRef}
          className="bg-white border border-concrete-200 shadow-[0_20px_60px_rgba(20,27,35,0.07)]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {specs.map((spec, i) => (
            <motion.div
              key={spec.label}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-8 px-5 sm:px-7 py-5 border-b border-concrete-200 last:border-b-0"
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: 'easeOut' }}
            >
              <span className="text-xs font-bold text-steel-500 uppercase tracking-[0.15em] shrink-0">{spec.label}</span>
              <span className="text-sm text-ink text-right">{spec.value}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function WhyThisFacility() {
  const [featuresRef, featuresCount] = useCountUp(4, 2000);

  const rows = [
    whyUs.slice(0, 2),
    whyUs.slice(2, 4),
  ];

  return (
    <section className="relative bg-concrete-50 py-16 lg:py-24 overflow-hidden">
      <div className="absolute -left-40 top-24 w-96 h-96 rounded-full bg-amber/8 blur-3xl pointer-events-none animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="absolute right-[-180px] bottom-0 w-[450px] h-[450px] rounded-full bg-steel-900/5 blur-3xl pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div className="mb-10" variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
          <span className="section-eyebrow">WHY THIS FACILITY</span>
          <h2 className="font-display text-3xl sm:text-4xl text-ink">Designed around operations</h2>
          <p className="text-sm text-steel-600 mt-2 max-w-xl">Every major feature is focused on making warehouse movement simpler and more dependable.</p>
        </motion.div>
        <div className="space-y-6 lg:space-y-8">
          {rows.map((row, rowIndex) => (
            <motion.div
              key={rowIndex}
              className="grid sm:grid-cols-2 gap-5 lg:gap-6"
              variants={rowIndex % 2 === 0 ? slideInLeft : slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-120px' }}
            >
              {row.map((item) => (
                <motion.div
                  key={item.id}
                  className="group relative bg-white border border-concrete-200 p-6 lg:p-7 card-hover overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-amber scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
                  <span className="absolute top-5 right-5 text-[10px] font-bold tracking-widest text-steel-300 group-hover:text-amber/70 transition-colors">{item.id}</span>
                  <div className="relative w-11 h-11 bg-steel-900 flex items-center justify-center mb-5 overflow-hidden transition-all duration-300 group-hover:bg-amber">
                    <item.icon className="w-5 h-5 text-amber transition-all duration-300 group-hover:text-steel-950" />
                    <span className="absolute inset-0 border border-amber/20 group-hover:border-steel-950/20" />
                  </div>
                  <h3 className="font-display text-base sm:text-lg text-ink mb-2 pr-8">{item.title}</h3>
                  <p className="text-xs text-steel-500 leading-relaxed">{item.desc}</p>
                  <div className="mt-5 h-px bg-concrete-200 relative overflow-hidden">
                    <div className="absolute inset-y-0 left-0 w-10 bg-amber transition-all duration-500 group-hover:w-full" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>
        <motion.div
          ref={featuresRef}
          className="mt-12 bg-white border border-concrete-200 p-6 text-center"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="text-xs text-steel-500">
            <span className="text-amber font-bold mr-2">+</span>
            More facility features available on request
          </p>
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
            <span className="text-xs font-bold tracking-[0.18em] text-amber">READY TO GET STARTED?</span>
            <span className="h-px w-8 bg-amber" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6">Want to see availability for your area requirement?</h2>
          <p className="text-concrete-100/65 mt-5 mb-8 max-w-xl mx-auto leading-relaxed">
            Use our calculator to get an instant, transparent pricing estimate for your warehouse requirement.
          </p>
          <Link to="/book-space" className="btn-accent inline-flex items-center gap-3">
            <span>Calculate & Book Space</span>
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
