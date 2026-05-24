import { 
  Share2, 
  Heart, 
  MessageCircle,
  Zap,
  MapPin, 
  Sparkles,
  Phone, 
  Mail,  
} from 'lucide-react';

const EXPLORE_LINKS = [
  'Ubud & Sekitarnya', 'Pantai Selatan', 'Nusa Penida & Lembongan', 'Bali Utara', 'Desa Adat Penglipuran'
];

const EXPERIENCE_LINKS = [
  'Wisata Budaya & Pura', 'Petualangan Alam', 'Kuliner Lokal', 'Retret & Yoga', 'Festival & Acara'
];

const SOCIAL_LINKS = [
  { icon: Share2, href: '#' },
  { icon: Heart, href: '#' },
  { icon: MessageCircle, href: '#' },
  { icon: Zap, href: '#' },
];

export default function Footer() {
  return (
    <footer className="relative bg-gray-950 text-gray-300 pt-20 pb-10 overflow-hidden font-sans border-t-4 border-red-600">
      
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] bg-red-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Section: Newsletter CTA */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-16 border-b border-gray-800">
          <div className="max-w-md">
            <h3 className="text-2xl font-bold text-white mb-2">Dapatkan Inspirasi Liburan</h3>
            <p className="text-gray-400">Berlangganan buletin kami untuk cerita perjalanan eksklusif, panduan budaya, dan permata tersembunyi Bali.</p>
          </div>
          <div className="w-full md:w-auto flex-1 max-w-md flex gap-2">
           
           
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          
          {/* Brand & About */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="bg-red-500 p-1.5 rounded-lg">
                <Sparkles className="text-white w-4 h-4" />
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight text-white">
                Bali<span className="text-red-500">Genie</span>
              </h2>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Kami membawa keajaiban Pulau Bali langsung ke hati Anda. Temukan harmoni antara alam, budaya, dan spiritualitas yang tak terlupakan.
            </p>
            <div className="flex items-center gap-4 mt-2">
              {SOCIAL_LINKS.map(({ icon: Icon, href }, idx) => (
                <a key={idx} href={href} className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Destinasi */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Jelajahi</h4>
            <ul className="flex flex-col gap-4">
              {EXPLORE_LINKS.map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-red-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Pengalaman */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Pengalaman</h4>
            <ul className="flex flex-col gap-4">
              {EXPERIENCE_LINKS.map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-red-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Hubungi Kami</h4>
            <ul className="flex flex-col gap-5">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span>Jl. Raya Puputan No. 123, Denpasar, Bali, Indonesia 80232</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-red-500 shrink-0" />
                <span>+62 361 123456</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-red-500 shrink-0" />
                <span>halo@pesonadewata.id</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-800 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} BaliGenie. Hak cipta dilindungi undang-undang.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-white transition-colors">Peta Situs</a>
          </div>
        </div>

      </div>
    </footer>
  );
}