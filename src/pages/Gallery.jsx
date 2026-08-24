import React, { useEffect, useState } from 'react'
import api from '../data/api'

const categories = ['All', 'Wedding', 'Corporate', 'Party']

function Gallery() {

  const [images, setImages] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/gallery')
      .then((res) => {
        setImages(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [])

  const filteredImages = images.filter(
    (img) => selectedCategory === 'All' || img.category === selectedCategory
  )

  return (
    
     <div className="container py-5">
      <h1 className="text-center mb-4">Event Gallery</h1>

      {/* Category Tabs */}
      <div className="d-flex justify-content-center gap-2 mb-5 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`btn ${selectedCategory === cat ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      {loading ? (
        <p className="text-center">Loading gallery...</p>
      ) : filteredImages.length === 0 ? (
        <p className="text-center text-muted">No images found.</p>
      ) : (
        <div className="row g-4">
          {filteredImages.map((img) => (
            <div className="col-md-3 col-sm-6" key={img.id}>
              <div className="card shadow-sm">
                <img
                  src={img.image}
                  className="card-img-top"
                  alt={img.title}
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <p className="mb-0 fw-bold">{img.title}</p>
                  <span className="badge bg-secondary mt-1">{img.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Gallery
