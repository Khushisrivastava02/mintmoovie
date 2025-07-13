import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // ⬅️ added Navigate
import Home from "./Pages/Home/Home";
import Watchlist from "./Pages/Watchlist/Watchlist";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Router basename="/mintmoovie">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="*" element={<Navigate to="/" />} /> {/* ✅ Redirect unknown paths to Home */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
