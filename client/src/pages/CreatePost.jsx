import React from "react";
import { TextInput, Button, Select, FileInput } from "flowbite-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
  return (
    <div className="p-3 mx-auto min-h-screen max-w-3xl">
      <h3 className="my-7 text-center text-3xl font-bold">Create a post</h3>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <TextInput className="w-full flex-1" id="title" placeholder="Title" required />
          <Select>
            <option value="uncategorised">Select a Category</option>
            <option value="javascript">Javascript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput type="file" accept="image/*" />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            outline
            size="sm"
          >
            Upload Image
          </Button>
        </div>
        <ReactQuill theme="snow" className="h-72 sm:mb-12 mb-16" required placeholder="Write something..." />
        <Button type="button" gradientDuoTone='purpleToPink'>Publish</Button>   
      </form>
    </div>
  );
};

export default CreatePost;
