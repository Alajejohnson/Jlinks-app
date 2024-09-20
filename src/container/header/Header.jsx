import React, { useState, useContext } from 'react'
import { Close, Hamburger, Logo, LogoName } from '../../asset'
import SignUp from '../../component/sign up/SignUp';
import { Link, useNavigate } from 'react-router-dom';
import {SignAuthContext} from '../signAuthcontext/SignAuthContext';
import { handleSignInClick, handleSignUpClick } from '../signAuthcontext/authHandlers';


const Header = () => {
  const [toggle, setToggle] = useState(false);

  const { setShowSignUp, setShowSignIn } = useContext(SignAuthContext);


  return (
    <div className='header  text-center p-[var(--spmob)] md:p-[var(--sp)]  flex justify-between items-center relative' >
      <div className="logo  flex">
        {/* <img src={Logo} alt="" className='max-w-[10%]  ' /> */}
        <img src={LogoName} alt="" className='text-pop-up-br   max-w-28  ' />
      </div>

      <div className="menu hidden md:flex flex-col md:flex-row gap-8  ">
        <a href="#" className='text-lg  mont font-medium text-white hover:text-[var(--coral)] '> Home </a>
          <a href="#" className='text-lg  mont font-medium text-white hover:text-[var(--coral)]'  >About</a>

      </div>

      <div className="btns hidden md:flex flex-col md:flex-row gap-8">
        <button className='text-lg text-white font-normal border-[1px] rounded-lg py-1  px-4 hover:border-[var(--coral)]   '  onClick={() => handleSignInClick(setShowSignUp, setShowSignIn)}  >
          Login
          </button>
          <button className='text-lg text-white font-normal py-1  px-4 hover:text-[black]  '  onClick={() => handleSignUpClick(setShowSignUp, setShowSignIn)} >
            Sign Up
          </button>
      </div>

    {
      toggle ? <img src={Close} alt="" onClick={ () => setToggle(false)} className='block  md:hidden z-10' /> : <img src={Hamburger} alt="" onClick={() => setToggle(true)} className='block md:hidden z-10' />
    }

    {
      toggle && 
      <div className='scale-in-hor-right  flex flex-col md:hidden gap-4 absolute top-0 right-0 bg-[var(--coral)] px-12 py-12  '>
              <div className="menu flex flex-col md:flex-row gap-2 ">
        {/* <a href="#" className='text-lg  mont font-medium text-white hover:text-[var(--coral)] mt-10 '> Home </a> */}
        <Link to="/" className='text-lg  mont font-medium text-white hover:text-black mt-10 ' >Home</Link>
          <a href="#about" className='text-lg  mont font-medium text-white hover:text-black'  >About</a>


      </div>

      <div className="btns flex flex-col md:flex-row gap-2">
        <button className='text-lg text-white font-normal border-[1px] rounded-lg py-1  px-4 hover:border-black   '  onClick={() => handleSignInClick(setShowSignUp, setShowSignIn)}  >
          Login
          </button>
          <button className='text-lg text-white font-normal py-1  px-4 hover:text-[black]  '  onClick={() => handleSignUpClick(setShowSignUp, setShowSignIn)} >
            Sign Up
                      </button>




      </div>
      </div>
    }

    </div>
  )
}

export default Header