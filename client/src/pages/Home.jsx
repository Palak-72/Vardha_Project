import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Warehouse, Truck, Shield, Clock } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { SITE } from '../data/siteData';
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
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

const stats = [
  { label: 'Since', value: 1987, suffix: '' },
  { label: 'Capacity', value: 42000, suffix: '+ sq.ft.' },
  { label: 'Road Frontage', value: 118, suffix: ' ft' },
  { label: 'Access', value: 24, suffix: 'x7' },
];

const features = [
  { icon: Warehouse, title: 'Commercial Warehouse Property', desc: 'A dedicated commercial warehouse property with flexible storage configurations for racks, pallets, and inventory.' },
  { icon: Truck, title: '24×7 Commercial Truck Access', desc: 'Round-the-clock truck access with dedicated entry and exit for smooth loading and unloading operations.' },
  { icon: Shield, title: 'CCTV Surveillance & Security', desc: 'Comprehensive CCTV surveillance and security arrangements to protect your commercial inventory.' },
  { icon: Clock, title: 'Warehouse Expertise Since 1987', desc: 'Over three decades of warehousing, storage, logistics, and warehouse development expertise in Gorakhpur.' },
];

export default function Home() {
  usePageMeta('home');
  return (
    <div>
      <Helmet>
        <link rel="canonical" href="https://vardhawarehousing.com/" />
      </Helmet>
      <Hero />
      <Stats />
      <About />
      <WhyVardha />
      <FacilitySection />
      <Services />
      <CalculatorPreview />
      <UseCasesPreview />
      <ClientsSection />
      <LocationSection />
      <FAQSection />
      <CTASection />
    </div>
  );
}

function Hero() {
  const heroImages = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2G_ciyGoZqrXgqVAOVKdnAhPj0Jdq_IyX1CjvJVhq0w&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-YAhZfQEFqvN3uDLOuB2TWsvmJAqj_E4nDTz-JAwFtQ&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyezV-ixIsx0rvSju4NcZASLyLjGM6dW3kcmV1Cqdz-A&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4YzXWIxgsKbvi2toZXJ4cKALRGCO1KL8WarmOzkY2Ew&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8wSqvLFf_LUrU7YUYSaqv0ERhhrgqVah36lLf3jkAaw&s=10',
  ];

  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const slideVariants = [
    { hidden: { x: '-100%', opacity: 0 }, visible: { x: 0, opacity: 1 }, exit: { x: '100%', opacity: 0 } },
    { hidden: { x: '100%', opacity: 0 }, visible: { x: 0, opacity: 1 }, exit: { x: '-100%', opacity: 0 } },
    { hidden: { y: '-100%', opacity: 0 }, visible: { y: 0, opacity: 1 }, exit: { y: '100%', opacity: 0 } },
    { hidden: { y: '100%', opacity: 0 }, visible: { y: 0, opacity: 1 }, exit: { y: '-100%', opacity: 0 } },
    { hidden: { scale: 0.9, opacity: 0 }, visible: { scale: 1, opacity: 1 }, exit: { scale: 1.1, opacity: 0 } },
  ];

  return (
    <section className="relative bg-steel-950 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />
      <div className="absolute -right-40 -top-40 w-[520px] h-[520px] rounded-full bg-amber/10 blur-3xl animate-[pulse_7s_ease-in-out_infinite]" />
      <div className="absolute -left-40 bottom-[-200px] w-[450px] h-[450px] rounded-full bg-amber/5 blur-3xl animate-[pulse_9s_ease-in-out_infinite]" />
      <div className="absolute right-[20%] top-1/2 w-28 h-28 rounded-full bg-amber/5 blur-2xl animate-[floatGlow_8s_ease-in-out_infinite]" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div variants={fadeIn} initial="hidden" animate="visible">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-amber" />
              <span className="text-amber text-xs sm:text-sm font-semibold tracking-[0.18em]">WAREHOUSE HOME</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
              Premium Warehouse Space in <span className="text-amber">Gorakhpur</span>
            </h1>
            <p className="text-concrete-100/70 mt-6 max-w-2xl leading-relaxed text-base sm:text-lg">
              Flexible warehousing solutions for FMCG, e-commerce, steel, commercial inventory and distribution businesses.
            </p>
            <motion.div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-concrete-100/60" variants={fadeIn} custom={3} initial="hidden" animate="visible">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
                Flexible storage
              </span>
              <span className="hidden sm:block h-4 w-px bg-steel-700" />
              <span>Transparent pricing</span>
              <span className="hidden sm:block h-4 w-px bg-steel-700" />
              <span>Commercial-ready</span>
            </motion.div>
            <motion.div className="mt-10 flex flex-wrap gap-4" variants={fadeIn} custom={4} initial="hidden" animate="visible">
              <a href="#calculator" className="btn-accent inline-flex items-center gap-3">
                <span>Calculate Your Space</span>
                <ArrowRight size={18} />
              </a>
              <a
                href={`https://wa.me/${SITE.whatsappNumber}?text=Hi%20Vardha%20Warehousing%2C%20I%20would%20like%20to%20discuss%20warehouse%20space.`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white px-7 py-4 text-sm font-semibold transition-all duration-300 hover:-translate-y-1"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.273.298-1.045 1.02-1.045 2.488 0 1.469 1.07 2.89 1.219 3.087.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.273-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Us
              </a>
              <Link to="/contact" className="border border-white/20 hover:border-white/40 text-white px-7 py-4 text-sm font-semibold transition-all duration-300 hover:-translate-y-1">
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>
          <motion.div className="relative" variants={slideInRight} initial="hidden" animate="visible">
            <div className="relative aspect-square w-full max-w-lg mx-auto overflow-hidden border border-white/10 shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={imageIndex}
                  src={heroImages[imageIndex]}
                  alt="Warehouse facility"
                  className="w-full h-full object-cover"
                  loading="eager"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  variants={slideVariants[imageIndex]}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <span className="bg-amber text-steel-950 text-[11px] font-bold tracking-wider px-3 py-1.5">118 FT ROAD FRONT</span>
                <span className="bg-white/90 text-steel-950 text-[11px] font-bold tracking-wider px-3 py-1.5">24×7</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber/70 to-transparent" />
    </section>
  );
}

