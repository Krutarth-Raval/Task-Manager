import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { LucideUsers } from "lucide-react";
import Modal from "../Modal";
import AvatarGroup from "../AvatarGroup";

const SelectUsers = ({ selectedUsers, setSelectedUsers }) => {
  const [allUsers, setAllUsers] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSelectedUsers, setTempSelectedUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
      if (response.data?.length > 0) {
        setAllUsers(response.data);
      }
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  const toggleUserSelection = (userId) => {
    setTempSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleAssign = () => {
    setSelectedUsers(tempSelectedUsers);
    setIsModalOpen(false);
  };

  const selectedUserAvatars = allUsers
    .filter((user) => selectedUsers.includes(user._id))
    .map((user) => user.profileImageUrl);

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (selectedUsers.length === 0) {
      setTempSelectedUsers([]);
    }
    return () => {};
  }, [selectedUsers]);

  return (
    <div className="space-y-4 mt-2 bg-color rounded-md w-max border-color" >
      {selectedUserAvatars.length === 0 && (
        <button
          className="card-btn small-font-size px-3 py-1.5 text-color-light"
          onClick={() => setIsModalOpen(true)}
        >
          <LucideUsers className="small-font-size text-color-light" size={20} /> Add Members
        </button>
      )}

      {selectedUserAvatars.length > 0 && (
        <div className="cursor-pointer" onClick={() => setIsModalOpen(true)}>
          <AvatarGroup avatars={selectedUserAvatars} maxVisible={3} />
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Select Users"
        
      >
        <div className="space-y-4 h-[60vh] overflow-y-auto">
          {allUsers.map((user) => (
            <div
              key={user._id}
              className="flex items-center gap-4 p-3 border-b border-surface"
            >
              <img
                src={user.profileImageUrl || "/default-avatar.png"}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-color-light">{user.email}</p>
              </div>

              <input
                type="checkbox"
                checked={tempSelectedUsers.includes(user._id)}
                onChange={() => toggleUserSelection(user._id)}
                className="w-4 h-4 text-color-primary cursor-pointer rounded-sm outline-none"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-4 pt-4 ">
          <button className="card-btn" onClick={() => setIsModalOpen(false)}>
            CANCEL
          </button>
          <button className="card-btn-fill" onClick={handleAssign}>
            DONE
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SelectUsers;
