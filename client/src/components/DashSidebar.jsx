import React, { useEffect, useState } from "react";
import { FaUser, FaArrowRightLong } from "react-icons/fa6";
import { HiDocumentText } from "react-icons/hi";
import { HiUserGroup } from "react-icons/hi2";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
import { useSelector } from "react-redux";

const DashSidebar = () => {
  const [tab, setTab] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();
  const {currentUser} = useSelector((state) => state.user);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    setTab(tabFromUrl);
  }, [location.search]);

  const handleSignout = async()=>{
    try{
      const res = await fetch('/api/user/signout',{
        method:'POST'
      });
      const data = await res.json();
      if(!res.ok){
        console.log(data.message);
      }else{
        dispatch(signoutSuccess()); 
      }
    }catch(error){
      console.log(error);
    }
  }
  return (
    <div className="md:mt-12 flex flex-col gap-8">
      {/* profile section */}
      <Link to="/dashboard?tab=profile">
        <div
          className="mx-4 relative md:w-48 w-full py-1 rounded-md hover:bg-gray-200 dark:hover:bg-slate-700 active:bg-slate-700 cursor-pointer"
        >
          <FaUser size={25} className="inline ml-4" />
          <p className="ml-4 inline text-lg">Profile </p>
          <p className="inline absolute md:right-1 right-10 mt-1 text-xs text-white bg-gray-600 dark:bg-slate-900 rounded-md px-2 py-[2px]">
           {currentUser.isAdmin? 'Admin':'User'}
          </p>
        </div>
      </Link>
      {/* posts section */}
      {currentUser.isAdmin && (
        <Link to='/dashboard?tab=posts'>
        <div className="mx-4 md:w-48 w-full py-1 rounded-md hover:bg-gray-200 cursor-pointer dark:hover:bg-slate-700">
          <HiDocumentText  size={25} className="inline ml-4" />
          <p className="ml-4 inline text-lg">Posts</p>
        </div>
        </Link>
      )}
      {/* users section */}
      {currentUser.isAdmin && (
        <Link to='/dashboard?tab=users'>
        <div className="mx-4 md:w-48 w-full py-1 rounded-md hover:bg-gray-200 cursor-pointer dark:hover:bg-slate-700">
          <HiUserGroup  size={25} className="inline ml-4" />
          <p className="ml-4 inline text-lg">Users</p>
        </div>
        </Link>
      )}
      {/* signout section */}
      <div className="mx-4 md:w-48 w-full py-1 rounded-md hover:bg-gray-200 cursor-pointer dark:hover:bg-slate-700">
        <FaArrowRightLong size={25} className="inline ml-4" />
        <p className="ml-4 inline text-lg" onClick={handleSignout}>Sign out</p>
      </div>
    </div>
  );
};

export default DashSidebar;
