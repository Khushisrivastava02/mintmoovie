import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Watchlist from "./Pages/Watchlist/Watchlist"; // ✅ Updated import
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watchlist" element={<Watchlist />} /> {/* ✅ Updated path */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
