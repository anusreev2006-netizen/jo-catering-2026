import React from 'react'
import { NavLink } from 'react-router-dom'


function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container text-center">
        <p className="mb-1">&copy; {new Date().getFullYear()} JoCatering. All rights reserved.</p>
        <p className="mb-0 small">Contact us: hello@JoCatering.com</p>
         <NavLink to="/admin/login" className="text-light small">
          Admin Login
        </NavLink>
      </div>
    </footer>
  )
}

export default Footer
