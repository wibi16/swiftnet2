import { BrowserRouter, Route, Routes } from "react-router";
import Landing from "./pages/Landing";
import Home from "./pages/home";
import PrivacyPolicy from "./pages/privacy-policy";
import Tokenomics from "./pages/tokenomics";

function App() {
  return (
    <div className="h-full">
      <BrowserRouter>
        <Routes>
          <Route path="/chat" element={<Landing />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/tokenomics" element={<Tokenomics />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
