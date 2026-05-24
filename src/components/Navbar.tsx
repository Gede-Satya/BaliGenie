import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sparkles, MapPin, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Beranda", href: "/", icon: null },
  { label: "Trip", href: "/trip", icon: Sparkles },
  { label: "Eksplor Bali", href: "/eksplor", icon: MapPin },
  { label: "Destinasi", href: "/destinations", icon: MapPin },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation(); // Untuk mendeteksi halaman aktif

  return (
    <nav className="fixed top-0 left-0 w-full z-[1000] bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* --- LOGO AREA --- */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-br from-red-400 to-red-600 p-2 rounded-xl shadow-md group-hover:shadow-red-200 transition-all">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tighter">
              Bali<span className="text-red-500">Genie</span>
            </h1>
          </Link>

          {/* --- DESKTOP NAVIGATION --- */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.href;
              
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all
                    ${isActive 
                      ? "bg-red-50 text-red-600" 
                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                    }`}
                >
                  {Icon && <Icon className={`w-4 h-4 ${isActive ? "text-red-500" : "text-slate-400"}`} />}
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* --- CALL TO ACTION BUTTON (Desktop) --- */}
          <div className="hidden md:flex items-center">
            <Link 
              to="/chat"
              className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-red-400" />Chat Guide</Link>
          </div>

          {/* --- MOBILE MENU BUTTON --- */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE MENU DROPDOWN --- */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-b border-slate-100 shadow-xl
        ${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-4 pt-2 pb-6 space-y-2">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.href;
            
            return (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)} // Tutup menu saat link diklik
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                  ${isActive 
                    ? "bg-red-50 text-red-700" 
                    : "text-slate-800 hover:bg-slate-50"
                  }`}
              >
                {Icon && <Icon className={`w-5 h-5 ${isActive ? "text-red-500" : "text-slate-400"}`} />}
                <span className="font-semibold text-base">{link.label}</span>
              </Link>
            );
          })}
          
          <div className="pt-4 border-t border-slate-100 mt-4">
            <Link 
              to="/chat"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex justify-center items-center gap-2 w-full bg-red-500 text-white px-5 py-3 rounded-full font-bold shadow-md hover:bg-red-600 active:scale-95"
            >
              <Sparkles className="w-5 h-5" />
              Chat Guide
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}