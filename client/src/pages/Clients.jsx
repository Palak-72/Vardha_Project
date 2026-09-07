import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { SITE } from '../data/siteData';
import useCountUp from '../hooks/useCountUp';
import usePageMeta from '../hooks/usePageMeta';

// export default function Clients() {
//   usePageMeta('clients');
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

const clients = [
  { id: '01', name: 'DPS', fullName: 'DPS — Delhi Public School', image: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=400&auto=format&fit=crop&q=80' },
  { id: '02', name: 'FCI', fullName: 'FCI Fertilizer, Gorakhpur', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrkrWnm6du-g12qgNrib_gbPTVIAHpeC1wsiDZ8PcjXg&s=10' },
  { id: '03', name: 'KZ', fullName: 'Kezalnut Factory', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9-k4xI_caf2FfvxgYM261qwfZNulGh2gSQqIZG3Aa8w&s=10' },
  { id: '04', name: 'LOD', fullName: 'Lord of the Drinks', image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=400&auto=format&fit=crop&q=80' },
];

const industries = [
  { id: '01', name: 'FMCG' },
  { id: '02', name: 'Education' },
  { id: '03', name: 'Manufacturing' },
  { id: '04', name: 'Hospitality' },
];

export default function Clients() {
  usePageMeta('clients');
  return (
    <div>
      <Hero />
      <ClientsList />
      <IndustriesSection />
      <CTASection />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative bg-steel-950 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />
      <div className="absolute -right-40 -top-48 h-[520px] w-[520px] rounded-full bg-amber/15 blur-3xl animate-[pulse_6s_ease-in-out_infinite]" />
      <div className="absolute -left-48 bottom-[-280px] h-[500px] w-[500px] rounded-full bg-amber/10 blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="absolute top-1/2 -right-20 h-40 w-[500px] rotate-[-20deg] bg-amber/5 blur-3xl animate-[floatGlow_7s_ease-in-out_infinite]" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl">
          <motion.div className="flex items-center gap-3 mb-5" variants={fadeIn} initial="hidden" animate="visible">
            <span className="h-px w-10 bg-amber" />
            <span className="text-amber text-xs sm:text-sm font-semibold tracking-[0.18em]">CLIENTS</span>
          </motion.div>
          <motion.h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight" variants={fadeIn} custom={1} initial="hidden" animate="visible">
            Trusted <span className="text-concrete-100/60">By</span>
          </motion.h1>
          <motion.p className="text-concrete-100/70 mt-6 max-w-2xl leading-relaxed text-base sm:text-lg" variants={fadeIn} custom={2} initial="hidden" animate="visible">
            Businesses across education, FMCG, manufacturing and hospitality store their inventory with Vardha Warehousing.
          </motion.p>
          <motion.div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-[11px] uppercase tracking-[0.18em] text-concrete-100/50" variants={fadeIn} custom={3} initial="hidden" animate="visible">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
              Commercial Clients
            </span>
            <span className="hidden sm:block h-4 w-px bg-steel-700" />
            <span>Multiple Industries</span>
            <span className="hidden sm:block h-4 w-px bg-steel-700" />
            <span>Reliable Storage</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ClientsList() {
  return (
    <section className="relative bg-concrete-50 py-16 lg:py-24 overflow-hidden">
      <div className="absolute -left-40 top-24 w-96 h-96 rounded-full bg-amber/8 blur-3xl pointer-events-none animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="absolute right-[-180px] bottom-0 w-[450px] h-[450px] rounded-full bg-steel-900/5 blur-3xl pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div className="mb-10" variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
          <span className="section-eyebrow">OUR CLIENTS</span>
          <h2 className="font-display text-3xl sm:text-4xl text-ink">Businesses that store with us</h2>
          <p className="text-sm text-steel-600 mt-2 max-w-xl">Long-term commercial relationships built around dependable infrastructure and smooth inventory movement.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {clients.map((client, i) => (
            <motion.div
              key={client.id}
              className="group relative bg-white border border-concrete-200 overflow-hidden card-hover"
              variants={i % 2 === 0 ? slideInLeft : slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-amber scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
              <div className="relative h-48 sm:h-56 overflow-hidden bg-steel-100">
                <img
                  src={client.image}
                  alt={client.fullName}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-steel-950/20 group-hover:bg-steel-950/5 transition-colors duration-500" />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-amber bg-steel-950/80 backdrop-blur-sm px-2 py-1">{client.id}</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg text-ink mb-1">{client.name}</h3>
                <p className="text-xs text-steel-500">{client.fullName}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="mt-8 bg-white border border-concrete-200 p-6 text-center"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="w-8 h-8 border border-concrete-300 flex items-center justify-center text-amber-700 mx-auto mb-2 group-hover:border-amber transition-colors">
            <span className="text-lg leading-none">+</span>
          </div>
          <p className="text-xs text-steel-500">More clients added regularly</p>
        </motion.div>
      </div>
    </section>
  );
}

function IndustriesSection() {
  const [countRef, count] = useCountUp(4, 2000);

  return (
    <section className="relative bg-concrete-100 py-16 lg:py-24 overflow-hidden">
      <div className="absolute -right-40 -top-40 w-[500px] h-[500px] rounded-full bg-amber/10 blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="absolute -left-48 bottom-[-240px] w-[500px] h-[500px] rounded-full bg-steel-900/5 blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div className="mb-10" variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
          <span className="section-eyebrow">INDUSTRIES</span>
          <h2 className="font-display text-3xl sm:text-4xl text-ink">Industries we serve</h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 lg:gap-6">
          {industries.map((industry, i) => (
            <motion.div
              key={industry.id}
              className="group relative bg-white border border-concrete-200 p-6 lg:p-7 card-hover overflow-hidden"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-amber scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
              <span className="absolute top-5 right-5 text-[10px] font-bold tracking-widest text-steel-300 group-hover:text-amber/70 transition-colors">{industry.id}</span>
              <div className="relative w-12 h-12 bg-steel-900 flex items-center justify-center mb-4 overflow-hidden transition-all duration-300 group-hover:bg-amber">
                <span className="text-amber font-display text-sm font-bold transition-all duration-300 group-hover:text-steel-950">{industry.name.substring(0, 2)}</span>
                <span className="absolute inset-0 border border-amber/20 group-hover:border-steel-950/20" />
              </div>
              <h3 className="font-display text-xl text-ink">{industry.name}</h3>
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
            href={`https://wa.me/${SITE.whatsappNumber}?text=Hi%20Vardha%20Warehousing%2C%20I%20would%20like%20to%20discuss%20warehouse%20space.`}
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
