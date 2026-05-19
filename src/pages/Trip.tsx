import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { Calendar, Map, Wallet, Sparkles, Navigation, Clock, CheckCircle2 } from "lucide-react";

export default function Trip() {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setStep(2);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans selection:bg-red-200">
      <Navbar />

      <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden min-h-screen flex flex-col">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-red-100/60 rounded-full blur-[100px] opacity-70" />
          <div className="absolute bottom-[0%] right-[-10%] w-[600px] h-[600px] bg-orange-50/50 rounded-full blur-[120px] opacity-80" />
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 w-full flex-grow flex flex-col justify-center">
          
          {step === 1 ? (
            <div className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl border border-white">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 mb-6 shadow-lg shadow-red-200">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                  Rancang Trip Impianmu
                </h1>
                <p className="text-gray-500 text-lg">
                  Beritahu BaliGenie preferensi liburanmu, dan biarkan AI menyusun itinerary yang sempurna.
                </p>
              </div>

              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Lama Liburan */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                      <Clock className="w-4 h-4 text-red-500" />
                      Lama Liburan (Hari)
                    </label>
                    <input 
                      type="number" 
                      min="1" 
                      max="30"
                      placeholder="Contoh: 3"
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all font-medium"
                    />
                  </div>

                  {/* Gaya Liburan */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                      <Map className="w-4 h-4 text-red-500" />
                      Gaya Liburan
                    </label>
                    <select className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all font-medium appearance-none">
                      <option value="">Pilih Gaya...</option>
                      <option value="santai">Santai & Healing</option>
                      <option value="petualangan">Petualangan Alam</option>
                      <option value="budaya">Eksplorasi Budaya</option>
                      <option value="keluarga">Ramah Keluarga</option>
                      <option value="romantis">Romantis / Honeymoon</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Budget */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                      <Wallet className="w-4 h-4 text-red-500" />
                      Estimasi Budget
                    </label>
                    <select className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all font-medium appearance-none">
                      <option value="">Pilih Budget...</option>
                      <option value="hemat">Backpacker (Hemat)</option>
                      <option value="menengah">Reguler (Menengah)</option>
                      <option value="mewah">Eksklusif (Mewah)</option>
                    </select>
                  </div>

                  {/* Bulan Keberangkatan */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                      <Calendar className="w-4 h-4 text-red-500" />
                      Bulan Keberangkatan
                    </label>
                    <input 
                      type="month" 
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all font-medium"
                    />
                  </div>
                </div>

                <button 
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full mt-6 bg-slate-900 hover:bg-slate-800 text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-slate-200 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Meracik Itinerary...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-6 h-6 text-red-400" />
                      Buat Itinerary Sekarang
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* HASIL ITINERARY */
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
              <div className="bg-slate-900 p-8 text-center relative overflow-hidden">
                <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-red-500/20 rounded-full blur-[60px]"></div>
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-white mb-2">Itinerary Kamu Sudah Siap!</h2>
                <p className="text-slate-300">BaliGenie merekomendasikan perjalanan 3 hari yang tak terlupakan.</p>
              </div>
              
              <div className="p-8 md:p-12">
                <div className="space-y-10">
                  {/* Hari 1 */}
                  <div className="relative pl-8 md:pl-0">
                    <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-gray-200 ml-6"></div>
                    <div className="relative">
                      <div className="md:absolute left-0 top-1 w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold text-lg mb-4 md:mb-0 z-10 shadow-sm border-4 border-white">
                        H1
                      </div>
                      <div className="md:ml-20">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Budaya & Sunset di Selatan</h3>
                        <div className="space-y-4">
                          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex gap-4">
                            <div className="text-sm font-bold text-gray-400 min-w-[60px]">09:00</div>
                            <div>
                              <p className="font-bold text-gray-900">GWK Cultural Park</p>
                              <p className="text-sm text-gray-500">Melihat patung monumental dan pementasan tari lokal.</p>
                            </div>
                          </div>
                          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex gap-4">
                            <div className="text-sm font-bold text-gray-400 min-w-[60px]">16:00</div>
                            <div>
                              <p className="font-bold text-gray-900">Uluwatu Temple</p>
                              <p className="text-sm text-gray-500">Menonton Tari Kecak dengan latar belakang sunset memukau.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Placeholder for Day 2 and Day 3 */}
                  <div className="text-center pt-8 border-t border-gray-100">
                    <p className="text-gray-500 italic">Ini adalah pratinjau. Integrasikan dengan API AI sungguhan untuk itinerary lengkap.</p>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button 
                      onClick={() => setStep(1)}
                      className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-colors"
                    >
                      Buat Ulang
                    </button>
                    <button className="flex-1 px-6 py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition-colors shadow-lg shadow-red-200 flex items-center justify-center gap-2">
                      <Navigation className="w-5 h-5" />
                      Simpan Itinerary
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
