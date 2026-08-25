import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'admin123'

function AdminLogin() {

  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

   const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true'

  if (isLoggedIn) {
    return <Navigate to="/admin/dashboard" replace />
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem('isAdminLoggedIn', 'true')
      toast.success('Logged in successfully')
      navigate('/admin/dashboard')
    } else {
      setError('Invalid username or password')
    }
  }
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <h2 className="text-center mb-4">Admin Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-danger small">{error}</p>}
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
