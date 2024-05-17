import React, { useState } from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import { Alert, Button, Textarea } from 'flowbite-react'

const CommentSection = ({postId}) => {
    const {currentUser} = useSelector(state => state.user);
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            setCommentError(null);
            const res = await fetch('/api/comment/create', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({content:comment,postId,userId:currentUser._id}),
            });

            const data = await res.json();
            console.log(data);
            if(res.ok){
                setCommentError(null);
                setComment('');
            }else{
                setCommentError(data.message);
            }
        }catch(error){
            console.log(error);
            setCommentError('unable to post the comment');
        }
    }
  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
        {currentUser ? (
            <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
                <p>Signed in as:</p>
                <img className='h-5 w-5 object-cover rounded-full' src={currentUser.profilePicture} alt="" />
                <Link className='text-xs text-cyan-500 hover:underline' to={`/dashboard?tab=profile`}>
                    @{currentUser.username}
                </Link>
            </div>
        ):(
            <div className='flex gap-1 text-sm text-red-500'>
                You must be signed in to comment.
                <Link className='text-teal-500 hover:underline' to={'/signin'}>Sign In</Link>
            </div>
        )}
        {currentUser && (
            <form onSubmit={handleSubmit} className='p-3 border border-teal-500 rounded-md' >
                <Textarea
                placeholder='Add a comment...'
                rows={3}
                maxLength='200'
                value={comment}
                onChange={(e) => setComment(e.target.value)} />
                <div className='flex justify-between items-center mt-5'>
                    <p className='text-gray-500 text-xs'>{200 - comment.length} characters remaining</p>
                    <Button type='submit' outline gradientDuoTone='purpleToBlue'>Submit</Button>
                </div>
                {commentError && (
                <Alert className='mt-5' color='failure'>{commentError}</Alert>
            )}
            </form>
        )}
    </div>
  )
}

export default CommentSection