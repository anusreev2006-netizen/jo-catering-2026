import React from 'react'

function MenuCard({item}) {
  return (
        <div className="col-md-3 col-sm-6">
      <div className="card h-100 shadow-sm">
        <img src={item.image} className="card-img-top" alt={item.name} style={{ height: '200px', objectFit: 'cover' }} />
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start">
            <h5 className="card-title fw-bold mb-1">{item.name}</h5>
            <span className={`badge ${item.type === 'veg' ? 'bg-success' : 'bg-danger'}`}>
              {item.type === 'veg' ? 'Veg' : 'Non-Veg'}
            </span>
          </div>
          <p className="text-muted small mb-2">{item.category}</p>
          <p className="card-text">{item.description}</p>
          <p className="fw-bold text-primary mb-0">₹{item.price}</p>
        </div>
      </div>
    </div>
  )
}

export default MenuCard
