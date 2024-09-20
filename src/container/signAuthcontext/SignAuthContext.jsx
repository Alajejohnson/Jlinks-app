import React, { createContext, useState } from 'react'

export const SignAuthContext = createContext();

// Create a provider component
export const SignAuthProvider = ({children}) => {
    const [showSignUp, setShowSignUp] = useState(false);
    const [showSignIn, setShowSignIn] = useState(false);
 
    return (
        <SignAuthContext.Provider value={{ showSignUp, setShowSignUp, showSignIn, setShowSignIn }}>
        {children}
      </SignAuthContext.Provider>
  )
}

export default SignAuthContext