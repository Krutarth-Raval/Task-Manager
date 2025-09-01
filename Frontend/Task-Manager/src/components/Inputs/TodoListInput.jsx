import React, { useState } from "react";
import { HiMiniPlus, HiOutlineTrash } from "react-icons/hi2";
const TodoListInput = ({ todoList, setTodoList }) => {
  const [option, setOption] = useState("");

  //function to handle adding an option
  const handleAddOption = () => {
    if (option.trim()) {
      setTodoList([...todoList, option.trim()]);
      setOption("");
    }
  };

  //function to handle deleting an option
  const handleDeleteOption = (index) => {
    const updateArr = todoList.filter((_, idx) => idx !== index);
    setTodoList(updateArr);
  };
  return (
    <div>
      {todoList.map((item, index) => (
        <div key={item} className="flex justify-between border border-color bg-color px-3 py-2 rounded-md  mb-3 mt-2">
          <p className="metadata-font-size ">
            <span className="small-font-size text-color-light font-semibold mr-2">{index < 9 ? `0${index + 1}` : index + 1}</span>
            {item}
          </p>

          <button className="cursor-pointer" onClick={() => handleDeleteOption(index)}>
            <HiOutlineTrash className="description-font-size text-red-500" />
          </button>
        </div>
      ))}

      <div className="flex items-center gap-5 mt-4 ">
        <input
          type="text"
          placeholder="Enter Task"
          value={option}
          onChange={({ target }) => setOption(target.value)}
          className="w-full small-font-size outline-none bg-color border-1 border-surface px-3 py-2 rounded-md "
        />
        <button className="card-btn text-nowrap px-2 py-1.5" onClick={handleAddOption}>
            <HiMiniPlus className="description-font-size" /> Add
        </button>
      </div>
    </div>
  );
};

export default TodoListInput;
