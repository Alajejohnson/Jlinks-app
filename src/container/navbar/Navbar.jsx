import React from 'react'
import { Logo } from '../../asset'
import { Icon } from '@iconify/react/dist/iconify.js'
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { useDispatch } from 'react-redux';
import { getAuth } from 'firebase/auth';
import { logOut } from '../../features/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const navigate = useNavigate();


  // const logoutofApp = () => {
  //   dispatch(logOut())
  //   auth.signOut();
  // };'

  const logoutofApp = () => {
    auth.signOut()
      .then(() => {
        dispatch(logOut());
        console.log("User signed out successfully");
        navigate("/"); // Redirect to login or any other page
      })
      .catch((error) => {
        console.error("Error logging out: ", error);
        alert(error.message);
      });
  };


  return (
    <div className="navbar p-[var(--spmob)] md:p-[var(--sp)] rounded-b-md bg-white flex items-center justify-between sticky top-0 ">
      <div className="logo w-fit bg-[var(--blue)] rounded-xl px-2 py-2  " onClick={logoutofApp} >
      
      <img src={Logo} alt="" className='w-[15px]  ' />
      </div>
      {/* className="w-fit bg-white  hover:bg-[var(--light-ash)]  rounded-lg px-2 py-2 "   */}

      <div className='flex items-center gap-6'>

      <NavLink to="/link"  >  
      <div className="w-fit    "  >
        <Icon icon="octicon:link-16" className='text-2xl    ' />
        </div>

        </NavLink>

       

        <NavLink to="/"  >
        <div className="w-fit   "  >
        <PermIdentityIcon className='text-2xl     '   />
        </div>
        </NavLink>


      </div>


        <NavLink to="/profile/:userId" >
        <div className="w-fit   ">
        <Icon icon="bi:eye" className='text-2xl     '  />
        </div>
        </NavLink>



    </div>
  )
}

export default Navbar