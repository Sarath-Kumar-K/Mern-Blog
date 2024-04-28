import React from "react";
import {useSelector} from 'react-redux';
import {Button, TextInput} from 'flowbite-react'

const DashProfile = () => {
  const {currentUser} = useSelector(state => state.user);
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-3xl font-semibold text-center">Profile</h1>
      <form action="" className="flex flex-col gap-4">
      <div className="self-center w-32 h-32 rounded-full border-8 border-[lightgray]">
        <img className='w-full h-full object-fit rounded-full' src={currentUser.profilePicture} alt="user" />
      </div>
      <TextInput className='' type="text" id="username" placeholder="username" defaultValue={currentUser.username}/>
      <TextInput className='' type="email" id="email" placeholder="email" defaultValue={currentUser.email}/>
      <TextInput type="password" id="password" placeholder="password"/>
      <Button type="submit" gradientDuoTone='purpleToBlue' outline>Update</Button>
      <div className="flex justify-between mt-2 text-red-500">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
      </form>
    </div>
  );
};

export default DashProfile;
