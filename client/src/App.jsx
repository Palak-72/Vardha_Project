import { Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useEffect } from 'react';
import ScrollToTop from './components/ScrollToTop';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/Home';
import About from './pages/About';
import Facility from './pages/Facility';
import BookSpace from './pages/BookSpace';
import Solutions from './pages/Solutions';
import UseCases from './pages/UseCases';
import Clients from './pages/Clients';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminContacts from './pages/admin/AdminContacts';
import AdminEnquiries from './pages/admin/AdminEnquiries';
import AdminProfile from './pages/admin/AdminProfile';
import AdminSettings from './pages/admin/AdminSettings';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <HelmetProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="facility" element={<Facility />} />
          <Route path="book-space" element={<BookSpace />} />
          <Route path="solutions" element={<Solutions />} />
          <Route path="use-cases" element={<UseCases />} />
          <Route path="clients" element={<Clients />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="enquiries" element={<AdminEnquiries />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </HelmetProvider>
  );
}

export default App;
