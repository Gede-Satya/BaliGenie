import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import DestinationCard from "../components/DestinationCard";
import { Compass, ArrowRight, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";

const STATS = [
  { label: "Desa Wisata", value: "100+" },
  { label: "Warisan Budaya", value: "1,000+" },
  { label: "Pantai Tropis", value: "150+", desktopOnly: true },
];

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#FDFDFD] overflow-hidden font-sans">
      <Navbar />

      {/* Decorative Background - Sunset Vibe */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10"
        aria-hidden="true"
      >
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-red-100/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-orange-100/40 rounded-full blur-[100px]" />
      </div>

      <main className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pb-32 px-6 max-w-7xl mx-auto">
        {/* HERO SECTION */}
        <div className="flex flex-col items-center justify-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-red-50 border border-red-100 text-red-600 text-sm font-bold mb-8 hover:bg-red-100 transition-colors">
            <Compass className="w-4 h-4 text-red-500" />
            <span className="tracking-wide">PESONA PULAU DEWATA</span>
          </div>

          {/* Hero Title */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-[1.1] tracking-tight max-w-4xl">
            Where Magic <br />
            <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
              Meets Reality.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
            Selami kekayaan budaya yang otentik, keindahan alam yang memukau,
            dan senyum keramahtamahan yang akan selalu memanggil Anda untuk
            kembali pulang.
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center">
            <button
              type="button"
              className="group bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 flex items-center gap-3 shadow-xl shadow-red-200 w-full sm:w-auto justify-center"
            >
              Mulai Petualangan
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full text-lg font-bold text-gray-700 hover:bg-gray-100 border border-transparent hover:border-gray-200 transition-all duration-300 w-full sm:w-auto"
            >
              <PlayCircle className="w-6 h-6 text-red-600" />
              Tonton Video
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 border-y border-gray-100 py-10 w-full max-w-4xl">
            {STATS.map((stat, idx) => (
              <div
                key={idx}
                className={`text-center flex flex-col gap-2 ${stat.desktopOnly ? "hidden md:flex" : ""}`}
              >
                <p className="text-3xl md:text-4xl font-extrabold text-gray-900">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* IMAGE SHOWCASE SECTION */}
        <div className="mt-24">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
            <div className="text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                Keajaiban di <br className="hidden md:block" /> Setiap Sudutnya
              </h2>
              <p className="text-gray-500 max-w-lg">
                Dari ritual suci di pura kuno hingga hamparan terasering hijau
                yang menyejukkan jiwa. Temukan sisi Bali yang belum pernah Anda
                lihat sebelumnya.
              </p>
            </div>
            <Link to="/destinations" className="flex items-center gap-2 text-red-600 font-bold hover:text-red-700 transition-colors pb-1 border-b-2 border-transparent hover:border-red-600">
              Lihat Semua Destinasi <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Cards Grid */}
          <DestinationCard />
        </div>
      </main>
      <Footer />
    </div>
  );
}
