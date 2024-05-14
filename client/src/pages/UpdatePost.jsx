import React, { useEffect, useState } from "react";
import { TextInput, Button, Select, FileInput, Alert } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const UpdatePost = () => {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);

  const navigate = useNavigate();
  const {postId} = useParams();
  const {currentUser} = useSelector(state => state.user);

  console.log(formData);

  useEffect(()=>{
    try{
      setPublishError(null);
      const fetchPost = async () => {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if(!res.ok){
          setPublishError(data.message);
          return;
        }
        if(res.ok){
          setPublishError(null);
          setFormData(data.posts[0])
        }
      };
      fetchPost();
    }catch(error){
      console.log(error.message);
    }
  },[postId])

  const handleImageUpload = () => {
    try {
      if (!file) {
        setImageUploadError("No file is choosen");
        return;
      }
      const storage = getStorage(app);
      const filename = new Date().getTime() + file.name;
      const storageRef = ref(storage, filename);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setImageUploadError(null);
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError(
            "Upload only images(.png,.jpg,.jpeg) with size less than 2mb"
          );
          console.log(error);
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageURL(downloadURL);
            setFormData({ ...formData, image: downloadURL });
            setImageUploadProgress(null);
            setImageUploadError(null);
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed. Try again!");
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPublishError(null);

    try {
      setPublishError(null);
      const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message + " res is not ok");
        return
      }else{
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError("failed to post" + " " + error.message);
    }
  };

  return (
    <div className="p-3 mx-auto min-h-screen max-w-3xl">
      <h3 className="my-7 text-center text-3xl font-bold">Update post</h3>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row">
          <TextInput
            className="w-full flex-1"
            id="title"
            placeholder="Title"
            required
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            defaultValue={formData.title}
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            value={formData.category}
          >
            <option value="uncategorised">Select a Category</option>
            <option value="javascript">Javascript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            outline
            size="sm"
            onClick={handleImageUpload}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.image && (
          <img src={formData.image} className="w-full h-72 object-cover" />
        )}
        <ReactQuill
          theme="snow"
          className="h-72 sm:mb-12 mb-16"
          required
          placeholder="Write something..."
          onChange={(value) =>
            setFormData({ ...formData, content: value })
          }
          value={formData.content}
        />
        {publishError && <Alert color="failure">{publishError}</Alert>}
        <Button type="submit" gradientDuoTone="purpleToPink">
          Update post
        </Button>
      </form>
    </div>
  );
};

export default UpdatePost;
