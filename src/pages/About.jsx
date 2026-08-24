import React from 'react'

function About() {
  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">About Us</h1>

      <div className="row align-items-center mb-5">
        <div className="col-md-6">
          <img
            src="https://images.unsplash.com/photo-1555244162-803834f70033?w=600"
            alt="Our kitchen"
            className="img-fluid rounded shadow-sm"
          />
        </div>
        <div className="col-md-6">
          <h3 className="fw-bold mb-3">Our Story</h3>
          <p className="text-muted">
            JoCaterings started with a simple idea — great food shouldn't be complicated to order.
            What began as a small family kitchen catering local weddings has grown into a full-service
            catering company trusted for weddings, corporate events, and celebrations of every size.
          </p>
          <p className="text-muted">
            Every dish we serve is prepared fresh, using recipes refined over years of experience,
            by a team that genuinely loves what they do.
          </p>
        </div>
      </div>

      <div className="row text-center g-4 mb-5">
        <div className="col-md-4">
          <h2 className="fw-bold text-primary">10+</h2>
          <p className="text-muted">Years of Experience</p>
        </div>
        <div className="col-md-4">
          <h2 className="fw-bold text-primary">500+</h2>
          <p className="text-muted">Events Catered</p>
        </div>
        <div className="col-md-4">
          <h2 className="fw-bold text-primary">50+</h2>
          <p className="text-muted">Menu Items</p>
        </div>
      </div>

      <div className="text-center">
        <h3 className="fw-bold mb-3">Our Mission</h3>
        <p className="text-muted col-md-8 mx-auto">
          To take the stress out of event catering by delivering exceptional food, reliable service,
          and a seamless booking experience — so you can focus on enjoying your event, not managing it.
        </p>
      </div>
    </div>
  )
}

export default About
