import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-steel-950 flex items-center justify-center px-5">
      <div className="text-center max-w-md">
        <h1 className="font-display text-8xl sm:text-9xl text-amber mb-4">404</h1>
        <h2 className="font-display text-2xl sm:text-3xl text-white mb-4">Page Not Found</h2>
        <p className="text-sm text-concrete-100/60 mb-8 leading-relaxed">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="btn-accent inline-flex items-center gap-3">
          <Home size={18} />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}
