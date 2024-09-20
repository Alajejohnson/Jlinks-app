import React, { useState, useContext } from 'react'
import { Hero_img } from '../../asset'
import SignUp from '../../component/sign up/SignUp';
import SignIn from '../../component/sign in/SignIn';
import { Link, useLocation } from 'react-router-dom';
import {SignAuthContext} from '../signAuthcontext/SignAuthContext';
import { handleSignInClick, handleSignUpClick } from '../signAuthcontext/authHandlers';

const Hero = () => {
  const { showSignUp, showSignIn, setShowSignUp, setShowSignIn } = useContext(SignAuthContext);

  const handleClose = () => {
    setShowSignUp(false);
    setShowSignIn(false);
  };

  return (
   <div id='hero' className="hero text-center  p-[var(--spmob)] md:p-[var(--sp)] flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 mb-4  ">
    <div className="left ">
        <img src={Hero_img} alt="" />

    </div>
    <div className="right text-white  ">
    <h4 className='merri text-base  '>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio commodi repudiandae error iusto. Consequatur unde reprehenderit dicta, vero fugit accusamus optio maxime ea qui nesciunt tempora. Ut et illum distinctio. </h4>


        <button className='heartbeat  rounded-2xl text-white bg-[var(--coral)] mont text-base font-semibold py-2 px-4 shadow-md mt-6  '    >
          <Link to="" onClick={() => handleSignUpClick(setShowSignUp, setShowSignIn)} >Sign Up</Link>
        </button>

        {showSignUp && <SignUp onClose={handleClose} />}
        {showSignIn && <SignIn onClose={handleClose} />}
        
        
        </div>


   </div>
  )
}

export default Hero