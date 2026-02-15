import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const RefreshComponent = ({setIsAuthenticated})=> {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('token')){
            setIsAuthenticated(true);
            if(location.pathname === '/login' ||
                location.pathname === '/signup'||
                location.pathname === '/'
            ){
                navigate('/home' , {replce : false});
            }
        }
    } , [location , setIsAuthenticated , navigate ])

  return (
    null
  )
}
