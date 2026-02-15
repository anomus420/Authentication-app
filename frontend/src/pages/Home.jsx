import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';


import { handleError, handleSuccess } from '../Util';
export const Home = () => {

  const [loggedInUser ,setLoggedInUser] = useState('');
  const [products , setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
      setLoggedInUser(localStorage.getItem('loggedInUser'))
  } , [] )

  const handleLogOut = (e) =>{
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('Logged out successfully');
    setTimeout(() => {
      navigate('/login');
    }, 500);
  }

  const fetchProducts = async ()=>{
    try{
      const url = "https:/localhost:8080/authentication-app-api-henna.vercel.app/products";
      const headers = {
        // method: "GET",
        headers : {
          // "Content-Type": "application/json",
          'Authorization' : `Bearer ${localStorage.getItem('token')}`,
        }
      }
      const response = await fetch(url , headers);
      const result = await response.json();
      // console.log(result);
      setProducts(result);
    }
    catch(err){
      handleError(err);
    }
  }
  useEffect(()=>{
    fetchProducts();
  } , []);

  return (
  <div className="min-h-screen bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-6">
    
    <div className="bg-white shadow-2xl rounded-2xl w-full max-w-2xl p-8">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome, <span className="text-indigo-600">{loggedInUser}</span>
        </h1>

        <button
          onClick={handleLogOut}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-300"
        >
          Logout
        </button>
      </div>

      {/* Divider */}
      <hr className="mb-6" />

      {/* Products Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          🛍️ Products
        </h2>

        <div className="space-y-4">
          {
            Array.isArray(products) && products.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-100 p-4 rounded-xl shadow hover:shadow-lg transition duration-300"
              >
                <span className="font-medium text-gray-800">
                  {item.name}
                </span>

                <span className="text-indigo-600 font-semibold">
                  ₹ {item.price}
                </span>
              </div>
            ))
          }
        </div>
      </div>

      {/* <ToastContainer /> */}
    </div>
  </div>
);

}
