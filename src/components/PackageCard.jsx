import React from 'react'
import { NavLink } from 'react-router-dom'

function PackageCard({pkg}) {
  return (
    <div className="col-md-3">
      <div className="card h-100 shadow-sm">
        <img src={pkg.image} className="card-img-top" alt={pkg.name} style={{ height: '200px', objectFit: 'cover' }} />
        <div className="card-body d-flex flex-column">
          <span className="badge bg-secondary align-self-start mb-2">{pkg.category}</span>
          <h5 className="card-title fw-bold">{pkg.name}</h5>
          <p className="card-text text-muted">{pkg.description}</p>
          <ul className="list-unstyled mb-3">
            {pkg.features.map((feature, index) => (
              <li key={index} className="mb-1">
                <span className="text-success me-2">✓</span>{feature}
              </li>
            ))}
          </ul>
          <div className="mt-auto">
            <p className="fw-bold text-primary fs-5 mb-2">₹{pkg.price.toLocaleString()}</p>
            <NavLink to="/booking" state={{ selectedPackage: pkg.name }} className="btn btn-primary w-100">
              Choose Package
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PackageCard
