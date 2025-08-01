import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";
const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      //Update the image state
      setImage(file);

      //generate preview URL from the file
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return <div className="flex justify-center mb-6">
    <input 
    type="file"
    accept="image/*"
    ref={inputRef}
    onChange={handleImageChange}
    className="hidden"/>

    {!image ? (
        <div className="border-2 h-25 w-25 relative  rounded-full">
            <LuUser className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 " size={50} color="#6fc5ff" />
            <button type="button"
            className="absolute right-0 bottom-0 bg-primary rounded-full cursor-pointer p-1"
            onClick={onChooseFile}>
                <LuUpload size={20}/>
                </button>

        </div>
    ):(
        <div className="relative h-25 w-25 rounded-full  ">
            <img src={previewUrl} className="h-full w-full rounded-full object-cover " alt="profile photo" />
            <button type="button" className="absolute bottom-0 right-0 rounded-full bg-red-700 p-1 cursor-pointer"  onClick={handleRemoveImage}>
                <LuTrash size={20}/>
            </button>
        </div> 
    )
}
  </div>;
};

export default ProfilePhotoSelector;
