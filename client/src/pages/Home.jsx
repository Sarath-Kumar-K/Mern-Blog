import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import PostCard from '../components/PostCard';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    const fetchPosts = async () => {
      const res = await fetch(`/api/post/getposts`);
      const data = await res.json();
      if(res.ok){
        setPosts(data.posts);
      }
    }
    fetchPosts();
  },[])
  return (
    <div className=''>
      <div className='flex flex-col gap-6 p-28 px-3 mx-auto max-w-6xl'>
        <h1 className='text-3xl lg:text-6xl font-bold'>Welcome to my Blog</h1>
        <p className='text-xs lg:text-sm text-gray-500'>Here you'll find a variety of articles and tutorials on topics such as Web development, Software engineering and programming languages</p>
        <Link to={`/search`} className='text-xs sm:text-sm text-teal-500 hover:underline font-bold'>View all posts</Link>
      </div>
      {/* call to action */}
      <div className='p-3 bg-amber-100 dark:bg-slate-700'>
        <CallToAction />
      </div>
      <div className='p-3 py-7 flex flex-col gap-8 max-w-6xl mx-auto'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-center text-2xl font-semibold'>Recent Posts</h2>
            <div className='flex flex-wrap gap-4'>
              {posts.map((post)=>(
                <PostCard key={post._id} post={post}/>
              ))}
            </div>
            <Link to={`/search`} className='text-center text-lg text-teal-500 hover:underline'>View all posts</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home