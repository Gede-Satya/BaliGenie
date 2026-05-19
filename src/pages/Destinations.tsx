import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { Search, MapPin, Star, Filter, Heart, ChevronRight, Compass } from "lucide-react";

// Mock Data untuk Destinasi (Menggunakan gambar yang digenerate)
const DESTINATIONS = [
  {
    id: 1,
    name: "Pura Ulun Danu Bratan",
    location: "Bedugul, Tabanan",
    category: "Pura & Sejarah",
    rating: 4.8,
    reviews: "12k+",
    price: "Rp 75.000",
    image: "/images/destinations/pura_ulun_danu_bratan.png",
    description: "Pura air suci Hindu Bali yang indah terletak di tepi Danau Bratan di pegunungan dekat Bedugul.",
    featured: true,
  },
  {
    id: 2,
    name: "Tegalalang Rice Terrace",
    location: "Ubud, Gianyar",
    category: "Alam",
    rating: 4.7,
    reviews: "8k+",
    price: "Rp 50.000",
    image: "/images/destinations/tegalalang_rice_terrace.png",
    description: "Terasering sawah berundak yang indah, menawarkan pemandangan lanskap hijau yang menyejukkan hati.",
    featured: true,
  },
  {
    id: 3,
    name: "Kelingking Beach",
    location: "Nusa Penida",
    category: "Pantai",
    rating: 4.9,
    reviews: "15k+",
    price: "Gratis",
    image: "/images/destinations/kelingking_beach.png",
    description: "Tebing ikonik berbentuk T-Rex dengan pemandangan pantai berpasir putih dan laut biru kehijauan yang jernih.",
    featured: true,
  },
  {
    id: 4,
    name: "Uluwatu Temple",
    location: "Uluwatu, Badung",
    category: "Pura & Sejarah",
    rating: 4.8,
    reviews: "20k+",
    price: "Rp 50.000",
    image: "/images/destinations/uluwatu_temple.png",
    description: "Pura megah yang bertengger di atas tebing curam menghadap Samudra Hindia, terkenal dengan pemandangan sunset dan Tari Kecak.",
    featured: false,
  },
  {
    id: 5,
    name: "Desa Penglipuran",
    location: "Bangli",
    category: "Budaya",
    rating: 4.9,
    reviews: "10k+",
    price: "Rp 25.000",
    image: "/images/destinations/desa_penglipuran.png",
    description: "Desa tradisional Bali yang dinobatkan sebagai salah satu desa terbersih di dunia. Rasakan suasana otentik dan arsitektur kuno Bali.",
    featured: true,
  },
  {
    id: 6,
    name: "Bebek Betutu Khas Bali",
    location: "Ubud, Gianyar",
    category: "Kuliner",
    rating: 4.8,
    reviews: "15k+",
    price: "Rp 120.000",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop",
    description: "Sajian ikonik bebek panggang lambat dengan bumbu rempah khas Bali (base genep) yang meresap sempurna. Kuliner wajib dicoba!",
    featured: true,
  }
];

const CATEGORIES = ["Semua", "Pantai", "Alam", "Pura & Sejarah", "Budaya", "Kuliner"];

export default function Destinations() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Filter destinasi berdasarkan kategori & pencarian
  const filteredDestinations = DESTINATIONS.filter(dest => {
    const matchesCategory = activeCategory === "Semua" || dest.category === activeCategory;
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          dest.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans selection:bg-red-200">
      <Navbar />
      
      {/* HEADER / HERO SECTION */}
      <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-red-100/60 rounded-full blur-[100px] opacity-70" />
          <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-orange-50/50 rounded-full blur-[120px] opacity-80" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 text-red-600 text-sm font-bold mb-6">
              <Compass className="w-4 h-4" />
              <span>EKSPLORASI BALI</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
              Temukan Keajaiban <br className="hidden md:block"/> 
              <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                Pulau Dewata
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-10">
              Jelajahi surga tersembunyi, pantai memukau, dan warisan budaya yang tak lekang oleh waktu di setiap sudut Bali.
            </p>

            {/* SEARCH BAR */}
            <div className="relative max-w-2xl mx-auto flex items-center bg-white p-2 rounded-2xl shadow-xl shadow-red-900/5 border border-gray-100">
              <div className="flex items-center flex-1 px-4 border-r border-gray-100">
                <Search className="w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Cari destinasi, lokasi..." 
                  className="w-full py-3 px-4 outline-none text-gray-700 bg-transparent placeholder-gray-400 font-medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-xl transition-colors flex items-center gap-2 font-bold ml-2">
                <span className="hidden sm:inline">Cari</span>
                <ChevronRight className="w-5 h-5 sm:hidden" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        {/* CATEGORY FILTER */}
        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide w-full sm:w-auto">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeCategory === category 
                    ? "bg-slate-900 text-white shadow-md" 
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 font-medium transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        {/* DESTINATIONS GRID */}
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map(dest => (
              <div 
                key={dest.id}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1"
                onMouseEnter={() => setHoveredId(dest.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Image Section */}
                <div className="relative h-64 w-full overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-bold text-gray-900 rounded-full shadow-sm">
                      {dest.category}
                    </span>
                  </div>
                  <button className="absolute top-4 right-4 z-10 p-2.5 bg-white/90 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 hover:bg-white shadow-sm transition-all duration-300">
                    <Heart className="w-4 h-4" />
                  </button>
                  <img 
                    src={dest.image} 
                    alt={dest.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <div className="flex items-center gap-1.5 text-sm font-medium text-red-500 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{dest.location}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    {dest.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-4">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-bold text-gray-900">{dest.rating}</span>
                    <span className="text-gray-400 text-sm">({dest.reviews} ulasan)</span>
                  </div>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-6">
                    {dest.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-400 font-medium mb-0.5">Mulai dari</p>
                      <p className="font-bold text-gray-900">{dest.price}</p>
                    </div>
                    <button className="flex items-center justify-center w-10 h-10 bg-red-50 text-red-600 rounded-full group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Destinasi tidak ditemukan</h3>
            <p className="text-gray-500">Coba ubah kata kunci pencarian atau kategori Anda.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
