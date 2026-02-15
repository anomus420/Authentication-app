import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
// import { Login } from './login'
import { handleError, handleSuccess } from '../Util'

export const Login = () => {

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name , value);
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  }
  console.log(loginInfo);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password, } = loginInfo;
    if (!email || !password) {
      return handleError('All fields are required');
    }
    try {
      const url = "https://authentication-app-api-henna.vercel.app/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo),
      })
      const result = await response.json();
      const { success, message, jwtToken, error, name } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);
        setTimeout(() => {
          navigate('/home');
        }, 500)
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
    }
    catch (error) {
      handleError(error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">

      <div className="w-full max-w-md bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl shadow-2xl p-8">

        {/* Title */}
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Welcome Back !
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-white text-sm mb-2">Email</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email"
              value={loginInfo.email}
              className="px-4 py-3 rounded-xl bg-white/80 focus:bg-white outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-white text-sm mb-2">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Enter your password"
              value={loginInfo.password}
              className="px-4 py-3 rounded-xl bg-white/80 focus:bg-white outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="mt-4 bg-white text-purple-600 font-semibold py-3 rounded-xl hover:bg-purple-600 hover:text-white transition duration-300 shadow-lg"
          >
            Login
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center text-white text-sm mt-6">
          Don’t have an account?
          <Link
            to="/signup"
            className="ml-1 font-semibold underline hover:text-yellow-300 transition"
          >
            Sign Up
          </Link>
        </p>

        {/* <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={true}
          newestOnTop={true}
          closeOnClick
          pauseOnHover
          draggable
          theme="dark"
          toastClassName="!bg-white !text-gray-800 !rounded-xl !shadow-2xl !border !border-gray-200"
          bodyClassName="text-sm font-medium"
        /> */}

      </div>
    </div>
  );

}
