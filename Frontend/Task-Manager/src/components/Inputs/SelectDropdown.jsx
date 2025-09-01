import React, { useState } from "react";
import { LucideChevronDown } from "lucide-react";
const SelectDropdown = ({ option, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };
  return (
    <div className="relative w-full ">
      {/* Dropdown button */}
      <button onClick={() => setIsOpen(!isOpen)} className="w-full small-font-size outline-none bg-color  px-2 py-[7px] rounded-md mt-2 flex justify-between items-center">
        {value ? option.find((opt) => opt.value === value)?.label : placeholder}
        <span className="ml-2">
          {isOpen ? <LucideChevronDown className="rotate-180" /> : <LucideChevronDown />}
        </span>
      </button>
      {/* dropdown menu */}
      {isOpen && (
        <div className="absolute w-full bg-color border border-[var(--primary-color)] rounded-md mt-1 shadow-md z-10">
          {option.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="px-3 py-2 bg-color small-font-size cursor-pointer hover:bg-[var(--background-surface)] rounded-md"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectDropdown;
