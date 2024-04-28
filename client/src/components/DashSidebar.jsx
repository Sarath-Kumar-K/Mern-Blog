import React, { useEffect, useState } from "react";
import { FaUser, FaArrowRightLong } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";

const DashSidebar = () => {
  const [tab, setTab] = useState("");
  const location = useLocation();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    setTab(tabFromUrl);
  }, [location.search]);
  return (
    <div className="md:mt-12 flex flex-col gap-4">
      <Link to="/dashboard?tab=profile">
        <div
          className="mx-4 relative md:w-48 w-full py-1 rounded-md hover:bg-gray-200 dark:hover:bg-slate-700 active:bg-slate-700 cursor-pointer"
          active={String(tab === "profile")}
        >
          <FaUser className="inline ml-4" />
          <p className="ml-4 inline">Profile </p>
          <p className="inline absolute md:right-1 right-10 mt-1 text-xs text-white bg-black rounded-md px-2">
            User
          </p>
        </div>
      </Link>
      <div className="mx-4 md:w-48 w-full py-1 rounded-md hover:bg-gray-100 cursor-pointer dark:hover:bg-slate-700">
        <FaArrowRightLong className="inline ml-4" />
        <p className="ml-4 inline">Sign Out</p>
      </div>
    </div>
  );
};

export default DashSidebar;
