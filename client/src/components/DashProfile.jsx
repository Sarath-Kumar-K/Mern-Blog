import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Alert, Button, TextInput} from "flowbite-react";
import {Link} from 'react-router-dom';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useDispatch } from "react-redux";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess
} from "../redux/user/userSlice.js";
import {HiOutlineExclamationCircle} from 'react-icons/hi';

const DashProfile = () => {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileURL, setImageFileURL] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(false);
  const [updateUserError, setUpdateUserError] = useState(null);
  // delete modal
  const [deleteModal, showDeleteModal] = useState(false);
  const [formData, setFormData] = useState({});
  console.log(imageFileUploadProgress, imageFileUploadError);
  const filePickerRef = useRef();
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileURL(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploadError(null);
    setImageFileUploading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload Image (File must be less than 2MB)"
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileURL(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileURL(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(false);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError(`No changes made in profile`);
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError(`please wait until image is uploaded`);
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserSuccess(false);
        setUpdateUserError(data.message);
      } else {
        setUpdateUserSuccess(true);
        dispatch(updateSuccess(data));
        setUpdateUserError(null);
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  const handleDeleteUser =async () => {
    showDeleteModal(false);
    try{
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method : 'DELETE',
      });
      const data = await res.json();
      if(!res.ok){
        dispatch(deleteUserFailure(data.message));
      }else{
        dispatch(deleteUserSuccess(data));
      }
    }catch(error){
      dispatch(deleteUserFailure(error.message));
    }
  }

  const handleSignout = async()=>{
    try{
      const res = await fetch('/api/user/signout',{
        method:'POST'
      });
      const data = await res.json();
      if(!res.ok){
        console.log(data.message);
      }else{
        dispatch(signoutSuccess()); 
      }
    }catch(error){
      console.log(error);
    }
  }
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-3xl font-semibold text-center">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="relative self-center w-32 h-32 rounded-full shadow-md overflow-hidden cursor-pointer"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(89, 171, 201,${imageFileUploadProgress / 100})`,
                },
              }}
            />
          )}
          <img
            className={`w-full h-full object-fit rounded-full cursor-pointer border-8 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-60"
            }`}
            src={imageFileURL || currentUser.profilePicture}
            alt="user"
          />
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}
        <TextInput
          className=""
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleFormData}
        />
        <TextInput
          className=""
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleFormData}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          onChange={handleFormData}
        />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline disabled={loading || imageFileUploading}>
          {loading? 'Loading...':'Update'}
        </Button>
        {currentUser.isAdmin && (
          <Link to={'/create-post'}>
            <Button type="button" gradientDuoTone='purpleToPink' className="w-full">Create a post</Button>
          </Link>
        )}
      </form>
      <div className="flex justify-between mt-5 text-red-500">
        <span className="cursor-pointer" onClick={() => showDeleteModal(true)}>
          Delete Account
        </span>
        <span className="cursor-pointer" onClick={handleSignout}>Sign Out</span>
      </div>
      {updateUserSuccess && (
        <Alert
          color="success"
          className="mt-5"
        >{`Profile Updated Successfully!`}</Alert>
      )}
      {updateUserError && (
        <Alert color="failure" className="mt-5">
          {updateUserError}
        </Alert>
      )}
      {deleteModal && (
        <div className="absolute top-0 left-0 z-10 h-full w-full backdrop-brightness-50">
          <div className="absolute md:top-[30vh] md:left-[40vw]  m-5 z-20 rounded-md border-2 bg-white">
            <HiOutlineExclamationCircle className='my-5 mx-auto h-14 w-14 text-gray-400 dark:text-gray-200'/>
            <h3 className="md:px-8 text-lg text-center mb-5 dark:text-gray-400 text-gray-500">Are you sure you want to delete your account</h3>
            <div className="flex justify-center gap-5 mb-5">
              <Button color='failure' onClick={handleDeleteUser}>Yes, I'm sure</Button>
              <Button color='gray' onClick={()=>showDeleteModal(false)}>No, cancel</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashProfile;
