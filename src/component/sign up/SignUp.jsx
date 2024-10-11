import React from 'react';
import { Close, LogoName } from '../../asset';
import {Icon} from '@iconify/react';
import SignIn from '../sign in/SignIn';
import { useState, useContext } from 'react';
import { handleSignInClick } from '../../container/signAuthcontext/authHandlers';
import {SignAuthContext} from '../../container/signAuthcontext/SignAuthContext';
import {useDispatch} from 'react-redux';
import { logIn } from '../../features/userSlice';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const SignUp = ({onClose}) => { 
    const { setShowSignUp, setShowSignIn } = useContext(SignAuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const dispatch = useDispatch();
    const auth = getAuth(); 
    const navigate = useNavigate();

    const Register = () => {
        if (!name) {
            return alert("please enter a full name!");
        }

        createUserWithEmailAndPassword(auth, email, password)
        .then((userAuth) => {
            updateProfile(userAuth.user,{
                displayName: name,
            })
            .then(() => {
                dispatch(logIn({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                }));
                navigate(`/profile/${userAuth.user.uid}`);
            });
        })
        .catch((error) => {
            console.log(error);
            alert(error.message);
          });
    };

  return (
            <div id='signUp' className="shadow-drop-2-center   signUp text-start  absolute top-1/4 z-10 bg-[var(--lightblue)]   flex flex-col items-center justify-center auto  md:left-1/4 lg:left-[32%]  ">

            <div className='bg-white rounded-lg w-fit  flex flex-col items-center justify-center px-12 py-6 '>
                <Icon icon="mingcute:close-line"  onClick={onClose}   className=' text-black relative left-[55%]  top-0  ' />
                <div className='w-fit bg-[var(--blue)] rounded-xl px-2 py-2 mb-4 '>
                <img src={LogoName} alt="" className='max-w-16  ' />
                </div>

                <form className='flex flex-col item-start gap-3 mt-4 ' > 
                    <div className='flex flex-col item-center  '>
                        <label  className='text-black mont font-medium text-sm md:text-base' >User Name :</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value) } placeholder='Enter Username' className=' bg-white border-[1px] border-[var(--blue)] rounded-lg py-1 px-2 mt-2 text-black ' />
                    </div>

                    <div className='flex flex-col'>
                        <label className='text-black mont font-medium text-sm md:text-base'  >Email :</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' className=' bg-white border-[1px] border-[var(--blue)] rounded-lg py-1 px-2 mt-2  text-black ' />
                    </div>

                    <div className='flex flex-col'>
                        <label className='text-black mont font-medium text-sm md:text-base '  >Password :</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value) } placeholder='Enter your password' className=' bg-white border-[1px] border-[var(--blue)] rounded-lg py-1 px-2 mt-2  text-black ' />
                    </div>

                    <div className='mt-2 flex flex-col items-center '>
                        <button type='submit'  className='rounded-2xl text-white bg-[var(--blue)] mont text-base font-semibold py-2 px-4 shadow-md mt-6  ' onClick={Register} >Sign Up  </button>


                            <h5 className=' text-black mont text-xs my-2  ' >Already have an account? <span className='cursor-pointer font-semibold' onClick={() => handleSignInClick(setShowSignUp, setShowSignIn)} >Sign In</span></h5>

       

                    </div>

                </form>

            </div>
             
    </div>
  )
}

export default SignUp