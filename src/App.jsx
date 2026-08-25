import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Packages from './pages/Packages'
import Gallery from './pages/Gallery'
import About from './pages/About'
import Contact from './pages/Contact'
import Booking from './pages/Booking'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AdminLogin from './admin/AdminLogin'
import AdminDashboard from './admin/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import ManageMenu from './admin/ManageMenu'
import ManagePackages from './admin/ManagePackages'


function App() {


  return (
    <>
   <BrowserRouter>
   <Navbar/>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/menu' element={<Menu/>}/>
    <Route path='/packages' element={<Packages/>}/>
    <Route path='/gallery' element={<Gallery/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/contact' element={<Contact/>}/>
    <Route path='/booking' element={<Booking/>}/>
     <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/menu"
          element={
            <ProtectedRoute>
              <ManageMenu />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/packages"
          element={
            <ProtectedRoute>
              <ManagePackages />
            </ProtectedRoute>
          }
        />
   </Routes>
   <Footer/>
    <ToastContainer position="top-right" autoClose={3000} />
   </BrowserRouter>
    </>
  )
}

export default App
