import React from 'react'
import { useState, useEffect } from 'react';
import { getDoc, getDocs, doc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { auth } from '../../firebase';
import { NavLink, useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';


const Profile = ({links}) => {
    const [profile, setProfile] = useState(null);
    const [shareLink, setShareLink] = useState('');
    const [linkCopied, setLinkCopied] = useState(false);
    // const {userId} = useParams();
    const user = auth.currentUser;
    const userId = user ? user.uid : null;

    const navigate = useNavigate();

    const [userLinks, setUserLinks] = useState([]);
    console.log(userLinks);  // Debugging step to check the data

    // useEffect(() => {
    //     const fetchProfile = async () => {
    //       if (!userId) {
    //         console.error("userId is undefined");
    //         return;
    //       }

    //       const docRef = doc(db, 'users', userId);
    //       const docSnap = await getDoc(docRef);
    
    //       if (docSnap.exists()) {
    //         setProfile(docSnap.data());
    //       } else {
    //         console.log('No such document!');
    //       }
    //     };

    //         const fetchLinks = async () => {
    //   try {
    //     const linksCollection = collection(db, 'userLinks', userId, 'links');
    //     const linkSnapshot = await getDocs(linksCollection);
    //     const linksList = linkSnapshot.docs.map((doc) => doc.data()); // Map over each doc to get data
    //     setUserLinks(linksList);
    //   } catch (error) {
    //     console.error('Error fetching user links: ', error);
    //   }
    // };
    
    //     fetchProfile().then(() => {
    //       fetchLinks();
    //     });
    //   }, [userId]);
    
    useEffect(() => {
      const fetchProfileAndLinks = async () => {
        if (!userId) {
          console.error('userId is undefined');
          return;
        }
    
        try {
          // Fetch profile
          const docRef = doc(db, 'users', userId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setProfile(docSnap.data());
          } else {
            console.log('No such document!');
          }
    
          // Fetch links
          const linksCollection = collection(db, 'users', userId, 'links');
          const linkSnapshot = await getDocs(linksCollection);
          const linksList = linkSnapshot.docs.map((doc) => doc.data());
          setUserLinks(linksList);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      fetchProfileAndLinks();
    }, [userId]);
    

      if (!profile) {
        return <div>Loading...</div>;
      };

        // Fetch the user's links from Firebase
  // useEffect(() => {
  //   const fetchLinks = async () => {
  //     try {
  //       const linksCollection = collection(db, 'userLinks', userId, 'links');
  //       const linkSnapshot = await getDocs(linksCollection);
  //       const linksList = linkSnapshot.docs.map((doc) => doc.data()); // Map over each doc to get data
  //       setUserLinks(linksList);
  //     } catch (error) {
  //       console.error('Error fetching user links: ', error);
  //     }
  //   };

  //   fetchLinks();
  // }, [userId]);
    


   // Function to generate the shareable link
   const generateShareLink = () => {
    if (!userId) {
      console.error('No user ID found.');
      return;
    }
    // Replace with your app's URL and profile route
    const profileUrl = `${window.location.origin}/profile/${userId}`;
    setShareLink(profileUrl);
    setLinkCopied(false); // Reset the copied state
  };

  // Function to copy the link to the clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    setLinkCopied(true); // Update state to show success message
  };

  return (
    <div className="profile p-[var(--spmob)] md:p-[var(--sp)]   ">

        <div className=' flex justify-between items-center  '>
        <NavLink to="/link ">
 <button className='text-[var(--blue)] bg-white border-[1px] border-[var(--blue)] mont rounded-lg py-2 px-4 text-base   '  >Back to Editor </button>
        </NavLink>
           
            <button className='text-white bg-[var(--blue)]  mont rounded-lg py-2 px-4 text-base   ' onClick={generateShareLink}  >Share Link  </button>

        </div>

        <div>
          {/* If shareLink exists, display the input box with the shareable link */}
    {shareLink && (
        <div className="share-link mt-4 flex items-center">
          <input 
            type="text"
            value={shareLink}
            readOnly
            className="share-input border-2 border-gray-300 p-2 rounded-md w-full"
          />
          <button 
            className="copy-btn bg-[var(--blue)] text-white rounded-lg px-4 py-2 ml-2"
            onClick={copyToClipboard}
          >
            Copy
          </button>
        </div>
      )}

      {/* Display success message when the link is copied */}
      {linkCopied && (
        <p className="text-green-500 mt-2">Link copied to clipboard!</p>
      )}

      {/* Your existing profile rendering logic here */}
      {/* Display user profile image, name, and links */}
        </div>

        <div className='flex flex-col justify-center items-center mt-12 '>
                {/* {image ? ( */}
      <img
        src={profile.imageUrl}
        alt="Profile"
        className="profile-img rounded-full w-32 h-32 object-cover border-2 border-[var(--blue)] "
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


        <div className='link-display   '>
        <div className="link-list">
       {/* {userLinks.map((link, index) => (
          <div key={index} className="link-item bg-[var(--blue)] px-6 py-6  ">
            <a href={link.link} target="_blank" rel="noopener noreferrer">
              Display the platform and link
              {link.platform}: {link.link}
            </a>
          </div>
        ))}  */}

   {/* Conditional rendering to ensure links are displayed if available */}
   {userLinks.length > 0 ? (
        <div className="link-display mt-8  ">
          <div className="link-list flex flex-col gap-3  ">
            {userLinks.map((link, index) => (
              <div key={index} className="link-item bg-[var(--blue)] rounded-md text-white  p-3 mont text-base md:text-lg   ">
                <a href={link.link} target="_blank" rel="noopener noreferrer">
                  {link.platform}
                </a>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className='mt-[3rem] mont text-1xl font-semibold  ' >No links to display</div>
      )}

      </div>
        </div>



    </div>
  )
}

export default Profile