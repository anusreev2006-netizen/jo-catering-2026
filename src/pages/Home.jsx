import React from 'react'
import { NavLink } from 'react-router-dom'

function Home() {
  return (
      <div>
      {/* Hero Section */}
      <section className="bg-dark text-light text-center py-5">
        <div className="container py-5">
          <h1 className="display-4 fw-bold mb-3">Delicious Food for Every Occasion</h1>
          <p className="lead mb-4">
            From weddings to corporate events, JoCaterings brings expertly crafted menus
            straight to your celebration.
          </p>
          <NavLink to="/menu" className="btn btn-primary btn-lg me-3">View Menu</NavLink>
          <NavLink to="/booking" className="btn btn-outline-light btn-lg">Book Now</NavLink>
        </div>
      </section>

           {/* Why Choose Us */}
      <section className="container py-5">
        <h2 className="text-center mb-5">Why Choose Us</h2>
        <div className="row g-4">
          <div className="col-md-4 text-center">
            <h5 className="fw-bold">Fresh Ingredients</h5>
            <p className="text-muted">We source quality, fresh ingredients for every dish we serve.</p>
          </div>
          <div className="col-md-4 text-center">
            <h5 className="fw-bold">Experienced Chefs</h5>
            <p className="text-muted">Our culinary team brings years of expertise to every event.</p>
          </div>
          <div className="col-md-4 text-center">
            <h5 className="fw-bold">Custom Packages</h5>
            <p className="text-muted">Flexible packages tailored to your event size and budget.</p>
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-5">Popular Packages</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title fw-bold">Wedding Package</h5>
                  <p className="card-text text-muted">Elegant multi-course menus for your big day.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title fw-bold">Corporate Package</h5>
                  <p className="card-text text-muted">Professional catering for meetings and conferences.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title fw-bold">Party Package</h5>
                  <p className="card-text text-muted">Fun, flavorful spreads for birthdays and get-togethers.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <NavLink to="/packages" className="btn btn-primary">See All Packages</NavLink>
          </div>
        </div>
      </section>

       {/* button for booking */}
      <section className="bg-dark text-light text-center py-5">
        <div className="container">
          <h3 className="mb-3">Ready to plan your event?</h3>
          <NavLink to="/booking" className="btn btn-primary btn-lg">Request a Quote</NavLink>
        </div>
      </section>
    </div>
  )
}

export default Home