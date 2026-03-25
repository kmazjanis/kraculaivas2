import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Waves, Menu, X, Phone, Mail, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Sākums', path: '/' },
    { name: 'Maršruti', path: '/routes' },
    { name: 'Par mums', path: '/about' },
    { name: 'Kontakti', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 glass shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-primary p-2 rounded-lg group-hover:rotate-12 transition-transform">
                <Waves className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-display font-bold text-primary">Krāču laivas</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "font-medium transition-colors hover:text-accent",
                    location.pathname === link.path ? "text-accent" : "text-gray-600"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/routes" className="btn-primary">
                Rezervēt
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-gray-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t"
            >
              <div className="px-4 py-6 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-lg font-medium text-gray-600"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link 
                  to="/routes" 
                  onClick={() => setIsMenuOpen(false)}
                  className="block btn-primary text-center"
                >
                  Rezervēt
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Waves className="text-accent w-6 h-6" />
                <span className="text-2xl font-display font-bold">Krāču laivas</span>
              </div>
              <p className="text-gray-300">
                Premium laivu noma Latvijā. Mēs padarām upes braucienus vienkāršus un neaizmirstamus.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-6">Saites</h3>
              <ul className="space-y-3 text-gray-300">
                <li><Link to="/" className="hover:text-accent">Sākums</Link></li>
                <li><Link to="/routes" className="hover:text-accent">Maršruti</Link></li>
                <li><Link to="/about" className="hover:text-accent">Par mums</Link></li>
                <li><Link to="/contact" className="hover:text-accent">Kontakti</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6">Kontakti</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-2">
                  <Phone size={18} className="text-accent" />
                  <a href="tel:+37120000000" className="hover:text-accent">+371 20 000 000</a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={18} className="text-accent" />
                  <a href="mailto:info@kraculaivas.lv" className="hover:text-accent">info@kraculaivas.lv</a>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin size={18} className="text-accent" />
                  <span>Sigulda, Latvija</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6">Follow Us</h3>
              <div className="flex gap-4">
                <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-accent transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                </a>
                <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-accent transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Krāču laivas. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
