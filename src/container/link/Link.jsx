import React from 'react'
import links from '../../component/links/links'
import { useState } from 'react'
import { db } from '../../firebase'; // Assuming Firebase setup is done in this file
import { collection, addDoc } from 'firebase/firestore'; 
import { auth } from '../../firebase';
import { Icon } from '@iconify/react/dist/iconify.js';


const Link = ({ onAddLink }) => {
  // const [platform, setPlatform] = useState('GitHub');
  //   const [link, setLink] = useState('');
    const [links, setLinks] = useState([
      { platform: 'GitHub', link: '' }
    ]);

    const user = auth.currentUser;
    const userId = user ? user.uid : null;
  

    // const handleAddLink = () => {
    //   onAddLink({ platform, link });
    //   setLink(''); // Reset input after adding link
    // };

    const handlePlatformChange = (index, value) => {
      const newLinks = [...links];
      newLinks[index].platform = value;
      setLinks(newLinks);
    };
  
    const handleLinkChange = (index, value) => {
      const newLinks = [...links];
      newLinks[index].link = value;
      setLinks(newLinks);
    };
  
    const handleAddLink = () => {
      setLinks([...links, { platform: 'GitHub', link: '' }]);
    };

    const handleRemoveLink = (index) => {
      const newLinks = links.filter((_, i) => i !== index); // Remove the link by index
      setLinks(newLinks);
    };
  
    const handleSave = async () => {
      // try {
      //   await Promise.all(links.map((link) => {
      //     if (link.link !== ''  && link.platform) { // Ensure we don't save empty links
      //       // Save to Firebase: platform and link
      //       return addDoc(collection(db, 'userLinks', userId, 'links'), {
      //         platform: link.platform,
      //         link: link.link,
      //       });
      //     }
      //     return Promise.resolve();
      //   }));
      //   alert('Links saved successfully!');
      // } catch (error) {
      //   console.error('Error saving links:', error);
      //   alert('Error saving links');
      // }

      try {
      //   await Promise.all(links.map(async (link) => {
      //     if (link.link !== '' && link.platform) {
      //       // Save to Firebase: platform and link
      //       return await addDoc(collection(db, 'userLinks'), {
      //         platform: link.platform,
      //         link: link.link,
      //         userId: userId,  // Ensure you are passing the correct userId
      //         createdAt: new Date(),  // Or use Firestore's server timestamp if needed
      //       });
      //     }
      //   }));
      //   alert('Links saved successfully!');
      // } catch (error) {
      //   console.error('Error saving links: ', error);
      //   alert('Error saving links');
      // }

          // Loop through all the links and save each under the user's subcollection
    await Promise.all(links.map(async (link) => {
      if (link.link !== '' && link.platform !== '') {
        // Save to Firestore under the user's subcollection: users/{userId}/links
        await addDoc(collection(db, 'users', userId, 'links'), {
          platform: link.platform,
          link: link.link,
          createdAt: new Date(),
        });
      }
    }));

    alert('Links saved successfully!');
  } catch (error) {
    console.error('Error saving links:', error);
    alert('Error saving links');
  }
    };

  return (
    <div className="link   appbg p-[var(--spmob)] md:p-[var(--sp)] ">
        <div className='bg-white rounded-lg py-4 px-3 text-start flex flex-col gap-5  '>
            <div>
                <h2 className='mont text-lg md:tex~t-xl font-semibold  ' >Customize your links </h2>
                <p className='merri text-sm md:text-base my-3  ' >Add/edit/remove links below and then share all your profiles with the world!</p>

                <button className=' border-[1px] border-[var(--blue)] rounded-lg text-base md:text-lg mont font-medium mt-4 px-4 py-2 w-full text-[var(--blue)] hover:bg-[var(--blue)] hover:text-white ' onClick={handleAddLink} >+ Add new link </button>
            </div>

            <div className="links">
            <div className="links   ">
        {/* <div className='flex flex-row justify-between items-center  ' >
            <h2 className='mont text-xl font-semibold   '>Link</h2>
            <p className='text-lg font-medium text-[var(--ash)] hover:text-black  '>Remove</p>
        </div> */}

        {/* <div>
            <h5 className='mt-2 text-base mont  ' >Platform</h5>
            <select value={platform} onChange={(e) => setPlatform(e.target.value)} className='mt-2 p-2 rounded-md border-[1px] border-[var(--ash)] mont font-medium w-full outline-none  ' >
                 <option value="GitHub">GitHub</option>
                <option value="YouTube">YouTube</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
            </select>

            
        </div>

        <div>
            <h5  className='mt-2 text-base mont  ' >Link</h5>
            <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Enter link here"
          className='mt-2 p-2 rounded-md border-[1px] border-[var(--ash)] mont font-medium w-full outline-none  '
        />
         <button onClick={handleAddLink}>Add new link</button>
        </div> */}

<div className="link-editor  flex flex-col gap-4  ">
      {links.map((item, index) => (
        <div key={index} className="link-item  bg-[var(--light-ash)] px-6 py-4 rounded-lg  ">

<div className='flex flex-row justify-between gap-4 items-center  ' >
         <div className='flex gap-1 items-center'>
         <Icon icon="mingcute:wave-line" />
         <h2 className='mont text-xl font-semibold   '>Link</h2>
         </div>
            <p  onClick={() => handleRemoveLink(index)} className='text-lg font-medium text-[var(--ash)] hover:text-black  '>Remove</p>
        </div> 

          <div >
          <h5 className='mt-2 text-base mont  ' >Platform</h5>
          <select value={item.platform} onChange={(e) => handlePlatformChange(index, e.target.value)}  className='mt-2 p-2 rounded-md border-[1px] border-[var(--ash)] mont font-medium outline-none w-full  '>
            <option className='w-full text-[12px] ' value="GitHub">GitHub</option>
            <option className='w-full text-[12px] ' value="LinkedIn">LinkedIn</option>
            <option className='w-full text-[12px] ' value="YouTube">YouTube</option>
            <option className='w-full text-[12px] ' value="TikTok ">TikTok </option>
            <option className='w-full text-[12px] ' value="Instagram ">Instagram </option>
            <option className='w-full text-[12px] ' value="Facebook ">Facebook </option>
            <option className='w-full text-[12px] ' value="X ">X </option>
            <option className='w-full text-[12px] ' value="Telegram ">Telegram </option>
            <option className='w-full text-[12px] ' value="WhatsApp ">WhatsApp </option>
            <option className='w-full text-[12px] ' value="Snapchat ">Snapchat </option>
            <option className='w-full text-[12px] ' value="Pinterest ">Pinterest </option>
            
          </select>
          </div>
          

          <h5  className='mt-2 text-base mont  ' >Link</h5>
          <Icon icon="solar:link-line-duotone" className='absolute  ' />
          <input
            type="text"
            value={item.link}
            onChange={(e) => handleLinkChange(index, e.target.value)}
            placeholder="Enter link here"
             className='mt-2 p-2 rounded-md border-[1px] border-[var(--ash)] mont font-medium w-full outline-none  '
          />
        </div>
      ))}


      <button onClick={handleSave} className='bg-[var(--blue)] rounded-md text-white mont py-3 text-lg  '  >Save</button>
    </div>

    </div>
      </div>
        </div>
    </div>
  )
}

export default Link