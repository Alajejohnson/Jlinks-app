export const handleSignUpClick = (setShowSignUp, setShowSignIn) => {
    setShowSignUp(true);
    setShowSignIn(false);
  };
  
  export const handleSignInClick = (setShowSignUp, setShowSignIn) => {
    setShowSignUp(false);
    setShowSignIn(true);
  };