import React from 'react'
import { useState } from 'react'

const links = ({ onAddLink, value }) => {
    const [platform, setPlatform] = useState('GitHub');
    const [link, setLink] = useState('');

    const handleAddLink = () => {
        onAddLink({ platform, link });
        setLink(''); // Reset input after adding link
      };
    
    
  return (
    <div className="links bg-[var(--light-ash)] ">
        <div>
            <h2 className='mont '>Link</h2>
            <p>Remove</p>
        </div>

        <div>
            <h5>Platform</h5>
            <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
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
            <h5>Link</h5>
            <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Enter link here"
        />
         <button onClick={handleAddLink}>Add new link</button>
        </div>

    </div>
  )
}

export default links