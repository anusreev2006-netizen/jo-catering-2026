import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../data/api'

function Booking() {
  const location = useLocation()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    guestCount: '',
    package: '',
    message: '',
  })

  const [errors, setErrors] = useState({})

  // Auto-fill package if coming from "Choose Package" button
  useEffect(() => {
    if (location.state?.selectedPackage) {
      setFormData((prev) => ({ ...prev, package: location.state.selectedPackage }))
    }
  }, [location.state])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email'
    }
     if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
   if (!formData.eventDate) {
  newErrors.eventDate = 'Event date is required'
    } else {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const selectedDate = new Date(formData.eventDate)
      if (selectedDate <= today) {
        newErrors.eventDate = 'Event date must be a future date'
      }
    }
    if (!formData.guestCount) newErrors.guestCount = 'Guest count is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validate()) return

    api.post('/bookings', formData)
      .then(() => {
        toast.success('Booking request submitted! We will contact you soon.')
        setFormData({
          name: '',
          email: '',
          phone: '',
          eventDate: '',
          guestCount: '',
          package: '',
          message: '',
        })
        setErrors({})
      })
      .catch((err) => {
        console.log(err)
        toast.error('Something went wrong. Please try again.')
      })
  }
  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Book Your Event</h1>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <form onSubmit={handleSubmit} noValidate>

            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Event Date</label>
                <input
                  type="date"
                  name="eventDate"
                  className={`form-control ${errors.eventDate ? 'is-invalid' : ''}`}
                  value={formData.eventDate}
                  onChange={handleChange}
                  min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                />
                {errors.eventDate && <div className="invalid-feedback">{errors.eventDate}</div>}
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Guest Count</label>
                <input
                  type="number"
                  name="guestCount"
                  className={`form-control ${errors.guestCount ? 'is-invalid' : ''}`}
                  value={formData.guestCount}
                  onChange={handleChange}
                  min="1"
                />
                {errors.guestCount && <div className="invalid-feedback">{errors.guestCount}</div>}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Package</label>
              <select
                name="package"
                className="form-select"
                value={formData.package}
                onChange={handleChange}
              >
                <option value="">Select a package (optional)</option>
                <option value="Wedding Gold">Wedding Gold</option>
                <option value="Corporate Essentials">Corporate Essentials</option>
                <option value="Party Delight">Party Delight</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="form-label">Message</label>
              <textarea
                name="message"
                className="form-control"
                rows="4"
                placeholder="Tell us more about your event..."
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary btn-lg w-100">
              Submit Booking Request
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Booking
