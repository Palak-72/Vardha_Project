import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Warehouse, Truck, Shield, MapPin } from 'lucide-react';
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

// export default function About() {
//   usePageMeta('about');
//     opacity: 1,
//     x: 0,
//     transition: { duration: 1, ease: 'easeOut' },
//   },
// };

const timeline = [
  { year: '1987', title: 'The Beginning', desc: 'Vardha begins its journey in warehousing and storage services with a small facility in Gorakhpur.' },
  { year: '1990s–2000s', title: 'Expansion', desc: 'Expansion into logistics support and warehouse development for commercial clients across Uttar Pradesh.' },
  { year: '2010s', title: 'Modernization', desc: 'Facility upgrades — 36m / 118 ft road frontage, 24×7 truck access, CCTV surveillance, and dedicated office infrastructure.' },
  { year: 'Today', title: 'A Trusted Name', desc: 'A dedicated commercial warehouse property in Gorakhpur serving FMCG, e-commerce and D2C, steel, industrial and commercial goods, and distribution and logistics businesses.' },
];

const services = [
  { icon: Warehouse, title: 'Warehousing', desc: 'Commercial-grade warehouse space designed for daily inventory management and long-term storage.' },
  { icon: Truck, title: 'Storage', desc: 'Short and long-term storage for bulk and palletized goods, with organized racking and handling.' },
  { icon: Shield, title: 'Logistics', desc: 'Last-mile infrastructure that supports smooth distribution across Uttar Pradesh and nearby regions.' },
  { icon: MapPin, title: 'Warehouse Development', desc: 'Custom warehouse solutions for businesses with specific operational requirements.' },
];

