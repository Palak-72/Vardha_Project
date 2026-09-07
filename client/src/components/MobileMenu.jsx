import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronRight } from 'lucide-react';
import { NAV_ITEMS, SITE } from '../data/siteData';

export default function MobileMenu({ isOpen, onClose, scrolled, pathname }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-[60] lg:hidden transition-all duration-500 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
    className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-[#0B1120] shadow-2xl transform transition-transform duration-500 ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    }`}
    style={{ backgroundColor: '#0B1120' }}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#D4A843] flex items-center justify-center">
              <span className="text-[#0B1120] font-display text-xl font-bold">V</span>
            </div>
            <div>
              <span className="font-display text-lg font-bold tracking-wide block leading-tight text-white">VARDHA</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4A843] block">Warehousing</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-white/60 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>
        <nav className="px-2">
          {NAV_ITEMS.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={onClose}
                className={`flex items-center justify-between py-4 px-4 text-base font-medium transition-colors ${
                  isActive
                    ? 'text-[#D4A843]'
                    : 'text-white/80 hover:text-[#D4A843]'
                }`}
              >
                <span>{item.label}</span>
                {isActive && <ChevronRight size={18} className="text-[#D4A843]" />}
              </Link>
            );
          })}
        </nav>
        <div className="p-5 border-t border-white/10 space-y-3">
          <a
            href={`https://wa.me/${SITE.whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-transparent border border-white/20 hover:border-white/40 text-white py-3 rounded-lg font-semibold text-sm transition-colors"
          >
            WhatsApp Us
          </a>
          <Link
            to="/book-space"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full bg-[#D4A843] hover:bg-[#B8922E] text-[#0B1120] py-3 rounded-lg font-bold text-sm transition-colors"
          >
            Book Warehouse Space →
          </Link>
        </div>
      </div>
    </div>
  );
}
