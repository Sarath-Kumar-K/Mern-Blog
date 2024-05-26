import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {deleteUserFailure} from '../redux/user/userSlice'
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
import DeleteModal from "./DeleteModal";


const DashComments = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [deleteModal, showDeleteModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments`,{
            method:'GET'
        });
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          if (data.comments.length < 5) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchComments();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = comments.length;

    const res = await fetch(
      `/api/comment/getcomments?startIndex=${startIndex}`
    );
    const data = await res.json();
    if (res.ok) {
      setComments((prev) => [...prev, ...data.comments]);
      if (data.comments.length < 9) {
        setShowMore(false);
      }
    }
  };

  const handleDeleteComment = async () => {
    showDeleteModal(false);
    try {
      const res = await fetch(
        `/api/comment/deletecomment/${commentIdToDelete}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setComments((prev) => prev.filter((comment) => comment._id !== commentIdToDelete));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <div className="table-auto w-full overflow-x-scroll p-3 md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && comments.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Comment content</Table.HeadCell>
              <Table.HeadCell>No of Likes</Table.HeadCell>
              <Table.HeadCell>PostId</Table.HeadCell>
              <Table.HeadCell>UserId</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {comments.map((comment) => (
              <Table.Body className="divide-y" key={comment._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(comment.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`#`}>
                      {comment.content}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`#`}>
                      {comment.numberOfLikes}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    {comment.postId}
                  </Table.Cell>
                  <Table.Cell>
                    {comment.userId}
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        showDeleteModal(true);
                        setCommentIdToDelete(comment._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full py-7 self-center text-sm text-teal-500 hover:underline"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p className="text-center text-red-500 text-xl"> You have no comments yet! </p>
      )}
      {deleteModal && (
        <DeleteModal onCancel={showDeleteModal} onDelete={handleDeleteComment} term='comment'/>
      )}
    </div>
  );
};

export default DashComments;
