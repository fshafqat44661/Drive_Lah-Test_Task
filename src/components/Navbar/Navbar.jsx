import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.scss";
import CarImage from "../../assets/CarImage.png";

const MOCK_AVATAR = "https://i.pravatar.cc/150?u=a042581f4e29026704d";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }

    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [isMenuOpen]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !event.target.closest(".hamburger")
      ) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="top-bar">
      <div className="left-section">
        {/* Toggle Menu on Click */}
        <div
          className="hamburger"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <div className="logo-wrapper">
          <img src={CarImage} alt="Logo" />
          <span className="brand-name">Drive lah</span>
        </div>
      </div>

      <div className="right-section">
        <span className="nav-link">Learn more</span>
        <span className="nav-link">List your car</span>
        <span className="nav-link">Inbox</span>

        <div className="user-profile">
          <img src={MOCK_AVATAR} alt="User Profile" />
        </div>
      </div>

      {/* --- MOBILE MENU OVERLAY --- */}
      <div
        ref={menuRef}
        className={`mobile-menu ${isMenuOpen ? "open" : ""}`}
        aria-hidden={!isMenuOpen}
      >
        <a href="#" onClick={closeMenu}>
          Learn more
        </a>
        <a href="#" onClick={closeMenu}>
          List your car
        </a>
        <a href="#" onClick={closeMenu}>
          Inbox
        </a>
        <div className="user-profile-mobile" onClick={closeMenu}>
          <img src={MOCK_AVATAR} alt="User Profile" />
          <span>My Profile</span>
        </div>
      </div>
    </header>
  );
}
