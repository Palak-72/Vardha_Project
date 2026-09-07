import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

const footerLinks = {
  navigate: [
    { label: 'About', href: '/about' },
    { label: 'Warehouse Facility', href: '/facility' },
    { label: 'Warehouse Solutions', href: '/solutions' },
    { label: 'Use Cases', href: '/use-cases' },
    { label: 'Clients', href: '/clients' },
  ],
  support: [
    { label: 'Book Warehouse Space', href: '/book-space' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
    { label: 'WhatsApp Enquiry', href: 'https://wa.me/919670111167' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-steel-950 text-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16 lg:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div className="lg:col-span-1">
            <div className="mb-5">
              <span className="font-display text-lg font-bold tracking-wide block leading-tight">VARDHA</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-concrete-100/60 block">WAREHOUSING</span>
            </div>
            <p className="text-sm text-concrete-100/60 leading-relaxed">
              Warehouse expertise since 1987 — warehousing, storage, logistics, and warehouse development solutions in Gorakhpur, Uttar Pradesh. A dedicated commercial warehouse property with approximately 36 metres / 118 feet wide road frontage, 24×7 truck access.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-[0.18em] text-amber uppercase mb-5">NAVIGATE</h4>
            <ul className="space-y-3">
              {footerLinks.navigate.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="text-sm text-concrete-100/60 hover:text-amber transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-[0.18em] text-amber uppercase mb-5">SUPPORT</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((item) => (
                <li key={item.href}>
                  {item.href.startsWith('http') ? (
                    <a href={item.href} target="_blank" rel="noreferrer" className="text-sm text-concrete-100/60 hover:text-amber transition-colors">
                      {item.label}
                    </a>
                  ) : (
                    <Link to={item.href} className="text-sm text-concrete-100/60 hover:text-amber transition-colors">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-[0.18em] text-amber uppercase mb-5">CONTACT</h4>
            <ul className="space-y-4">
              <li className="text-sm text-concrete-100/60">
                <span className="block text-[10px] uppercase tracking-[0.15em] text-concrete-100/40 mb-1">Address</span>
                Gorakhnath Mandir Road, Bargadwa, Gorakhpur, Uttar Pradesh
              </li>
              <li className="text-sm text-concrete-100/60">
                <span className="block text-[10px] uppercase tracking-[0.15em] text-concrete-100/40 mb-1">Phone</span>
                <a href="tel:+919670111167" className="hover:text-amber transition-colors">+91 96701 11167</a>
              </li>
              <li className="text-sm text-concrete-100/60">
                <span className="block text-[10px] uppercase tracking-[0.15em] text-concrete-100/40 mb-1">Email</span>
                <a href="mailto:enquiry@vardhawarehousing.com" className="hover:text-amber transition-colors break-all">enquiry@vardhawarehousing.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-steel-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-concrete-100/40">
            © 2026 Vardha Warehousing. All rights reserved.
          </p>
        </div>
      </div>

      <a
        href="https://wa.me/919670111167?text=Hi%20Vardha%20Warehousing%2C%20I%20would%20like%20to%20discuss%20warehouse%20space."
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#1FBE5A] text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-[0_12px_30px_rgba(37,211,102,0.4)]"
        aria-label="Chat with us on WhatsApp"
      >
        <MessageCircle size={24} />
      </a>
    </footer>
  );
}
