# BaliGenie

Asisten AI perjalanan Bali yang membantu kamu menemukan destinasi wisata, kuliner lokal, merencanakan itinerary, dan menjelajahi pesona Pulau Dewata — semuanya dalam satu aplikasi web.

## Demo

https://gede-satya.github.io/BaliGenie/

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS 3
- **Animasi:** Framer Motion
- **Icons:** Lucide React
- **Routing:** React Router DOM (HashRouter)
- **AI:** Google Gemini 3.5 Flash
- **HTTP Client:** Axios
- **Deploy:** GitHub Pages / Docker (Google Cloud Run)

## Fitur Utama

- **Destinasi Wisata** — Jelajahi destinasi populer Bali seperti Ubud, Nusa Penida, Uluwatu, dan lainnya
- **Eksplor** — Temukan kategori wisata: alam, budaya, kuliner, kehidupan malam
- **Trip Planner** — Rencanakan perjalanan dengan AI berdasarkan durasi, budget, dan minat
- **AI Chatbot** — Tanya apa saja tentang Bali ke asisten AI (destinasi, kuliner, tips, itinerary)
- **Responsive Design** — Tampilan optimal di desktop dan mobile
- **Animasi Halus** — Transisi dan hover effects dengan Framer Motion

## Struktur Folder

```
src/
  ├─ components/          # Komponen UI reusable
  │   ├─ Navbar.tsx
  │   ├─ footer.tsx
  │   ├─ DestinationCard.tsx
  │   ├─ ChatBot.tsx
  │   └─ ChatWidget.tsx
  ├─ pages/               # Halaman aplikasi
  │   ├─ Home.tsx
  │   ├─ Destinations.tsx
  │   ├─ Eksplor.tsx
  │   └─ Trip.tsx
  ├─ services/            # Layanan eksternal
  │   └─ gemini.ts        # Google Gemini AI integration
  ├─ assets/              # Aset statis
  ├─ App.tsx              # Router & layout utama
  └─ main.tsx             # Entry point
public/
  └─ images/              # Gambar destinasi
```

## Instalasi & Setup

### Prasyarat
- Node.js >= 20
- npm

### Langkah

```bash
# clone repo
git clone https://github.com/Gede-Satya/BaliGenie.git
cd BaliGenie

# install dependency
npm install

# jalankan development server
npm run dev
```

## Environment Variables

Buat file `.env` di root project:

| Key | Deskripsi |
|-----|-----------|
| `VITE_GEMINI_API_KEY` | API key Google Gemini untuk chatbot AI |

> **Penting:** Jangan commit `.env` ke repository. File ini sudah ada di `.gitignore`.

## Scripts

| Command | Deskripsi |
|---------|-----------|
| `npm run dev` | Jalankan development server |
| `npm run build` | Build untuk production (TypeScript check + Vite build) |
| `npm run preview` | Preview hasil build production |
| `npm run lint` | Jalankan ESLint |

## Deploy

### GitHub Pages (Otomatis)
Push ke branch `main` akan otomatis trigger GitHub Actions untuk build dan deploy.

### Docker / Google Cloud Run

```bash
# build image
docker build -t baligenie .

# run container
docker run -p 8080:8080 baligenie
```

## Kontribusi

1. Fork repo
2. Buat branch baru: `git checkout -b feature/nama-fitur`
3. Commit perubahan: `git commit -m "feat: deskripsi singkat"`
4. Push dan buat Pull Request

## Lisensi

MIT
