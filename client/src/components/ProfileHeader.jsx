import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProfileHeader = () => {
  const {currentUser} = useSelector(state => state.user);
  const username = '@'+currentUser.username;
  const userEmail = currentUser.email;
  const [toggle,settoggle] = useState(false);
  const handleClick = () =>{
    settoggle(!toggle);
  }
  return (
    <div className='md:mx-5 rounded-full' onClick={handleClick}>
      <img className='w-9 mt-0 rounded-full h-fit cursor-pointer' src={currentUser.profilePicture} alt="😎" />
      {toggle && (
        <div className='max-w-36 md:max-w-48 absolute z-10 shadow-black border-2 border-gray-300 top-14 right-10 rounded-md bg-white'>
        <p className='px-2 truncate text-sm'>{username}</p>
        <p className='px-2 truncate text-sm'>{userEmail}</p>
        <ol className=''>
          <li className='pb-1 mt-2 md:mt-4 px-2 md:px-5 hover:bg-gray-200'><Link to='/dashboard?tab=profile'>Profile</Link></li>
          <li className='py-1 px-2 md:px-5 hover:bg-gray-200'><Link to='#'>Signout</Link></li>
        </ol>
      </div>
      )}
    </div>
  )
}

export default ProfileHeader