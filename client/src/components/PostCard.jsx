import React from 'react'
import { Link } from 'react-router-dom'


const PostCard = ({post}) => {
  return (
    <div className='group relative overflow-hidden h-[400px] w-full border border-teal-500 rounded-lg sm:w-[430px] transition-all'>
        <Link to={`/post/${post.slug}`}>
            <img className='h-[300px] w-full object-cover group-hover:h-[260px] transition-all duration-300 z-20' src={post.image} alt="image cover" />
        </Link>
        <div className='p-3 flex flex-col gap-2'>
            <p className='text-lg font-semibold line-clamp-1'>{post.title}</p>
            <span className='italic text-sm mb-4'>{post.category}</span>
            <Link className='z-10 bottom-[-200px] group-hover:bottom-0 absolute left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2' to={`/post/${post.slug}`}>
                Read article
            </Link>
        </div>
    </div>
  )
}

export default PostCard