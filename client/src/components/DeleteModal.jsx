import React from "react";
import { Button } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const DeleteModal = ({onCancel, onDelete, term}) => {
  return (
    <div
      onClick={()=>onCancel(false)}
      className="fixed inset-0 z-10 backdrop-brightness-50 overflow-hidden"
    >
      <div className="absolute md:top-[30vh] md:left-[40vw]  m-5 z-20 rounded-md border-2 bg-white">
        <HiOutlineExclamationCircle className="my-5 mx-auto h-14 w-14 text-gray-400 dark:text-gray-200" />
        <h3 className="md:px-8 text-lg text-center mb-5 dark:text-gray-400 text-gray-500">
          {`Are you sure you want to delete this ${term}`}
        </h3>
        <div className="flex justify-center gap-5 mb-5">
          <Button color="failure" onClick={()=>onDelete()}>
            Yes, I'm sure
          </Button>
          <Button color="gray" onClick={()=>onCancel(false)}>
            No, cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
