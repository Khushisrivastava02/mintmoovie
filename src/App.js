import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Watchlist from "./Pages/Watchlist/Watchlist";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Router basename="/mintmoovie"> {/* ✅ Add this line */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
