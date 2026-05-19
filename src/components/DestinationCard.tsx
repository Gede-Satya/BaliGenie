import { Flower2, Waves, Palmtree } from "lucide-react"

const DESTINATIONS = [
  {
    title: "Ubud",
    subtitle: "Harmoni Alam & Seni Budaya",
    image:"images/ubud.jpg",
    icon: Flower2,
  },
  {
    title: "Nusa Penida",
    subtitle: "Tebing Megah & Laut Biru",
    image:
      "images/nusaPenida.jpg",
    icon: Waves,
  },
  {
    title: "Uluwatu",
    subtitle: "Tarian Kecak di Kala Senja",
    image:
      "images/uluwatu.jpg",
    icon: Palmtree,
  },
]

export default function DestinationCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {DESTINATIONS.map((destination, index) => {
        const Icon = destination.icon

        return (
          <div
            key={index}
            className="group relative h-[450px] rounded-[2rem] overflow-hidden cursor-pointer shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 will-change-transform"
          >
            {/* Background Image */}
            <img
              src={destination.image}
              alt={destination.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 pointer-events-none"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-8 text-left">
              <div className="bg-white/20 backdrop-blur-md w-fit p-3 rounded-full text-white mb-4 border border-white/30">
                <Icon className="w-5 h-5" />
              </div>

              <h3 className="text-3xl font-bold text-white mb-2">
                {destination.title}
              </h3>

              <p className="text-gray-200">
                {destination.subtitle}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}