import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import api from '../data/api'


function ManageMenu() {
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)

   const emptyForm = {
    name: '',
    category: 'Starters',
    price: '',
    image: '',
    description: '',
    type: 'veg',
  }

  const [formData, setFormData] = useState(emptyForm)

  const fetchMenuItems = () => {
    api.get('/menuItems')
      .then((res) => {
        setMenuItems(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchMenuItems()
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name || !formData.price) {
      toast.error('Name and price are required')
      return
    }

    if (editingId) {
      // Update existing item
      api.put(`/menuItems/${editingId}`, formData)
        .then(() => {
          toast.success('Menu item updated')
          resetForm()
          fetchMenuItems()
        })
        .catch((err) => {
          console.log(err)
          toast.error('Update failed')
        })
    } else {
      // Create new item
      api.post('/menuItems', formData)
        .then(() => {
          toast.success('Menu item added')
          resetForm()
          fetchMenuItems()
        })
        .catch((err) => {
          console.log(err)
          toast.error('Failed to add item')
        })
    }
  }

  const handleEdit = (item) => {
    setEditingId(item.id)
    setFormData({
      name: item.name,
      category: item.category,
      price: item.price,
      image: item.image,
      description: item.description,
      type: item.type,
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return

    api.delete(`/menuItems/${id}`)
      .then(() => {
        toast.success('Menu item deleted')
        fetchMenuItems()
      })
      .catch((err) => {
        console.log(err)
        toast.error('Delete failed')
      })
  }

  const resetForm = () => {
    setFormData(emptyForm)
    setEditingId(null)
  }

  return (
     <div className="container py-5">
      <h1 className="mb-4">Manage Menu</h1>

      {/* Form */}
      <div className="card shadow-sm p-4 mb-5">
        <h5 className="mb-3">{editingId ? 'Edit Menu Item' : 'Add New Menu Item'}</h5>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Category</label>
              <select
                name="category"
                className="form-select"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Starters">Starters</option>
                <option value="Main Course">Main Course</option>
                <option value="Desserts">Desserts</option>
                <option value="Beverages">Beverages</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Price (₹)</label>
              <input
                type="number"
                name="price"
                className="form-control"
                value={formData.price}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Image URL</label>
              <input
                type="text"
                name="image"
                className="form-control"
                value={formData.image}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Type</label>
              <select
                name="type"
                className="form-select"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="veg">Veg</option>
                <option value="non-veg">Non-Veg</option>
              </select>
            </div>
            <div className="col-12">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                className="form-control"
                rows="2"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <div className="mt-3">
            <button type="submit" className="btn btn-primary me-2">
              {editingId ? 'Update Item' : 'Add Item'}
            </button>
            {editingId && (
              <button type="button" className="btn btn-outline-secondary" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Table */}
      {loading ? (
        <p>Loading menu items...</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>₹{item.price}</td>
                  <td>{item.type}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(item)}>
                      Edit
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ManageMenu
