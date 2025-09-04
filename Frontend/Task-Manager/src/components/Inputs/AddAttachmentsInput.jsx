import React, { useState } from "react";
import { HiMiniPlus, HiOutlineTrash } from "react-icons/hi2";
import { LuPaperclip } from "react-icons/lu";

const AddAttachmentsInput = ({ setAttachments, attachments }) => {
  const [ option, setOption ]= useState("");

  //function to handle adding an option
  const handleAddOption = () => {
    if (option.trim()) {
      setAttachments([...attachments, option.trim()]);
      setOption("");
    }
  };

  //function to handle deleting an option
  const handleDeleteOption = (index) => {
    const updateArr = attachments.filter((_, idx) => idx !== index);
    setAttachments(updateArr);
  };

  return (
    <div>
      {attachments.map((item, index) => (
        <div
          key={item}
          className="flex justify-between  border border-color bg-color px-3 py-2 rounded-md mb-3"
        >
          <div className="flex-1 flex items-center gap-3 ">
            <LuPaperclip className="text-color-light" />
            <p className="small-font-size ">{item}</p>
          </div>

          <button
            className="cursor-pointer"
            onClick={() => handleDeleteOption(index)}
          >
            <HiOutlineTrash className="description-font-size text-red-500" />
          </button>
        </div>
      ))}

      <div className="flex items-center gap-5 mt-4">
        <div className="flex-1 flex items-center gap-3 border border-surface rounded-md px-3 ">
          <LuPaperclip className="text-color-primary " />

          <input
            type="text"
            placeholder="Add File Link"
            value={option}
            onChange={({ target }) => setOption(target.value)}
            className="w-full metadata-font-size outline-none bg-color py-2 pl-1"
          />
        </div>
        <button
          className="card-btn text-nowrap px-2 py-1.5"
          onClick={handleAddOption}
        >
          <HiMiniPlus className="description-font-size" /> Add
        </button>
      </div>
    </div>
  );
};

export default AddAttachmentsInput;
