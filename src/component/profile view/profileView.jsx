import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDoc, doc } from 'firebase/firestore'; 
import { db } from '../../firebase';

const profileView = () => {
    const { userId } = useParams();
    const [profile, setProfile] = useState(null);
  
    useEffect(() => {
      const fetchProfile = async () => {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        } else {
          console.log('No such document!');
        }
      };
  
      if (userId) {
        fetchProfile();
      }
    }, [userId]);
  
    if (!profile) {
      return <div>Loading...</div>;
    }

  return (
    <div>profileView</div>
  )
}

export default profileView