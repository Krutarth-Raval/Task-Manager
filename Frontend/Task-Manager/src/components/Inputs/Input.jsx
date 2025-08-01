import React, { useState } from "react";
import {EyeClosed, Eye} from "lucide-react"

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <label className="">{label}</label>
      <div className="relative">
        <input
          type={
            type == "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          className="bg-surface sm:w-[300px] w-70 mt-1 sm:mt-2 p-2 rounded-md input-style metadata-font-size"
          value={value}
          onChange={(e) => onChange(e)}
        />
        <div className="sm:pt-2 pt-1">
           {type === "password" && (
          <div className=" absolute top-[50%] -translate-y-[50%] right-[4px]  p-1 rounded-md">
            {showPassword ? (
              <Eye
                size={22}
                className=" cursor-pointer"
                onClick={() => toggleShowPassword()}
              />
            ) : (
              <EyeClosed
                size={22}
                className="cursor-pointer"
                onClick={() => toggleShowPassword()}
              />
            )}
          </div>
        )}
        </div>
       
      </div>
    </div>
  );
};

export default Input;
