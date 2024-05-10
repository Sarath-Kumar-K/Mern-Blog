import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';

const Dashboard = () => {
  const [tab,setTab] = useState('');
  const location = useLocation();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    setTab(tabFromUrl);
  
  },[location.search])
  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
      {/* {sidebar} */}
      <div className=' bg-gray-50 dark:bg-slate-800'>
        <DashSidebar />
      </div>
      {/* {profile} */}
      {tab === 'profile' && (
        <DashProfile />
      )}
      {/* {posts} */}
      {tab === 'posts' && <DashPosts />}
    </div>
  )
}

export default Dashboard