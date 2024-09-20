import React, { useEffect } from 'react'
import { useState } from 'react';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import {doc, setDoc} from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { auth } from '../../firebase';
import { getDoc } from 'firebase/firestore';


const ProfileDetails = () => {
  const user = auth.currentUser;
  const userId = user ? user.uid : null;
  
  if (!userId) {
    console.error("User not logged in");
  } else {
    console.log("User ID:", userId);
  };

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    imageUrl: ''
  });

    const [image, setImage] = useState(null);


    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value});
    };

    const handleImageUpload = (e) => {
      setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      //upload image to firebase storage
      if (image) {
        const storageRef = ref(storage, `profileImages/${userId}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
  
        uploadTask.on(
          'state_changed',
          null,
          (error) => console.error('Upload failed:', error),
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await saveProfile(downloadURL);
          }
        );
      } else {
        await saveProfile(profile.imageUrl);
      }
    };

    // const handleSubmit = async (e) => {
    //   e.preventDefault();
    
    //   // Upload image to Firebase Storage if image is provided
    //   if (image) {
    //     const storageRef = ref(storage, `profileImages/${userId}`);
    //     const uploadTask = uploadBytesResumable(storageRef, image);
    
    //     uploadTask.on('state_changed',
    //       (snapshot) => {
    //         // Handle the progress of the upload if needed
    //       },
    //       (error) => {
    //         console.error("Upload failed:", error);
    //       },
    //       async () => {
    //         // Get the uploaded image's download URL
    //         const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    
    //         // Save profile data (including image URL) to Firestore
    //         try {
    //           await setDoc(doc(db, "users", userId), {
    //             firstName: profile.firstName,
    //             lastName: profile.lastName,
    //             email: profile.email,
    //             imageUrl: downloadURL,  // Save image URL to Firestore
    //           });
    
    //           console.log("Profile saved successfully!");
    //         } catch (error) {
    //           console.error("Error saving profile to Firestore:", error);
    //         }
    //       }
    //     );
    //   } else {
    //     // If no image is uploaded, save just the text data to Firestore
    //     try {
    //       await setDoc(doc(db, "users", userId), {
    //         firstName: profile.firstName,
    //         lastName: profile.lastName,
    //         email: profile.email,
    //         imageUrl: '',  // No image URL
    //       });
    
    //       console.log("Profile saved successfully (without image)!");
    //     } catch (error) {
    //       console.error("Error saving profile to Firestore:", error);
    //     }
    //   }
    // };

    // const saveProfile = async (imageUrl) => {
    //   await setDoc(doc(db, 'users', userId), {
    //     ...profile,
    //     imageUrl
    //   });
    // };
    const saveProfile = async (imageUrl) => {
      if (!userId) {
        console.error("userId is undefined");
        return;
      }
      
      if (!profile) {
        console.error("Profile data is missing");
        return;
      }
    
      try {
        // Using setDoc with merge: true to update the document if it exists or create it if it doesn't
        await setDoc(doc(db, 'users', userId), {
          ...profile,
          imageUrl
        }, { merge: true });  // merge: true ensures that existing fields are preserved
    
        console.log("Profile saved/updated successfully");
      } catch (error) {
        console.error("Error saving profile:", error);
      }
    };



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

    

  return (
    <div className='appbg p-[var(--spmob)] md:p-[var(--sp)]  '>
       <div className='bg-white rounded-lg py-4 px-3 text-start flex flex-col gap-5   '>
        <div className="profile__header">
        <h2 className='mont text-lg md:text-xl font-semibold  '>Profile Details</h2>
        <p className='merri text-sm md:text-base my-2  ' >Add your details to create personal touch of your profile</p>
        </div>

            {/* <div className="top bg-[var(--light-ash)] rounded-lg py-4 px-3  ">

            <div className="profile-picture ">
  <h2 className="text-sm md:text-base mont font-bold mb-4">Profile Picture</h2>

  <div className="image-preview mb-4">
     {image ? (
      <img
        src={image}
        alt="Profile"
        className="profile-img rounded-xl w-32 h-32 object-cover border-2 border-[var(--ash)]"
      />
    ) : (
      <div className="placeholder w-32 h-32 bg-[var(--ash)] rounded-xl flex items-center justify-center flex-col text-white ">
        Add image
        <PhotoSizeSelectActualIcon />
      </div>
    )}
  </div>

  <input
    type="file"
    accept="image/*"
    onChange={handleImageChange}
    className="block mb-4"
  />

   {image && (
    <button
      onClick={removeImage}
      className="remove-btn bg-[var(--ash)] text-white px-4 py-2 rounded"
    >
      Remove Profile Picture
    </button>
  )} 
</div>


            </div> */}

            <div className="bottom  items-start bg-[var(--light-ash)] rounded-lg py-4 px-3   ">
                <form className='flex flex-col gap-6' onSubmit={handleSubmit} >
                  
                  <div className="top bg-white rounded-lg py-4 px-3  ">
                  <div className="profile-picture ">
                  <h2 className="text-sm md:text-base mont font-bold mb-4">Profile Picture</h2>
                  <input type="file" onChange={handleImageUpload} />
                  </div>


                  <div className="image-preview mb-4">

   {profile ? (
                  <img
                  src={profile.imageUrl}
                  alt="Profile"
                  className="profile-img  rounded-xl mt-4 w-32 h-32 object-cover border-2 border-[var(--blue)]   "
                  width={100} height={100} 
                />
    ) : (
      <div className="placeholder w-32 h-32 bg-[var(--ash)] rounded-xl flex items-center justify-center flex-col text-white ">
        Add image
        <PhotoSizeSelectActualIcon />
      </div>
    )} 
  </div>
                  </div>
               

                <div className='flex flex-col item-start  '>
                        <label  className='text-black mont font-semibold text-sm md:text-base' >First name*</label>
                        <input type="text" placeholder='Enter your first name' className=' bg-white border-[1px] border-[var(--ash)] rounded-lg py-2 px-2 mt-2 text-black outline-none '  name="firstName"  value={profile.firstName}
          onChange={handleChange} />

                    </div>

                    <div className='flex flex-col item-center  '>
                         <label  className='text-black mont font-semibold text-sm md:text-base' >Last name*</label>
                        <input type="text" placeholder='Enter your last name' className=' bg-white border-[1px] border-[var(--ash)] rounded-lg py-2 px-2 mt-2 text-black outline-none ' 
                        name="lastName"
                        value={profile.lastName}
                        onChange={handleChange}
                        />
                    </div>

                    <div className='flex flex-col'>
                        <label className='text-black mont font-semibold text-sm md:text-base'  >Email*</label>
                        <input type="email" placeholder='Enter your email' className=' bg-white border-[1px] border-[var(--ash)] rounded-lg py-2 px-2 mt-2  text-black outline-none '
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                         />
                    </div>

                    <div className=' '>
                <button className=' bg-[var(--blue)] text-lg md:text-xl mont font-medium rounded-lg px-4 py-2 w-full text-white hover:bg-white hover:text-[var(--blue)] '  type='submit'  >Save</button>
            </div>
                </form>

            </div>


       </div>
    </div>
  )
}

export default ProfileDetails