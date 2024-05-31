import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";

const ProfileHeader = () => {
  const { currentUser } = useSelector((state) => state.user);
  const username = "@" + currentUser.username;
  const userEmail = currentUser.email;
  const [toggle, settoggle] = useState(false);
  const dispatch = useDispatch();
  const handleClick = () => {
    settoggle(!toggle);
  };

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="md:mx-5 rounded-full" onClick={handleClick}>
      <img
        className="w-9 mt-0 rounded-full h-fit cursor-pointer"
        src={currentUser.profilePicture}
        alt="😎"
      />
      {toggle && (
        <div className="fixed inset-0 z-10 backdrop-brightness overflow-hidden">
          <div className="max-w-36 md:max-w-48 absolute z-10 shadow-black border-2 border-gray-300 top-14 right-10 rounded-md bg-white dark:bg-slate-700 dark:border-gray-500">
          <p className="px-2 truncate text-sm dark:text-gray-400 text-gray-600">{username}</p>
          <p className="px-2 truncate text-sm dark:text-gray-400 text-gray-600">{userEmail}</p>
          <ol className="">
            <li className="pb-1 mt-2 md:mt-4 px-2 md:px-5 hover:bg-gray-200 dark:hover:bg-slate-900">
              <Link to="/dashboard?tab=profile">Profile</Link>
            </li>
            <li
              className="py-1 px-2 md:px-5 hover:bg-gray-200 dark:hover:bg-slate-900"
              onClick={handleSignout}
            >
              <Link to="#">Signout</Link>
            </li>
          </ol>
        </div>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;
