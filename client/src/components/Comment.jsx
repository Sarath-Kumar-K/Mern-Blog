import React, { useEffect, useState } from 'react'
import moment from 'moment'


const Comment = ({comment}) => {
    const [user, setUser] = useState({});
    console.log(user);
    useEffect(() => {
        const getUser = async () => {
            try{
                const res = await fetch(`/api/user/${comment.userId}`);
                const data = await res.json();
                if(res.ok){
                    setUser(data);
                }
            }catch(error){
                console.log(error);
            }
        }
        getUser();
    },[comment]);
    
  return (
    <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
        <div className='flex-shrink-0 mr-3'>
            <img className='w-10 h-10 rounded-full object-cover bg-gray-200' src={user.profilePicture} alt="" />
        </div>
        <div className='flex-1'>
            <div className='flex items-center mb-1'>
                <span className='text-xs mr-1 font-bold truncate'>{user ? `@${user.username}`:'anonymous user'}</span>
                <span className='text-xs font-sans text-gray-500'>{moment(comment.createdAt).fromNow()}</span>
            </div>
            <p className='text-gray-500 pb-2'>{comment.content}</p>
        </div>
    </div>
  )
}

export default Comment