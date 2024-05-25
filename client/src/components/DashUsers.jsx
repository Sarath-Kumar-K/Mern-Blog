import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {deleteUserFailure} from '../redux/user/userSlice'
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
import {FaCheck, FaTimes} from 'react-icons/fa';
import DeleteModal from "./DeleteModal";


const DashUsers = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [deleteModal, showDeleteModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if (data.posts.length < 5) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;

    const res = await fetch(
      `/api/user/getusers?startIndex=${startIndex}`
    );
    const data = await res.json();
    if (res.ok) {
      setUsers((prev) => [...prev, ...data.users]);
      if (data.users.length < 9) {
        setShowMore(false);
      }
    }
  };

  const handleDeleteUser = async () => {
    showDeleteModal(false);
    try {
      const res = await fetch(
        `/api/user/delete/${userIdToDelete}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUsers((prev) => prev.filter((post) => post._id !== userIdToDelete));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <div className="table-auto w-full overflow-x-scroll p-3 md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date Created</Table.HeadCell>
              <Table.HeadCell>User Image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              {/* <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell> */}
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {users.map((user) => (
              <Table.Body className="divide-y" key={user._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(user.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`#`}>
                      <img
                        src={user.profilePicture}
                        alt='profile'
                        className="w-10 h-10 rounded-full object-cover bg-grsy-500"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    {user.username}
                  </Table.Cell>
                  <Table.Cell>
                    {user.email}
                  </Table.Cell>
                  <Table.Cell>{user.isAdmin ? (
                    <FaCheck className="text-green-500" />
                  ):(
                    <FaTimes className="text-red-500"/>
                  )}</Table.Cell>
                  {/* <Table.Cell>
                    <Link to={`/update-post/${post._id}`}>
                      <span className="font-medium text-teal-500 hover:underline cursor-pointer">
                        Edit
                      </span>
                    </Link>
                  </Table.Cell> */}
                  <Table.Cell>
                    <span
                      onClick={() => {
                        showDeleteModal(true);
                        setUserIdToDelete(user._id);
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
        <p className="text-center text-red-500 text-xl"> You have no users yet! </p>
      )}
      {deleteModal && (
        <DeleteModal onCancel={showDeleteModal} onDelete={handleDeleteUser} term='user'/>
      )}
    </div>
  );
};

export default DashUsers;
