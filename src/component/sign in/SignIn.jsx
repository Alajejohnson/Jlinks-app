import React from 'react'
import {Icon} from '@iconify/react'
import { LogoName } from '../../asset'
import { useState, useContext } from 'react'
import { handleSignUpClick } from '../../container/signAuthcontext/authHandlers'
import {SignAuthContext} from '../../container/signAuthcontext/SignAuthContext'
import { useDispatch } from 'react-redux'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { logIn } from '../../features/userSlice'
import { useNavigate } from 'react-router-dom'

const SignIn = ({onClose}) => {
    const { setShowSignUp, setShowSignIn } = useContext(SignAuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const auth = getAuth();
    const navigate = useNavigate();

    const LoginToApp = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
        .then((userAuth) => {
            dispatch(
                logIn({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                })
            );
            navigate(`/profile/${userAuth.user.uid}`);
        }).catch((error) => alert(error.message));
    };

  return (
    <div className="signIn shadow-drop-2-center text-start  absolute top-1/4 z-10 bg-[var(--lightblue)]   flex flex-col items-center justify-center auto  left-[13%]  md:left-1/4 lg:left-[32%]   ">


    <div className='bg-white rounded-lg w-fit  flex flex-col items-center justify-center px-12 py-6 '>
        <Icon icon="mingcute:close-line" onClick={onClose}  className=' text-black relative left-[55%]  top-0  ' />
        <div className='w-fit bg-[var(--blue)] rounded-xl px-2 py-2 mb-4 '>
        <img src={LogoName} alt="" className='max-w-16  ' />
        </div>

        <form className='flex flex-col item-start gap-3 mt-4 md:gap-6  ' > 
        <div className='flex flex-col md:flex-row md:gap-[3rem] '>
                        <label className='text-black mont font-medium text-sm md:text-base'  >Email :</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' className=' bg-white border-[1px] border-[var(--blue)] rounded-lg py-1 px-2 mt-2  md:mt-0 text-black ' />
                    </div>

            <div className='flex flex-col  md:flex-row md:gap-4'>
                <label className='text-black mont font-medium text-sm md:text-base '  >Password :</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password' className=' bg-white border-[1px] border-[var(--blue)] rounded-lg py-1 px-2 mt-2   text-black md:mt-0 ' />
            </div>

            <div className='mt-2 flex flex-col items-center '>
                <button type='submit' className='rounded-2xl text-white bg-[var(--blue)] mont text-base font-semibold py-2 px-4 shadow-md mt-6 md:mt-3  ' onClick={LoginToApp} >Login</button>

                <h5 className=' text-black mont text-xs my-2  ' >Don't have an account? <span className='cursor-pointer font-semibold' onClick={() => handleSignUpClick(setShowSignUp, setShowSignIn)}  >Sign Up</span></h5>
            </div>
        </form>

    </div>
    


</div>
  )
}

export default SignIn