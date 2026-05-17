import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ArchivePage from "./pages/ArchivePage";
import DevelopersPage from "./pages/DevelopersPage";
import SourceVerifierPage from "./pages/SourceVerifierPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-offwhite font-body">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/dev" element={<DevelopersPage />} />
          <Route path="/verify" element={<SourceVerifierPage />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}
