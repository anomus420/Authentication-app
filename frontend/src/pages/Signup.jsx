import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Login } from './login'
import { handleError , handleSuccess} from '../Util'

export const Signup = () => {

  const [loginInfo, setLoginInfo] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [signUpInfo, setSignUpInfo] = useState({
    name: '',
    email: '',
    password: ''
  })

  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(name , value);
    const copySignUpInfo = { ...signUpInfo };
    copySignUpInfo[name] = value;
    setSignUpInfo(copySignUpInfo);
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    const {name , email , password } = signUpInfo;
    if(!name || !email || !password){
      return handleError('All fields are required');
    }
    try{
      const url = 'http://localhost:8080/auth/signup';
      const response = await fetch(url , {
        method:"POST",
        headers : {
          'Content-Type' : 'application/json'
        },
        body:JSON.stringify(signUpInfo),
      })
      const result = await response.json();
      const {success , message ,error } = result;
      if(success){
        handleSuccess(message);
        setTimeout(()=>{
          navigate('/login');
        } , 500)
      } else if(error){
        const details = error?.details[0].message;
        handleError(details);
      }else if(!success){
        handleError(message);
      }
      console.log(result);
    }
    catch(error){
      handleError(error);
    }
  }

  return (
  <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-600 via-indigo-600 to-blue-500 px-4">

    <div className="w-full max-w-md bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl shadow-2xl p-8">

      {/* Title */}
      <h1 className="text-3xl font-bold text-white text-center mb-8">
        Create Account 
      </h1>

      <form onSubmit={handleSignUp} className="flex flex-col gap-5">

        {/* Name */}
        <div className="flex flex-col">
          <label className="text-white text-sm mb-2">Full Name</label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            placeholder="Enter your name"
            value={signUpInfo.name}
            className="px-4 py-3 rounded-xl bg-white/80 focus:bg-white outline-none focus:ring-2 focus:ring-purple-400 transition duration-300"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-white text-sm mb-2">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter your email"
            value={signUpInfo.email}
            className="px-4 py-3 rounded-xl bg-white/80 focus:bg-white outline-none focus:ring-2 focus:ring-purple-400 transition duration-300"
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
            value={signUpInfo.password}
            className="px-4 py-3 rounded-xl bg-white/80 focus:bg-white outline-none focus:ring-2 focus:ring-purple-400 transition duration-300"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="mt-4 bg-white text-purple-600 font-semibold py-3 rounded-xl hover:bg-purple-600 hover:text-white transition duration-300 shadow-lg"
        >
          Sign Up
        </button>
      </form>

      {/* Login Link */}
      <p className="text-center text-white text-sm mt-6">
        Already have an account?
        <Link
          to="/login"
          className="ml-1 font-semibold underline hover:text-yellow-300 transition"
        >
          Login
        </Link>
      </p>

      {/* <ToastContainer /> */}
    </div>
  </div>
);

}
