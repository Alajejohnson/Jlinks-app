import React from 'react'
import { useState, useEffect } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { auth } from '../../firebase';
import { useParams } from 'react-router-dom';


const Profile = () => {
    const [profile, setProfile] = useState(null);
    // const {userId} = useParams();
    const user = auth.currentUser;
    const userId = user ? user.uid : null;
    

    useEffect(() => {
        const fetchProfile = async () => {
          if (!userId) {
            console.error("userId is undefined");
            return;
          }

          const docRef = doc(db, 'users', userId);
          const docSnap = await getDoc(docRef);
    
          if (docSnap.exists()) {
            setProfile(docSnap.data());
          } else {
            console.log('No such document!');
          }
        };
    
        fetchProfile();
      }, [userId]);
    
      if (!profile) {
        return <div>Loading...</div>;
      };
    

  return (
    <div className="profile p-[var(--spmob)] md:p-[var(--sp)]   ">

        <div className=' flex justify-between items-center  '>
            <button className='text-[var(--blue)] bg-white border-[1px] border-[var(--blue)] mont rounded-lg py-2 px-4 text-base   '  >Back to Editor </button>
            <button className='text-white bg-[var(--blue)]  mont rounded-lg py-2 px-4 text-base   '   >Share Link  </button>
        </div>

        <div className='flex flex-col justify-center items-center mt-12 '>
                {/* {image ? ( */}
      <img
        src={profile.imageUrl}
        alt="Profile"
        className="profile-img rounded-full w-32 h-32 object-cover border-2 border-[var(--blue)]"
        width={100} height={100} 
      />
    {/* ) : (
      <div className="placeholder w-32 h-32 bg-[var(--ash)] rounded-xl flex items-center justify-center flex-col text-white ">
        Add image
        <PhotoSizeSelectActualIcon />
      </div>
    )} */}

            <h2 className='mont text-black font-bold text-base mt-4   '>{profile.firstName} {profile.lastName}</h2>
            <p className='mont text-black font-normal text-sm mt-1   '  >{profile.email}</p>

        </div>



    </div>
  )
}

export default Profile