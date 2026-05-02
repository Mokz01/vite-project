import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ArchivePage from "./pages/ArchivePage";
import DevelopersPage from "./pages/DevelopersPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-offwhite font-body">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/dev" element={<DevelopersPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