function Stats() {
  return (
    <section className="relative bg-concrete-100 py-16 lg:py-24 overflow-hidden">
      <div className="absolute -left-40 top-24 w-[420px] h-[420px] rounded-full bg-amber/5 blur-3xl pointer-events-none" />
      <div className="absolute right-[-180px] bottom-[-100px] w-[500px] h-[500px] rounded-full bg-steel-900/5 blur-3xl pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-steel-800">
          {stats.map((stat, i) => {
            const [ref, count] = useCountUp(stat.value, 2000);
            return (
              <motion.div
                key={stat.label}
                ref={ref}
                className="relative bg-steel-950 py-9 px-5 text-center group overflow-hidden hover:bg-steel-900 transition-colors duration-300"
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
              >
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-amber group-hover:w-1/2 transition-all duration-500" />
                <span className="block text-[10px] tracking-[0.2em] text-amber mb-2">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-display text-base sm:text-lg text-white/70 group-hover:text-white transition-colors">
                  {count.toLocaleString('en-IN')}{stat.suffix}
                </span>
                <span className="block text-[10px] tracking-[0.15em] text-concrete-100/50 mt-1 uppercase">{stat.label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="relative bg-concrete-50 overflow-hidden">
      <div className="absolute -left-40 top-20 w-96 h-96 rounded-full bg-amber/8 blur-3xl pointer-events-none animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="absolute right-[-180px] bottom-0 w-[450px] h-[450px] rounded-full bg-steel-900/5 blur-3xl pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
            <span className="section-eyebrow">ABOUT US</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink leading-tight mb-6">
              Trusted warehousing partner since <span className="text-amber">1987</span>
            </h2>
            <p className="text-sm text-steel-600 leading-relaxed mb-6">
              For over three decades, Vardha Warehousing has been Gorakhpur's trusted name in commercial warehouse space. Our facility combines strategic location, modern infrastructure, and personalized service to help businesses store, manage, and distribute their inventory efficiently.
            </p>
            <p className="text-sm text-steel-600 leading-relaxed mb-8">
              With approximately 36 metres / 118 feet wide road frontage, 24×7 commercial truck access, easy transport and loading/unloading movement, CCTV surveillance, security arrangements, and an office facility for operational requirements — we provide the connectivity and infrastructure your business needs. Whether you're a small enterprise or a large distributor, our flexible warehouse solutions scale with your requirements.
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 text-sm font-bold text-amber-700 hover:text-amber-600 transition-colors group">
              Learn more about us
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          <motion.div className="relative" variants={slideInRight} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
            <div className="relative -right-2 -bottom-2 w-full h-80 lg:h-96 border border-concrete-200 bg-steel-100 shadow-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80"
                alt="Warehouse facility"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -right-2 -bottom-2 w-full h-80 lg:h-96 border border-amber/30 pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FacilitySection() {
  const facilities = [
    { title: 'General Warehouse', desc: 'Spacious, well-ventilated units ideal for general merchandise and manufacturing inventory.' },
    { title: 'Cold Storage', desc: 'Temperature-controlled storage for perishables, pharmaceuticals, and food products.' },
    { title: 'Bonded Warehouse', desc: 'Customs-bonded storage for imported goods with secure handling and documentation.' },
    { title: 'Distribution Hub', desc: 'Strategically located for last-mile delivery across Uttar Pradesh and nearby regions.' },
  ];

  return (
    <section id="facility" className="relative bg-concrete-100 py-16 lg:py-24 overflow-hidden">
      <div className="absolute -right-40 -top-40 w-[500px] h-[500px] rounded-full bg-amber/10 blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="absolute -left-48 bottom-[-240px] w-[500px] h-[500px] rounded-full bg-steel-900/5 blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div className="mb-10 lg:mb-12" variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <span className="section-eyebrow">OUR FACILITY</span>
          <h2 className="font-display text-3xl sm:text-4xl text-ink">World-class warehouse infrastructure</h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {facilities.map((facility, i) => (
            <motion.div
              key={facility.title}
              className="group relative bg-white border border-concrete-200 p-6 lg:p-7 card-hover overflow-hidden"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-amber scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
              <span className="absolute top-5 right-5 text-[10px] font-bold tracking-widest text-steel-300 group-hover:text-amber/70 transition-colors">{String(i + 1).padStart(2, '0')}</span>
              <div className="relative w-11 h-11 bg-steel-900 flex items-center justify-center mb-5 overflow-hidden transition-all duration-300 group-hover:bg-amber">
                <span className="w-2 h-2 rounded-full bg-amber transition-all duration-300 group-hover:bg-steel-950 group-hover:scale-125" />
                <span className="absolute inset-0 border border-amber/20 group-hover:border-steel-950/20" />
              </div>
              <h3 className="font-display text-xl text-ink mb-3 pr-8">{facility.title}</h3>
              <p className="text-sm text-steel-600 leading-relaxed">{facility.desc}</p>
              <div className="mt-6 h-px bg-concrete-200 overflow-hidden">
                <div className="h-full w-10 bg-amber transition-all duration-500 group-hover:w-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    { title: 'Warehouse Storage', desc: 'Short-term and long-term storage solutions tailored to your inventory needs and operational cycles.' },
    { title: 'Inventory Management', desc: 'Track stock levels, manage inbound and outbound movements, and reduce carrying costs.' },
    { title: 'Distribution Support', desc: 'Last-mile and bulk distribution support with direct road connectivity to major markets.' },
    { title: 'Custom Solutions', desc: 'Dedicated setups for unique business requirements including racking, loading docks, and security.' },
  ];

  return (
    <section id="solutions" className="relative bg-concrete-50 overflow-hidden">
      <div className="absolute -left-40 top-24 w-[420px] h-[420px] rounded-full bg-amber/5 blur-3xl pointer-events-none" />
      <div className="absolute right-[-180px] bottom-[-100px] w-[500px] h-[500px] rounded-full bg-steel-900/5 blur-3xl pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-16 lg:py-24">
        <motion.div className="text-center mb-12" variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <span className="section-eyebrow">WHAT WE OFFER</span>
          <h2 className="font-display text-3xl sm:text-4xl text-ink">Our warehouse solutions</h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              className="group relative bg-white border border-concrete-200 p-6 lg:p-7 card-hover overflow-hidden"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-amber scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
              <span className="absolute top-5 right-5 text-[10px] font-bold tracking-widest text-steel-300 group-hover:text-amber/70 transition-colors">{String(i + 1).padStart(2, '0')}</span>
              <div className="relative w-11 h-11 bg-steel-900 flex items-center justify-center mb-5 overflow-hidden transition-all duration-300 group-hover:bg-amber">
                <span className="w-2 h-2 rounded-full bg-amber transition-all duration-300 group-hover:bg-steel-950 group-hover:scale-125" />
                <span className="absolute inset-0 border border-amber/20 group-hover:border-steel-950/20" />
              </div>
              <h3 className="font-display text-xl text-ink mb-3 pr-8">{service.title}</h3>
              <p className="text-sm text-steel-600 leading-relaxed">{service.desc}</p>
              <div className="mt-6 h-px bg-concrete-200 overflow-hidden">
                <div className="h-full w-10 bg-amber transition-all duration-500 group-hover:w-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyVardha() {
  const reasons = [
    { title: 'Warehouse Expertise Since 1987', desc: 'Vardha Warehousing has spent nearly four decades building warehousing, storage, logistics, and warehouse development expertise — helping commercial businesses store and move inventory reliably.' },
    { title: 'Purpose-Built Facility', desc: 'Our property at Gorakhnath Mandir Road, Bargadwa, Gorakhpur is designed for commercial movement: wide haulage for trucks, secure yard space, and an operational office.' },
    { title: 'Proven Infrastructure', desc: 'Approximately 36 metres / 118 feet wide road frontage, 24×7 commercial truck access, easy transport and loading/unloading movement, CCTV surveillance, security arrangements, and office facility for operational requirements.' },
    { title: 'Flexible Warehouse Solutions', desc: 'Whether you need short-term overflow storage or long-term dedicated space, our solutions adapt to your business cycles and inventory requirements.' },
  ];

  return (
    <section className="relative bg-white py-16 lg:py-24 overflow-hidden">
      <div className="absolute -left-40 top-20 w-96 h-96 rounded-full bg-amber/8 blur-3xl pointer-events-none animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="absolute right-[-180px] bottom-0 w-[450px] h-[450px] rounded-full bg-steel-900/5 blur-3xl pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div className="mb-10 lg:mb-12" variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
          <span className="section-eyebrow">WHY VARDHA</span>
          <h2 className="font-display text-3xl sm:text-4xl text-ink">Built on warehousing, not just real estate</h2>
          <p className="text-sm text-steel-600 mt-2 max-w-xl">We come from a background of warehousing, storage, and logistics operations — which shapes how our facility is designed.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 gap-5 lg:gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              className="group relative bg-concrete-50 border border-concrete-200 p-6 lg:p-7 card-hover overflow-hidden"
              variants={i % 2 === 0 ? slideInLeft : slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-amber scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
              <span className="absolute top-5 right-5 text-[10px] font-bold tracking-widest text-steel-300 group-hover:text-amber/70 transition-colors">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="font-display text-lg sm:text-xl text-ink mb-2 pr-8">{reason.title}</h3>
              <p className="text-sm text-steel-600 leading-relaxed">{reason.desc}</p>
              <div className="mt-5 h-px bg-concrete-200 relative overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-10 bg-amber transition-all duration-500 group-hover:w-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CalculatorPreview() {
  const [method, setMethod] = useState('dimensions');
  const [area, setArea] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');

  const lengthNum = parseFloat(length) || 0;
  const widthNum = parseFloat(width) || 0;
  const areaInput = parseFloat(area) || 0;
  const calculatedArea = method === 'dimensions' ? lengthNum * widthNum : areaInput;
  const rate = calculatedArea >= 500 && calculatedArea <= 42000 ? (calculatedArea <= 5000 ? 60 : 24) : null;
  const monthly = rate !== null ? calculatedArea * rate : 0;

  const areaMessage =
    calculatedArea > 0 && calculatedArea < 500
      ? 'Minimum required area is 500 sq.ft.'
      : calculatedArea > 42000
      ? 'For requirements above 42,000 sq.ft., please contact our team for a customized solution.'
      : null;

  return (
    <section id="calculator" className="relative bg-white py-16 lg:py-24 overflow-hidden">
      <div className="absolute -left-40 top-20 w-96 h-96 rounded-full bg-amber/8 blur-3xl pointer-events-none animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="absolute right-[-180px] bottom-0 w-[450px] h-[450px] rounded-full bg-steel-900/5 blur-3xl pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div className="mb-10 lg:mb-12" variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
          <span className="section-eyebrow">CALCULATOR</span>
          <h2 className="font-display text-3xl sm:text-4xl text-ink">Calculate Your Warehouse Requirement</h2>
          <p className="text-sm text-steel-600 mt-2 max-w-xl">Enter your space requirements to get an instant estimate.</p>
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <motion.div variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="bg-concrete-50 border border-concrete-200 p-6 sm:p-8 rounded-lg">
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-steel-600 uppercase tracking-wide mb-2">Calculation Method</label>
                <div className="flex gap-3">
                  {[
                    { key: 'dimensions', label: 'Length × Width' },
                    { key: 'direct', label: 'Direct Area' },
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setMethod(opt.key)}
                      className={`flex-1 py-2.5 text-sm font-semibold rounded border transition-all ${
                        method === opt.key ? 'bg-amber text-steel-950 border-amber' : 'bg-white text-ink border-concrete-200 hover:border-amber'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              {method === 'direct' ? (
                <div>
                  <label className="block text-xs font-semibold text-steel-600 uppercase tracking-wide mb-1.5">Required Area (sq.ft.)</label>
                  <input type="number" value={area} onChange={(e) => setArea(e.target.value)} className="w-full rounded border border-concrete-200 px-3 py-2.5 text-sm outline-none focus:ring-1 focus:ring-amber focus:border-amber" placeholder="e.g. 5000" />
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-steel-600 uppercase tracking-wide mb-1.5">Length (ft)</label>
                    <input type="number" value={length} onChange={(e) => setLength(e.target.value)} className="w-full rounded border border-concrete-200 px-3 py-2.5 text-sm outline-none focus:ring-1 focus:ring-amber focus:border-amber" placeholder="e.g. 100" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-steel-600 uppercase tracking-wide mb-1.5">Width (ft)</label>
                    <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} className="w-full rounded border border-concrete-200 px-3 py-2.5 text-sm outline-none focus:ring-1 focus:ring-amber focus:border-amber" placeholder="e.g. 50" />
                  </div>
                </div>
              )}
              <div>
                <label className="block text-xs font-semibold text-steel-600 uppercase tracking-wide mb-1.5">Height (ft)</label>
                <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full rounded border border-concrete-200 px-3 py-2.5 text-sm outline-none focus:ring-1 focus:ring-amber focus:border-amber" placeholder="e.g. 12" />
              </div>
              {areaMessage && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded px-4 py-3">
                  {areaMessage}
                </div>
              )}
            </div>
          </motion.div>
          <motion.div variants={slideInRight} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="bg-white border border-concrete-200 p-6 sm:p-8 rounded-lg">
            <p className="text-xs font-bold text-steel-500 uppercase tracking-[0.15em] mb-4">Live Estimate</p>
            <div className="space-y-4">
              <div className="bg-concrete-50 border border-concrete-200 rounded p-4">
                <p className="text-[10px] text-steel-500 uppercase tracking-wide">Required Space</p>
                <p className="text-sm font-semibold text-ink mt-1">{calculatedArea > 0 ? `${Math.round(calculatedArea).toLocaleString('en-IN')} sq.ft.` : '-'}</p>
              </div>
              <div className="bg-concrete-50 border border-concrete-200 rounded p-4">
                <p className="text-[10px] text-steel-500 uppercase tracking-wide">Applicable Rate</p>
                <p className="text-sm font-semibold text-ink mt-1">
                  {calculatedArea > 0
                    ? rate !== null
                      ? `₹${rate} / sq.ft.`
                      : 'Out of range'
                    : '-'}
                </p>
              </div>
              <div className="bg-concrete-50 border border-concrete-200 rounded p-4">
                <p className="text-[10px] text-steel-500 uppercase tracking-wide">Estimated Monthly Amount</p>
                <p className="text-sm font-semibold text-amber-700 mt-1">{monthly > 0 ? `₹${monthly.toLocaleString('en-IN')}` : '-'}</p>
              </div>
            </div>
            <div className="mt-6">
              <Link to="/book-space" className="btn-accent inline-flex items-center gap-3">
                <span>Proceed to Book</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function UseCasesPreview() {
  const useCases = [
    { title: 'FMCG Businesses', desc: 'High-turnover storage for fast-moving consumer goods with efficient picking, dispatch, and inventory management.', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80' },
    { title: 'E-commerce & D2C Businesses', desc: 'Fast, reliable storage and dispatch support for online retailers and direct-to-consumer brands managing high-volume inventory.', image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&auto=format&fit=crop&q=80' },
    { title: 'Steel Businesses', desc: 'Secure, heavy-duty storage for steel materials and industrial goods with easy loading, unloading, and transport access.', image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&auto=format&fit=crop&q=80' },
    { title: 'Industrial & Commercial Goods', desc: 'Flexible warehouse space for industrial equipment, commercial inventory, and bulk goods requiring organized storage.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReaOj5raVkftb5G1k6vvlr_NsRjdz-5Qk_GQtvXJmjIA&s=10' },
    { title: 'Distribution & Logistics Businesses', desc: 'Strategically located hub for distribution, cross-docking, and last-mile delivery with 24×7 truck access.', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80' },
  ];

  return (
    <section className="relative bg-concrete-50 py-16 lg:py-24 overflow-hidden">
      <div className="absolute -left-40 top-24 w-96 h-96 rounded-full bg-amber/8 blur-3xl pointer-events-none animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="absolute right-[-180px] bottom-0 w-[450px] h-[450px] rounded-full bg-steel-900/5 blur-3xl pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div className="text-center mb-12" variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <span className="section-eyebrow">USE CASES</span>
          <h2 className="font-display text-3xl sm:text-4xl text-ink">Tailored for your business</h2>
          <p className="text-sm text-steel-600 max-w-xl mx-auto mt-4 leading-relaxed">Flexible warehousing solutions for FMCG, e-commerce, steel, commercial inventory and distribution businesses.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {useCases.map((item, i) => (
            <motion.div
              key={item.title}
              className="group relative bg-white border border-concrete-200 overflow-hidden flex flex-col card-hover"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: 'easeOut' }}
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-amber scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
              <div className="relative w-full h-52 overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-steel-950/20 group-hover:bg-steel-950/5 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-steel-950/60 to-transparent" />
                <span className="absolute top-4 left-4 w-9 h-9 bg-steel-950/80 text-amber flex items-center justify-center text-xs font-bold border border-amber/30">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="relative p-6 lg:p-7 flex-1 flex flex-col">
                <div className="mb-4">
                  <span className="text-[10px] font-bold tracking-[0.18em] text-amber-700 uppercase">Commercial Storage</span>
                  <h3 className="font-display text-xl lg:text-2xl text-ink mt-2 mb-2">{item.title}</h3>
                </div>
                <p className="text-sm text-steel-600 leading-relaxed mb-6 flex-1">{item.desc}</p>
                <div className="mt-auto h-px bg-concrete-200 relative overflow-hidden">
                  <div className="absolute inset-y-0 left-0 w-12 bg-amber transition-all duration-500 group-hover:w-full" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LocationSection() {
  return (
    <section className="relative bg-white py-16 lg:py-24 overflow-hidden">
      <div className="absolute -left-40 top-24 w-[420px] h-[420px] rounded-full bg-amber/5 blur-3xl pointer-events-none" />
      <div className="absolute right-[-180px] bottom-[-100px] w-[500px] h-[500px] rounded-full bg-steel-900/5 blur-3xl pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div className="mb-10 lg:mb-12" variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <span className="section-eyebrow">LOCATION</span>
          <h2 className="font-display text-3xl sm:text-4xl text-ink">Strategically located in Gorakhpur</h2>
          <p className="text-sm text-steel-600 mt-2 max-w-xl">Gorakhnath Mandir Road, Bargadwa, Gorakhpur, Uttar Pradesh — easy transport and loading/unloading movement.</p>
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <motion.div variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
            <div className="space-y-4">
              <div className="bg-concrete-50 border border-concrete-200 p-5">
                <p className="text-xs font-bold text-steel-500 uppercase tracking-[0.15em] mb-1">Address</p>
                <p className="text-sm text-ink">Gorakhnath Mandir Road, Bargadwa, Gorakhpur, Uttar Pradesh</p>
              </div>
              <div className="bg-concrete-50 border border-concrete-200 p-5">
                <p className="text-xs font-bold text-steel-500 uppercase tracking-[0.15em] mb-1">Road Frontage</p>
                <p className="text-sm text-ink">Approximately 36 metres / 118 feet wide</p>
              </div>
              <div className="bg-concrete-50 border border-concrete-200 p-5">
                <p className="text-xs font-bold text-steel-500 uppercase tracking-[0.15em] mb-1">Truck Access</p>
                <p className="text-sm text-ink">24×7 commercial truck access</p>
              </div>
              <div className="bg-concrete-50 border border-concrete-200 p-5">
                <p className="text-xs font-bold text-steel-500 uppercase tracking-[0.15em] mb-1">Contact</p>
                <p className="text-sm text-ink">+91 96701 11167</p>
                <p className="text-sm text-ink">enquiry@vardhawarehousing.com</p>
              </div>
            </div>
          </motion.div>
          <motion.div variants={slideInRight} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
            <div className="relative h-80 lg:h-[28rem] overflow-hidden border border-concrete-200 bg-steel-100 shadow-lg">
              <iframe
                title="Vardha Warehousing Location"
                src={SITE.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ClientsSection() {
  return (
    <section id="clients" className="relative bg-concrete-100 py-16 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.28] pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />
      <div className="absolute -right-32 -top-32 w-[420px] h-[420px] rounded-full bg-amber/10 blur-3xl animate-[pulse_7s_ease-in-out_infinite]" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 text-center">
        <motion.div className="max-w-2xl mx-auto" variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <span className="section-eyebrow">JOIN OUR CLIENTS</span>
          <h2 className="font-display text-3xl sm:text-4xl text-ink mb-4">Store your inventory with Vardha</h2>
          <p className="text-sm text-steel-600 max-w-xl mx-auto mb-8 leading-relaxed">
            Vardha Warehousing provides nationwide/custom warehouse solutions for FMCG, e-commerce and D2C, steel, industrial and commercial goods, and distribution and logistics businesses.
          </p>
          <Link to="/contact" className="btn-accent inline-flex items-center gap-3">
            <span>Contact Vardha</span>
            <ArrowRight size={18} />
          </Link>
          <p className="mt-5 text-[11px] uppercase tracking-[0.15em] text-steel-400">Quick enquiry • Commercial storage • Gorakhpur</p>
        </motion.div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    { q: 'What types of warehouse space do you offer?', a: 'We offer general warehouse, cold storage, bonded warehouse, and distribution hub spaces tailored to different business needs.' },
    { q: 'How do I book warehouse space?', a: 'You can use our online calculator to get an estimate, then submit an enquiry. Our team will contact you to finalize the booking.' },
    { q: 'Is 24x7 access available?', a: 'Yes, we provide round-the-clock access to all our warehouse facilities with dedicated entry and exit points.' },
    { q: 'What is the minimum lease period?', a: 'We offer flexible lease periods starting from monthly to annual contracts depending on your business requirements.' },
    { q: 'Do you provide loading and unloading support?', a: 'Yes, our facilities include loading docks, ramps, and dedicated staff to assist with smooth operations.' },
  ];

  return (
    <section id="faq" className="relative bg-concrete-100 py-16 lg:py-24 overflow-hidden">
      <div className="absolute -left-24 -top-24 w-72 h-72 border border-amber/10 rounded-full animate-[spin_20s_linear_infinite]" />
      <div className="absolute -left-12 -top-12 w-48 h-48 border border-amber/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
      <div className="absolute -right-32 -bottom-32 w-80 h-80 rounded-full bg-amber/10 blur-3xl animate-[pulse_7s_ease-in-out_infinite]" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div className="text-center mb-12" variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <span className="section-eyebrow">FAQ</span>
          <h2 className="font-display text-3xl sm:text-4xl text-ink">Frequently Asked Questions</h2>
        </motion.div>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border border-concrete-200 shadow-[0_20px_60px_rgba(20,27,35,0.07)] divide-y divide-concrete-200">
            {faqs.map((faq, i) => (
              <FAQItem key={faq.q} faq={faq} index={i} />
            ))}
          </div>
          <div className="relative mt-12 overflow-hidden bg-steel-950 text-white p-8 sm:p-10 shadow-[0_20px_60px_rgba(20,27,35,0.15)]">
            <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-amber/15 blur-3xl animate-[pulse_5s_ease-in-out_infinite]" />
            <div className="absolute -left-20 -bottom-28 h-52 w-52 rounded-full bg-amber/10 blur-3xl" />
            <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-7">
              <div>
                <p className="text-amber text-xs font-bold tracking-[0.16em] uppercase mb-3">Need more help?</p>
                <h3 className="font-display text-2xl sm:text-3xl mb-2">Still have questions?</h3>
                <p className="text-sm text-concrete-100/65 max-w-md">Our team is happy to help directly over WhatsApp.</p>
              </div>
              <a
                href={`https://wa.me/${SITE.whatsappNumber}?text=Hi%20Vardha%20Warehousing%2C%20I%20have%20a%20question%20before%20booking%20warehouse%20space.`}
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1FBE5A] text-white font-semibold px-6 py-3.5 text-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(37,211,102,0.25)]"
              >
                <span className="absolute inset-0 -translate-x-full bg-white/20 skew-x-[-20deg] group-hover:translate-x-[150%] transition-transform duration-700" />
                <span className="relative">WhatsApp Vardha</span>
                <span className="relative text-lg group-hover:translate-x-1 transition-transform duration-300">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="group border-b border-concrete-200 last:border-b-0 transition-all duration-300">
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
    </div>
  );
}

function CalculatorSection() {
  const [area, setArea] = useState('');
  const [rate, setRate] = useState(25);
  const [duration, setDuration] = useState('12 months');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const sqft = parseFloat(area) || 0;
    const months = duration === '1 month' ? 1 : duration === '3 months' ? 3 : duration === '6 months' ? 6 : 12;
    const monthly = sqft * rate;
    const total = monthly * months;
    setResult({ sqft, monthly, total, months });
  };

  return (
    <section id="calculator" className="relative bg-white py-16 lg:py-24 overflow-hidden">
      <div className="absolute -left-40 top-24 w-96 h-96 rounded-full bg-amber/8 blur-3xl pointer-events-none" />
      <div className="absolute right-[-180px] bottom-0 w-[450px] h-[450px] rounded-full bg-steel-900/5 blur-3xl pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div className="mb-10 lg:mb-12" variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <span className="section-eyebrow">CALCULATOR</span>
          <h2 className="font-display text-3xl sm:text-4xl text-ink">Calculate Your Space</h2>
          <p className="text-sm text-steel-600 mt-2">Get an instant estimate for your warehouse requirement.</p>
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <motion.div variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="bg-white border border-concrete-200 p-6 sm:p-8 rounded-lg shadow-sm">
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-steel-600 uppercase tracking-wide mb-1.5">Required Area (sq.ft.)</label>
                <input type="number" value={area} onChange={(e) => setArea(e.target.value)} className="w-full rounded border border-concrete-200 px-3 py-2.5 text-sm outline-none focus:ring-1 focus:ring-amber focus:border-amber" placeholder="e.g. 5000" />
              </div>
              <div>
                <label className="block text-xs font-bold text-steel-600 uppercase tracking-wide mb-1.5">Applicable Rate (₹/sq.ft./month)</label>
                <input type="number" value={rate} onChange={(e) => setRate(parseFloat(e.target.value) || 0)} className="w-full rounded border border-concrete-200 px-3 py-2.5 text-sm outline-none focus:ring-1 focus:ring-amber focus:border-amber" />
              </div>
              <div>
                <label className="block text-xs font-bold text-steel-600 uppercase tracking-wide mb-1.5">Duration</label>
                <select value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full rounded border border-concrete-200 px-3 py-2.5 text-sm outline-none focus:ring-1 focus:ring-amber focus:border-amber">
                  <option value="1 month">1 month</option>
                  <option value="3 months">3 months</option>
                  <option value="6 months">6 months</option>
                  <option value="12 months">12 months</option>
                </select>
              </div>
              <button onClick={calculate} className="w-full bg-steel-950 hover:bg-steel-800 text-white px-6 py-3 text-sm font-semibold transition-colors">
                Calculate
              </button>
            </div>
          </motion.div>
          <motion.div variants={slideInRight} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="bg-concrete-50 border border-concrete-200 p-6 sm:p-8 rounded-lg">
            {result ? (
              <div className="space-y-4">
                <h3 className="font-display text-xl text-ink mb-4">Estimate</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 border border-concrete-200 rounded">
                    <p className="text-[10px] text-steel-500 uppercase tracking-wide">Area</p>
                    <p className="text-sm font-semibold text-ink mt-1">{result.sqft.toLocaleString('en-IN')} sq.ft.</p>
                  </div>
                  <div className="bg-white p-4 border border-concrete-200 rounded">
                    <p className="text-[10px] text-steel-500 uppercase tracking-wide">Monthly Amount</p>
                    <p className="text-sm font-semibold text-amber-700 mt-1">₹{result.monthly.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="bg-white p-4 border border-concrete-200 rounded">
                    <p className="text-[10px] text-steel-500 uppercase tracking-wide">Duration</p>
                    <p className="text-sm font-semibold text-ink mt-1">{result.months} months</p>
                  </div>
                  <div className="bg-white p-4 border border-concrete-200 rounded">
                    <p className="text-[10px] text-steel-500 uppercase tracking-wide">Total Estimate</p>
                    <p className="text-sm font-semibold text-amber-700 mt-1">₹{result.total.toLocaleString('en-IN')}</p>
                  </div>
                </div>
                <Link to="/book-space" className="inline-flex items-center gap-2 mt-4 bg-amber hover:bg-amber-600 text-steel-950 px-6 py-3 text-sm font-bold transition-colors">
                  Book Now <ArrowRight size={16} />
                </Link>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-center py-12">
                <div>
                  <p className="text-sm text-steel-500 mb-2">Enter area and duration to see your estimate.</p>
                  <p className="text-xs text-steel-400">No commitment required</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
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
