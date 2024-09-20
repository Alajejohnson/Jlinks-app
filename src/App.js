import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './container/home/Home';
import Layout from './container/layout/Layout';
import { Link, Navbar, Profile, ProfileDetails } from './container';
import { useDispatch, useSelector } from 'react-redux';
import { logIn, logOut, selectUser } from './features/userSlice';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function App({userId}) {
  const auth = getAuth();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(logIn(user));
      } else {
        dispatch(logOut(null));
      }
    });
    return unsubscribe;
  }, [auth, dispatch]);


  return (
    <div className="app   bg-white relative">      
      <BrowserRouter>
        <Routes>
          {
            !user ? (
            <Route path="/"  element={<Home />} />  
           ): 
            ( 

            <Route path="/" element={<Layout />}>
              
                <Route index element={<ProfileDetails userId={userId} />}   />
                <Route path='/link' element={<Link userId={userId} /> } />
                <Route path='/profile/:userId' element={<Profile userId={userId} /> }  />
              </Route>

                         
           
           )
          } 
              
          </Routes>
      </BrowserRouter>
      


    </div>
  );
}

export default App;
