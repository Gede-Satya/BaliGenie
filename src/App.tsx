import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import ChatBot from "./components/ChatBot";
import ChatWidget from "./components/ChatWidget";
import Destinations from "./pages/Destinations";
import Trip from "./pages/Trip";
import Eksplor from "./pages/Eksplor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatBot />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/trip" element={<Trip />} />
        <Route path="/eksplor" element={<Eksplor />} />
      </Routes>
      <ChatWidget />
    </BrowserRouter>
  )
}



export default App