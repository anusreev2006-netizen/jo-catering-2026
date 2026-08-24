import React, { useEffect, useState } from 'react'
import api from '../data/api'
import PackageCard from '../components/PackageCard'

const categories = ['All', 'Wedding', 'Corporate', 'Party']


function Packages() {

  const [packages, setPackages] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/packages')
      .then((res) => {
        setPackages(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [])

  const filteredPackages = packages.filter(
    (pkg) => selectedCategory === 'All' || pkg.category === selectedCategory
  )

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Our Packages</h1>

      {/* Category Filter */}
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

      {/* Packages Grid */}
      {loading ? (
        <p className="text-center">Loading packages...</p>
      ) : filteredPackages.length === 0 ? (
        <p className="text-center text-muted">No packages found.</p>
      ) : (
        <div className="row g-4">
          {filteredPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Packages
