import React, { useState } from 'react'
import { toast } from 'react-toastify'
import api from '../data/api'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [errors, setErrors] = useState({})

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
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validate()) return

    api.post('/enquiries', formData)
      .then(() => {
        toast.success('Message sent! We will get back to you soon.')
        setFormData({ name: '', email: '', message: '' })
        setErrors({})
      })
      .catch((err) => {
        console.log(err)
        toast.error('Something went wrong. Please try again.')
      })
  }

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">Contact Us</h1>

      <div className="row g-5">
        {/* Contact Info */}
        <div className="col-md-5">
          <h5 className="fw-bold mb-3">Get in Touch</h5>
          <p className="text-muted mb-2">📍 123 Main Street, Ernakulam, Kerala</p>
          <p className="text-muted mb-2">📞 +91 98765 43210</p>
          <p className="text-muted mb-2">✉️ hello@JoCaterings.com</p>
          <p className="text-muted">🕒 Mon – Sat: 9:00 AM – 7:00 PM</p>
        </div>

        {/* Contact Form */}
        <div className="col-md-7">
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            <div className="mb-3">
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

            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea
                name="message"
                rows="4"
                className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                value={formData.message}
                onChange={handleChange}
              ></textarea>
              {errors.message && <div className="invalid-feedback">{errors.message}</div>}
            </div>

            <button type="submit" className="btn btn-primary btn-lg w-100">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
