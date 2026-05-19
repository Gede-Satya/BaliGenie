import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { Compass, Camera, Coffee, PartyPopper, ChevronRight, Map } from "lucide-react";
import { Link } from "react-router-dom";

const EXPLORE_CATEGORIES = [
  {
    id: "alam",
    title: "Surga Alam Tersembunyi",
    desc: "Jelajahi air terjun, pantai rahasia, dan pegunungan.",
    icon: Compass,
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?q=80&w=1000&auto=format&fit=crop",
    colSpan: "col-span-1 md:col-span-2",
    rowSpan: "row-span-2"
  },
  {
    id: "budaya",
    title: "Ritual & Tradisi",
    desc: "Saksikan langsung magisnya budaya Bali.",
    icon: Camera,
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=1000&auto=format&fit=crop",
    colSpan: "col-span-1",
    rowSpan: "row-span-1"
  },
  {
    id: "kuliner",
    title: "Kuliner Lokal",
    desc: "Cita rasa rempah khas Pulau Dewata.",
    icon: Coffee,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000&auto=format&fit=crop",
    colSpan: "col-span-1",
    rowSpan: "row-span-1"
  },
  {
    id: "hiburan",
    title: "Kehidupan Malam",
    desc: "Beach club eksklusif dan pesta meriah.",
    icon: PartyPopper,
    image: "https://images.unsplash.com/photo-1543922596-b3bbaba80649?q=80&w=1000&auto=format&fit=crop",
    colSpan: "col-span-1 md:col-span-3",
    rowSpan: "row-span-1"
  }
];

export default function Eksplor() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans">
      <Navbar />

      {/* HEADER */}
      <div className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-red-100/50 rounded-full blur-[100px]" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 text-red-600 text-sm font-bold mb-6">
            <Map className="w-4 h-4" />
            <span>PANDUAN LOKAL BALI</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            Eksplor <span className="text-red-600">Lebih Dalam</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Temukan sisi lain dari Bali yang tidak ada di buku panduan biasa.
            Artikel, panduan, dan rahasia lokal khusus untuk Anda.
          </p>
        </div>
      </div>

      {/* MASONRY GRID */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          {EXPLORE_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isHovered = hoveredId === cat.id;

            return (
              <Link
                to="/destinations"
                key={cat.id}
                onMouseEnter={() => setHoveredId(cat.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`group relative rounded-3xl overflow-hidden block shadow-lg ${cat.colSpan} ${cat.rowSpan}`}
              >
                {/* Background Image */}
                <img 
                  src={cat.image} 
                  alt={cat.title} 
                  className={`w-full h-full object-cover transition-transform duration-1000 ${isHovered ? 'scale-110' : 'scale-100'}`}
                />
                
                {/* Dark Gradient Overlay */}
                <div className={`absolute inset-0 transition-opacity duration-500 ${isHovered ? 'bg-black/40' : 'bg-black/20 bg-gradient-to-t from-black/80 via-black/30 to-transparent'}`} />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className={`w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-4 transition-transform duration-500 ${isHovered ? '-translate-y-2' : ''}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className={`text-2xl font-bold text-white mb-2 transition-transform duration-500 delay-75 ${isHovered ? '-translate-y-2' : ''}`}>
                    {cat.title}
                  </h3>
                  <p className={`text-white/80 font-medium transition-all duration-500 delay-100 ${isHovered ? 'opacity-100 -translate-y-2' : 'opacity-0 translate-y-4 max-h-0'}`}>
                    {cat.desc}
                  </p>
                </div>

                {/* Arrow indicator */}
                <div className={`absolute top-8 right-8 w-10 h-10 bg-white text-gray-900 rounded-full flex items-center justify-center transition-all duration-500 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
