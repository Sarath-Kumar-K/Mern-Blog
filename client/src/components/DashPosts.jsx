import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const DashPosts = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [deleteModal, showDeleteModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  console.log(userPosts);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 5) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;

    const res = await fetch(
      `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
    );
    const data = await res.json();
    if (res.ok) {
      setUserPosts((prev) => [...prev, ...data.posts]);
      if (data.posts.length < 9) {
        setShowMore(false);
      }
    }
  };

  const handleDeletePost = async () => {
    showDeleteModal(false);
    try {
      const res = await fetch(
        `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) => {
          prev.filter((post) => post._id !== postIdToDelete);
        });
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <div className="table-auto w-full overflow-x-scroll p-3 md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Data updated</Table.HeadCell>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {userPosts.map((post) => (
              <Table.Body className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-20 h-10 object-cover bg-grsy-500"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      to={`/post/${post.slug}`}
                      className="font-medium text-gray-900 dark:text-white"
                    >
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                    <Link to={`/update-post/${post._id}`}>
                      <span className="font-medium text-teal-500 hover:underline cursor-pointer">
                        Edit
                      </span>
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        showDeleteModal(true);
                        setPostIdToDelete(post._id);
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
        <p className="text-center text-red-500 text-xl"> You have no posts yet! </p>
      )}
      {deleteModal && (
        <div onClick={()=> showDeleteModal(false)} className="fixed inset-0 z-10 backdrop-brightness-50 overflow-hidden">
          <div className="absolute md:top-[30vh] md:left-[40vw]  m-5 z-20 rounded-md border-2 bg-white">
            <HiOutlineExclamationCircle className="my-5 mx-auto h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="md:px-8 text-lg text-center mb-5 dark:text-gray-400 text-gray-500">
              Are you sure you want to delete this post
            </h3>
            <div className="flex justify-center gap-5 mb-5">
              <Button color="failure" onClick={handleDeletePost}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => showDeleteModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashPosts;
