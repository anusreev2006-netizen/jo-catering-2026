import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import api from '../data/api'


function ManagePackages() {

     const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)

  const emptyForm = {
    name: '',
    category: 'Wedding',
    price: '',
    image: '',
    description: '',
    features: '',
  }

  const [formData, setFormData] = useState(emptyForm)

  const fetchPackages = () => {
    api.get('/packages')
      .then((res) => {
        setPackages(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchPackages()
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

    // Convert comma-separated features string into an array
    const payload = {
      ...formData,
      price: Number(formData.price),
      features: formData.features
        .split(',')
        .map((f) => f.trim())
        .filter((f) => f.length > 0),
    }

    if (editingId) {
      api.put(`/packages/${editingId}`, payload)
        .then(() => {
          toast.success('Package updated')
          resetForm()
          fetchPackages()
        })
        .catch((err) => {
          console.log(err)
          toast.error('Update failed')
        })
    } else {
      api.post('/packages', payload)
        .then(() => {
          toast.success('Package added')
          resetForm()
          fetchPackages()
        })
        .catch((err) => {
          console.log(err)
          toast.error('Failed to add package')
        })
    }
  }

  const handleEdit = (pkg) => {
    setEditingId(pkg.id)
    setFormData({
      name: pkg.name,
      category: pkg.category,
      price: pkg.price,
      image: pkg.image,
      description: pkg.description,
      features: pkg.features.join(', '),
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this package?')) return

    api.delete(`/packages/${id}`)
      .then(() => {
        toast.success('Package deleted')
        fetchPackages()
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
      <h1 className="mb-4">Manage Packages</h1>

      {/* Form */}
      <div className="card shadow-sm p-4 mb-5">
        <h5 className="mb-3">{editingId ? 'Edit Package' : 'Add New Package'}</h5>
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
                <option value="Wedding">Wedding</option>
                <option value="Corporate">Corporate</option>
                <option value="Party">Party</option>
                <option value="Engagement">Engagement</option>
                <option value="Baby Shower">Baby Shower</option>
                <option value="Housewarming">Housewarming</option>
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
            <div className="col-md-6">
              <label className="form-label">Features (comma-separated)</label>
              <input
                type="text"
                name="features"
                className="form-control"
                placeholder="e.g. Live counter, 5-course meal, Up to 200 guests"
                value={formData.features}
                onChange={handleChange}
              />
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
              {editingId ? 'Update Package' : 'Add Package'}
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
        <p>Loading packages...</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Features</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg) => (
                <tr key={pkg.id}>
                  <td>
                    <img src={pkg.image} alt={pkg.name} style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                  </td>
                  <td>{pkg.name}</td>
                  <td>{pkg.category}</td>
                  <td>₹{pkg.price.toLocaleString()}</td>
                  <td className="small">{pkg.features.join(', ')}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(pkg)}>
                      Edit
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(pkg.id)}>
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

export default ManagePackages
