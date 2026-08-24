import React, { useEffect, useState } from 'react'
import api from '../data/api'
import MenuCard from '../components/MenuCard'

const categories = ['All', 'Starters', 'Main Course', 'Desserts', 'Beverages']


function Menu() {

  const [menuItems, setMenuItems] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

   useEffect(() => {
    api.get('/menuItems')
      .then((res) => {
        setMenuItems(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [])

  const filteredItems = menuItems
    .filter((item) => selectedCategory === 'All' || item.category === selectedCategory)
    .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))


  return (
      <div className="container py-5">
      <h1 className="text-center mb-4">Our Menu</h1>

      {/* Search */}
      <div className="row mb-4 justify-content-center">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search dishes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

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
      {/* Menu Grid */}
      {loading ? (
        <p className="text-center">Loading menu...</p>
      ) : filteredItems.length === 0 ? (
        <p className="text-center text-muted">No dishes found.</p>
      ) : (
        <div className="row g-4">
          {filteredItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Menu
