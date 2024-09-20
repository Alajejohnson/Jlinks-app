import React from 'react'
import Header from '../header/Header'
import Hero from '../hero/Hero'
import About from '../about/About'
import Footer from '../footer/Footer'
import { useState } from 'react'
import {SignAuthProvider} from '../signAuthcontext/SignAuthContext'

const Home = () => {
  // const [showSignUp, setShowSignUp] = useState(false);
  // const [showSignIn, setShowSignIn] = useState(false);

  // const handleShowSignUp = () => {
  //   setShowSignUp(true);
  // };

  // const handleCloseSignUp = () => {
  //   setShowSignUp(false);
  // };

  // const handleShowSignIn = () => {
  //   setShowSignIn(true);
  // };

  // const handleCloseSignIn = () => {
  //   setShowSignIn(false);
  // };

  // showSignUp={showSignUp} onCloseSignUp={handleCloseSignUp} onSignUpClick={handleShowSignUp} 
  //       showSignIn={handleShowSignIn} 
  //       onSignInClick={handleShowSignIn}
  //       onCloseSignIn={handleCloseSignIn}

  return (
    <div className="home  linear">
      <SignAuthProvider>
      <Header  />
      <Hero   />
      </SignAuthProvider>

        <About />
        <Footer />
    </div>
  )
}

export default Home