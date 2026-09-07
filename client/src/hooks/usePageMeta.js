import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const PAGE_META = {
  home: {
    title: 'Vardha Warehousing | Premium Warehouse Space in Gorakhpur Since 1987',
    description: 'Warehouse expertise since 1987. Commercial warehouse property with 36m/118ft road frontage, 24x7 truck access, CCTV surveillance and office facility in Gorakhpur, Uttar Pradesh.',
    keywords: ['warehouse', 'warehousing', 'Gorakhpur', 'warehouse space', 'storage', 'logistics', 'commercial warehouse'],
  },
  about: {
    title: 'About Us | Vardha Warehousing - Warehouse Expertise Since 1987',
    description: 'Learn about Vardha Warehousing\'s 35+ years of experience in warehousing, storage, logistics and warehouse development in Gorakhpur, Uttar Pradesh.',
    keywords: ['about Vardha Warehousing', 'warehouse company Gorakhpur', 'warehouse history', 'logistics company'],
  },
  facility: {
    title: 'Warehouse Facility | Vardha Warehousing - Commercial Warehouse in Gorakhpur',
    description: 'Explore our commercial warehouse facility on Gorakhnath Mandir Road, Bargadwa, Gorakhpur. 36m/118ft road frontage, 24x7 truck access, CCTV surveillance.',
    keywords: ['warehouse facility', 'commercial warehouse', 'Gorakhpur warehouse', 'warehouse infrastructure'],
  },
  'book-space': {
    title: 'Book Warehouse Space | Calculate Your Requirement - Vardha Warehousing',
    description: 'Calculate your warehouse space requirement. Flexible warehousing solutions for FMCG, e-commerce, steel, commercial inventory and distribution businesses.',
    keywords: ['book warehouse space', 'warehouse calculator', 'warehouse space Gorakhpur', 'warehouse booking'],
  },
  solutions: {
    title: 'Warehouse Solutions | Vardha Warehousing - Storage & Logistics',
    description: 'Comprehensive warehouse solutions including storage, inventory management, distribution support and custom setups for your business needs.',
    keywords: ['warehouse solutions', 'storage solutions', 'logistics solutions', 'warehouse services'],
  },
  'use-cases': {
    title: 'Use Cases | Vardha Warehousing - FMCG, E-commerce, Steel, Distribution',
    description: 'Flexible warehousing solutions for FMCG businesses, e-commerce and D2C, steel businesses, industrial and commercial goods, and distribution businesses.',
    keywords: ['warehouse use cases', 'FMCG warehouse', 'e-commerce warehouse', 'steel storage', 'distribution warehouse'],
  },
  clients: {
    title: 'Clients | Vardha Warehousing - Trusted Warehouse Partner',
    description: 'Vardha Warehousing provides nationwide/custom warehouse solutions for FMCG, e-commerce and D2C, steel, industrial and commercial goods, and distribution and logistics businesses.',
    keywords: ['warehouse clients', 'warehouse partners', 'Vardha clients', 'warehouse testimonials'],
  },
  faq: {
    title: 'FAQ | Vardha Warehousing - Frequently Asked Questions',
    description: 'Find answers to frequently asked questions about warehouse space, booking, access, security, and services at Vardha Warehousing, Gorakhpur.',
    keywords: ['warehouse FAQ', 'warehouse questions', 'warehouse booking FAQ', 'warehouse space questions'],
  },
  contact: {
    title: 'Contact Us | Vardha Warehousing - Get In Touch',
    description: 'Contact Vardha Warehousing for site visits, custom requirements or general questions about our Gorakhpur facility. Call +91 96701 11167 or email enquiry@vardhawarehousing.com.',
    keywords: ['contact Vardha Warehousing', 'warehouse contact', 'warehouse enquiry', 'Gorakhpur warehouse contact'],
  },
};

export default function usePageMeta(pageKey) {
  const meta = PAGE_META[pageKey] || PAGE_META.home;

  useEffect(() => {
    document.title = meta.title;
  }, [meta.title]);

  return meta;
}

export { PAGE_META };
