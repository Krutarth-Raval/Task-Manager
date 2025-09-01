import React from "react";

const DeleteAlert = ({ content, onDelete }) => {
  return (
    <div className="">
      <p className="small-font-size">{content}</p>

      <div className="flex justify-end">
        <button className="flex items-center justify-center gap-1.5 small-font-size  font-medium text-rose-500 whitespace-nowrap bg-rose-50 border border-rose-100 rounded-lg px-4 py-2 cursor-pointer" type="button" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
