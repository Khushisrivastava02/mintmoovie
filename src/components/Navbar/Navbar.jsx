import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaTimes, FaBars } from "react-icons/fa";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const hideNavbar = () => {
    navRef.current.classList.remove("responsive_nav");
  };

  useEffect(() => {
    hideNavbar(); // Close nav on route change
  }, [location]);

  return (
    <header>
      <span className="app-logo">
        <Link className="app-logo-link" to="/">
          <LiveTvIcon fontSize="large" />
          <span>MintMoovie</span>
        </Link>
      </span>

      <nav ref={navRef}>
        <div className="navLink">
          <Link to="/">Home</Link>
          <Link to="/watchlist">Watchlist</Link> {/* ✅ changed here */}
        </div>
        <button className="nav-btn nav-close-btn" onClick={hideNavbar}>
          <FaTimes />
        </button>
      </nav>

      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
};

export default Navbar;
