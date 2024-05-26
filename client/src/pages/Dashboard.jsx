import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';
import DashComments from '../components/DashComments';

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

      {/* {users} */}
      {tab === 'users' && (
        <DashUsers />
      )}

      {/* {posts} */}
      {tab === 'posts' && (
        <DashPosts />
      )}

      {/* {Comments} */}
      {tab === 'comments' && (
        <DashComments />
      )}
      
    </div>
  )
}

export default Dashboard