export default function About() {
  usePageMeta('about');
  return (
    <div>
      <Hero />
      <Story />
      <Stats />
      <Timeline />
      <ServicesSection />
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
            <span className="text-amber text-xs sm:text-sm font-bold tracking-[0.2em]">ABOUT US</span>
          </motion.div>
          <motion.h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight" variants={fadeIn} custom={1} initial="hidden" animate="visible">
            Warehouse expertise <span className="text-amber">since 1987</span>
          </motion.h1>
          <motion.p className="text-concrete-100/70 mt-7 max-w-2xl text-base sm:text-lg leading-8" variants={fadeIn} custom={2} initial="hidden" animate="visible">
            Vardha Warehousing has spent nearly four decades building warehousing, storage, logistics, and warehouse development expertise — helping commercial businesses store and move inventory reliably.
          </motion.p>
        </div>
      </div>
      <div className="h-1 bg-steel-800 overflow-hidden">
        <div className="h-full w-1/4 bg-amber animate-[slideRight_3s_ease-in-out_infinite]" />
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="relative bg-concrete-50 overflow-hidden">
      <div className="absolute -left-40 top-20 w-96 h-96 rounded-full bg-amber/8 blur-3xl pointer-events-none animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="absolute right-[-180px] bottom-0 w-[450px] h-[450px] rounded-full bg-steel-900/5 blur-3xl pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-16 lg:py-24">
        <motion.div className="mb-10" variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
          <span className="section-eyebrow">OUR STORY</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink leading-tight mb-6">
            Built on warehousing, not just real estate
          </h2>
          <p className="text-sm text-steel-600 leading-relaxed mb-6">
            Vardha isn't a generic industrial landlord. We come from a background of warehousing, storage, and logistics operations — which shapes how our facility is designed, from road frontage to loading bay planning.
          </p>
          <p className="text-sm text-steel-600 leading-relaxed">
            Our property at Gorakhnath Mandir Road, Bargadwa, Gorakhpur, is purpose-built for commercial movement: wide haulage for trucks, secure yard space, and an operational office — the essentials a real warehousing business needs.
          </p>
        </motion.div>
        <motion.div className="grid sm:grid-cols-3 gap-6" variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}>
          {[
            { label: 'Commercial Storage', value: 'Flexible warehouse units' },
            { label: '24x7 Access', value: 'Round-the-clock operations' },
            { label: 'Operational Support', value: 'On-site office & yard' },
          ].map((item) => (
            <div key={item.label} className="bg-white border border-concrete-200 p-5 card-hover">
              <span className="text-[10px] font-bold tracking-[0.18em] text-amber-700 uppercase">{item.label}</span>
              <p className="text-sm font-semibold text-ink mt-2">{item.value}</p>
            </div>
          ))}
        </motion.div>
        <motion.div className="mt-10 relative" variants={slideInRight} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
          <div className="relative h-72 sm:h-96 lg:h-[28rem] overflow-hidden border border-concrete-200 bg-steel-100 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop&q=80"
              alt="Vardha warehouse facility"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-steel-950/20 hover:bg-steel-950/5 transition-colors duration-500" />
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-steel-950/60 to-transparent" />
            <div className="absolute bottom-4 left-4 bg-steel-950/90 backdrop-blur-sm text-white px-4 py-3">
              <p className="text-[10px] uppercase tracking-[0.18em] text-amber font-bold">Warehousing expertise</p>
              <p className="text-xs text-white/70 mt-1">Gorakhpur, Uttar Pradesh</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Stats() {
  const [sinceRef, sinceCount] = useCountUp(1987, 2000);
  const [accessRef, accessCount] = useCountUp(24, 2000);
  const [roadRef, roadCount] = useCountUp(118, 2000);
  const [capacityRef, capacityCount] = useCountUp(42000, 2500);

  const stats = [
    { ref: sinceRef, count: sinceCount, suffix: '', label: 'Est.' },
    { ref: accessRef, count: accessCount, suffix: 'x7', label: 'Truck Access' },
    { ref: roadRef, count: roadCount, suffix: ' ft', label: 'Road Frontage' },
    { ref: capacityRef, count: capacityCount, suffix: '+ sq.ft.', label: 'Total Capacity' },
  ];

  return (
    <section className="relative bg-concrete-100 py-16 lg:py-24 overflow-hidden">
      <div className="absolute -right-40 -top-40 w-[500px] h-[500px] rounded-full bg-amber/10 blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="absolute -left-48 bottom-[-240px] w-[500px] h-[500px] rounded-full bg-steel-900/5 blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-steel-800">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              ref={stat.ref}
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
                {stat.count.toLocaleString('en-IN')}{stat.suffix}
              </span>
              <span className="block text-[10px] tracking-[0.15em] text-concrete-100/50 mt-1 uppercase">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section className="relative bg-concrete-50 py-16 lg:py-24 overflow-hidden">
      <div className="absolute -left-40 top-24 w-96 h-96 rounded-full bg-amber/8 blur-3xl pointer-events-none animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="absolute right-[-180px] bottom-0 w-[450px] h-[450px] rounded-full bg-steel-900/5 blur-3xl pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div className="text-center mb-12" variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <span className="section-eyebrow">OUR JOURNEY</span>
          <h2 className="font-display text-3xl sm:text-4xl text-ink">Nearly four decades in warehousing</h2>
        </motion.div>
        <div className="max-w-3xl mx-auto space-y-0">
          {timeline.map((item, i) => (
            <motion.div
              key={item.year}
              className="relative flex gap-6 sm:gap-8 pb-12 last:pb-0"
              variants={i % 2 === 0 ? slideInLeft : slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-steel-950 flex items-center justify-center shrink-0">
                  <span className="text-amber font-display text-sm sm:text-base font-bold text-center leading-tight">{item.year}</span>
                </div>
                {i < timeline.length - 1 && <div className="w-px h-full bg-concrete-200 mt-2" />}
              </div>
              <div className="pt-2">
                <h3 className="font-display text-xl sm:text-2xl text-ink mb-2">{item.title}</h3>
                <p className="text-sm text-steel-600 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="relative bg-concrete-100 py-16 lg:py-24 overflow-hidden">
      <div className="absolute -left-40 top-24 w-96 h-96 rounded-full bg-amber/8 blur-3xl pointer-events-none animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="absolute right-[-180px] bottom-0 w-[450px] h-[450px] rounded-full bg-steel-900/5 blur-3xl pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div className="mb-10" variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
          <span className="section-eyebrow">WHAT WE DO</span>
          <h2 className="font-display text-3xl sm:text-4xl text-ink">Warehousing, storage, logistics & development</h2>
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
                <service.icon className="w-5 h-5 text-amber transition-all duration-300 group-hover:text-steel-950" />
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

function CTASection() {
  return (
    <section className="relative bg-concrete-100 py-16 lg:py-24 overflow-hidden">
      <div className="absolute -left-40 top-24 w-96 h-96 rounded-full bg-amber/8 blur-3xl pointer-events-none animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="absolute right-[-180px] bottom-0 w-[450px] h-[450px] rounded-full bg-steel-900/5 blur-3xl pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 text-center">
        <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <span className="section-eyebrow">GET STARTED</span>
          <h2 className="font-display text-3xl sm:text-4xl text-ink mb-4">Ready to store with Vardha?</h2>
          <p className="text-sm text-steel-600 max-w-xl mx-auto mb-8 leading-relaxed">
            Calculate your space requirement or get in touch with our team to discuss your warehouse needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/book-space" className="btn-accent inline-flex items-center gap-3">
              <span>Calculate Space</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="btn-primary inline-flex items-center gap-3">
              <span>Contact Us</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
