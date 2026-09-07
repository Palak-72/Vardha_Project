import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS, SITE } from '../data/siteData';
import MobileMenu from './MobileMenu';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-concrete-200 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-steel-950 flex items-center justify-center">
              <span className="text-amber font-display text-xl font-bold">V</span>
            </div>
            <div className="hidden sm:block">
              <span className={`font-display text-lg font-bold tracking-wide ${scrolled ? 'text-ink' : 'text-white'}`}>
                VARDHA
              </span>
              <span className={`block text-[10px] uppercase tracking-[0.2em] ${scrolled ? 'text-steel-500' : 'text-concrete-100/60'}`}>
                Warehousing
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-medium transition-colors duration-300 ${
                  pathname === item.href
                    ? 'text-amber'
                    : scrolled
                    ? 'text-steel-600 hover:text-amber'
                    : 'text-white/80 hover:text-amber'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

           <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/book-space"
              className="bg-amber hover:bg-amber-600 text-steel-950 px-5 py-2.5 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5"
            >
              Book Warehouse
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 transition-colors ${scrolled ? 'text-ink' : 'text-white'}`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} />
      )}
      {mobileOpen && <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} scrolled={scrolled} pathname={pathname} />}
    </header>
  );
}
