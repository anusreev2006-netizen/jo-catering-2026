import React, { useEffect, useState } from 'react'
import { Bar, Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js'
import api from '../data/api'

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend)


function AdminDashboard() {

     const [menuItems, setMenuItems] = useState([])
  const [packages, setPackages] = useState([])
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get('/menuItems'),
      api.get('/packages'),
      api.get('/bookings'),
    ]).then(([menuRes, packagesRes, bookingsRes]) => {
      setMenuItems(menuRes.data)
      setPackages(packagesRes.data)
      setBookings(bookingsRes.data)
      setLoading(false)
    }).catch((err) => {
      console.log(err)
      setLoading(false)
    })
  }, [])

     const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn')
    window.location.href = '/admin/login'
  }

  // Bookings grouped by package (for Pie chart)
  const packageCounts = {}
  bookings.forEach((b) => {
    const pkg = b.package || 'No Package Selected'
    packageCounts[pkg] = (packageCounts[pkg] || 0) + 1
  })

  const pieData = {
    labels: Object.keys(packageCounts),
    datasets: [
      {
        data: Object.values(packageCounts),
        backgroundColor: ['#1B4332', '#C9A227', '#40916C', '#E0A106', '#95D5B2'],
      },
    ],
  }

  // Menu items grouped by category (for Bar chart)
  const categoryCounts = {}
  menuItems.forEach((item) => {
    categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1
  })

  const barData = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        label: 'Menu Items',
        data: Object.values(categoryCounts),
        backgroundColor: '#1B4332',
      },
    ],
  }

  if (loading) {
    return <div className="container py-5"><p>Loading dashboard...</p></div>
  }

  return (
     <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Admin Dashboard</h1>
        <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
      </div>

      {/* Stat Cards */}
      <div className="row g-4 mb-5">
        <div className="col-md-3">
          <div className="card shadow-sm text-center p-3">
            <h6 className="text-muted">Menu Items</h6>
            <h2 className="fw-bold">{menuItems.length}</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm text-center p-3">
            <h6 className="text-muted">Packages</h6>
            <h2 className="fw-bold">{packages.length}</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm text-center p-3">
            <h6 className="text-muted">Total Bookings</h6>
            <h2 className="fw-bold">{bookings.length}</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm text-center p-3">
            <h6 className="text-muted">Pending Bookings</h6>
            <h2 className="fw-bold">{bookings.filter((b) => !b.status || b.status === 'Pending').length}</h2>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card shadow-sm p-4">
            <h5 className="mb-3">Bookings by Package</h5>
            {bookings.length === 0 ? (
              <p className="text-muted">No bookings yet.</p>
            ) : (
              <Pie data={pieData} />
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm p-4">
            <h5 className="mb-3">Menu Items by Category</h5>
            {menuItems.length === 0 ? (
              <p className="text-muted">No menu items yet.</p>
            ) : (
              <Bar data={barData} />
            )}
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="row g-3 mt-4">
        <div className="col-md-4">
          <a href="/admin/menu" className="btn btn-primary w-100 py-3">Manage Menu</a>
        </div>
        <div className="col-md-4">
          <a href="/admin/packages" className="btn btn-primary w-100 py-3">Manage Packages</a>
        </div>
        <div className="col-md-4">
          <a href="/admin/bookings" className="btn btn-primary w-100 py-3">Manage Bookings</a>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
