import { useState } from 'react'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Home } from './pages/Home'
import { Login } from './pages/login'
import { RefreshComponent } from './RefreshComponent'

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to='/login' />
  }
  return (
    <div>
      <RefreshComponent setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<PrivateRoute element={<Home />} />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        toastClassName="!rounded-xl !shadow-2xl !border !border-gray-200"
        bodyClassName="text-sm font-medium"
      />

    </div>
  )
}

export default App