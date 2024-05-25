import React, { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Button, Textarea } from "flowbite-react";

const Comment = ({ comment, onLike, onEdit, onDelete }) => {
  const [user, setUser] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const [editing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  // console.log(user);
  useEffect(() => {
    const getUser = async () => {
      if (!comment || !comment.userId) return;
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [comment]);

  if (!comment) {
    return null;
  }

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editcomment/${comment._id}`,{
        method:'PUT',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({
          content:editedContent
        })
      });

      if(res.ok){
        setEditing(false);
        onEdit(comment,editedContent);
      }else{
        console.log('error in fetching the api');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          className="w-10 h-10 rounded-full object-cover bg-gray-200"
          src={user.profilePicture}
          alt=""
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="text-xs mr-1 font-bold truncate">
            {user ? `@${user.username}` : "anonymous user"}
          </span>
          <span className="text-xs font-sans text-gray-500">
            {moment(comment && comment.createdAt).fromNow()}
          </span>
        </div>
        {!editing ? (
          <>
            <p className="text-gray-500 pb-2">{comment && comment.content}</p>
            <div className="flex gap-4 items-center text-gray-500 mt-3">
              <div className="flex gap-1 items-center">
                <button
                  type="button"
                  className={`hover:text-blue-500 ${
                    currentUser &&
                    comment.likes.includes(currentUser._id) &&
                    "text-blue-500"
                  }`}
                  onClick={() => onLike(comment._id)}
                >
                  <FaThumbsUp size={18} />
                </button>
                <p className="text-gray-400">
                  {comment.numberOfLikes &&
                    comment.numberOfLikes > 0 &&
                    comment.numberOfLikes +
                      " " +
                      (comment.numberOfLikes === 1 ? "like" : "likes")}
                </p>
              </div>
              {currentUser && currentUser._id === comment.userId && (
                <button type="button" onClick={()=>setEditing(true)} className="">
                  Edit
                </button>
              )}
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <button type="button" onClick={()=>onDelete(comment._id)} className="">
                    Delete
                  </button>
                )}
            </div>
          </>
        ) : (
          <>
            <Textarea
              className="mb-2"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="flex justify-end gap-2 text-xs">
              <Button onClick={handleSave} size='sm' gradientDuoTone='purpleToBlue'>Save</Button>
              <Button onClick={()=>setEditing(false)} size='sm' gradientDuoTone='purpleToBlue' outline>Cancel</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;
