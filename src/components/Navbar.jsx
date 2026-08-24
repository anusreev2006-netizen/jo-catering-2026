import React from 'react'
import { NavLink } from 'react-router-dom'


function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <NavLink className="navbar-brand fw-bold" to="/">JO Catering-Service</NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto gap-2">
            <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/menu">Menu</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/packages">Packages</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/gallery">Gallery</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/about">About</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contact">Contact</NavLink></li>
            <li className="nav-item">
              <NavLink className="btn btn-primary btn-sm ms-2 mt-2" to="/booking">Book Now</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
