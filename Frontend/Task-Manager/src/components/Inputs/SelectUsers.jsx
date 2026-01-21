import React, { useEffect, useState } from "react";
import { API_PATHS, axiosInstance } from "../../utils";
import { LucideUsers, LucideChevronDown, Check, Crown, Shield, Star, Search, X } from "lucide-react";
import Modal from "../Modal";

const SelectUsers = ({ selectedUsers, setSelectedUsers, disabled = false, error = false }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSelectedUsers, setTempSelectedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const getAllUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
      if (response.data?.length > 0) {
        setAllUsers(response.data);
      }
    } catch (error) {
      console.log("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleUserSelection = (userId) => {
    setTempSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleOpenModal = () => {
    if (!disabled) {
      setTempSelectedUsers([...selectedUsers]);
      setIsModalOpen(true);
      setSearchTerm("");
    }
  };

  const handleAssign = () => {
    setSelectedUsers(tempSelectedUsers);
    setIsModalOpen(false);
    setSearchTerm("");
  };

  const handleCancel = () => {
    setTempSelectedUsers([...selectedUsers]);
    setIsModalOpen(false);
    setSearchTerm("");
  };

  const selectedUserData = allUsers.filter((user) => selectedUsers.includes(user._id));

  const filteredUsers = searchTerm
    ? allUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allUsers;

  const getRoleIcon = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin': return <Crown className="w-3 h-3 text-amber-500" />;
      case 'manager': return <Shield className="w-3 h-3 text-blue-500" />;
      default: return <Star className="w-3 h-3 text-gray-400" />;
    }
  };

  // Render the display content for the dropdown trigger
  const renderTriggerContent = () => {
    if (selectedUserData.length === 0) {
      return (
        <span className="text-color-light line-clamp-1">Select team members...</span>
      );
    }

    if (selectedUserData.length <= 3) {
      return (
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1">
            {selectedUserData.map((user) => (
              <img
                key={user._id}
                src={user.profileImageUrl || "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"}
                alt={user.name}
                className="w-6 h-6 rounded-full bg-color border-2 border-white dark:border-gray-800 object-cover"
              />
            ))}
          </div>
          <span className="text-color font-medium">
            {selectedUserData.length} selected
          </span>
        </div>
      );
    }

   

    return (
      <div className="flex items-center gap-2">
        <div className="flex -space-x-1.5">
          {selectedUserData.slice(0, 3).map((user) => (
            <img
              key={user._id}
              src={user.profileImageUrl || "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"}
              className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800 object-cover"
            />
          ))}
          <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center">
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
              +{selectedUserData.length - 3}
            </span>
          </div>
        </div>
        <span className="text-color font-medium">
          {selectedUserData.length} selected
        </span>
      </div>
    );
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (selectedUsers.length === 0) {
      setTempSelectedUsers([]);
    }
  }, [selectedUsers]);

  return (
    <div className="relative w-full">
      {/* Dropdown Trigger - Matches SelectDropdown exactly */}
      <button
        type="button"
        onClick={handleOpenModal}
        disabled={disabled}
        className={`w-full px-4 py-3 text-left border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all flex items-center justify-between ${
          disabled 
            ? 'bg-surface cursor-not-allowed text-color' 
            : error
              ? 'border-red-300 bg-red-50 hover:border-red-400'
              : 'border-gray-300 bg-surface hover:border-gray-400 cursor-pointer'
        }`}
        aria-haspopup="dialog"
        aria-expanded={isModalOpen}
      >
        {renderTriggerContent()}
        <LucideChevronDown 
          className={`w-5 h-5 transition-transform ${isModalOpen ? 'rotate-180' : ''} ${
            disabled ? 'text-color' : 'text-color-light'
          }`} 
        />
      </button>

      {/* Enhanced Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCancel}
        title="Select Team Members"
      >
        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 z-2 transform -translate-y-1/2">
              <Search className="w-4 h-4 text-color-light" />
            </div>
            <input
              type="text"
              placeholder="Search members by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 bg-color text-color transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-3 h-3 text-gray-400" />
              </button>
            )}
          </div>

          {/* Selection Summary */}
          {tempSelectedUsers.length > 0 && (
            <div className="flex items-center gap-2 px-3 py-2 bg-color rounded-lg">
              <Check className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                {tempSelectedUsers.length} member{tempSelectedUsers.length !== 1 ? 's' : ''} selected
              </span>
            </div>
          )}

          {/* Users List */}
          <div className="space-y-1 max-h-[50vh] overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm text-color-light">Loading members...</span>
                </div>
              </div>
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((user) => {
                const isSelected = tempSelectedUsers.includes(user._id);
                return (
                  <button
                    key={user._id}
                    type="button"
                    onClick={() => toggleUserSelection(user._id)}
                    className={`w-full px-4 py-3 text-left bg-color  transition-colors flex items-center justify-between rounded-lg border-2 border-color-bg ${
                      isSelected ? 'border-2 border-color-primary bg-surface text-color' : 'text-color-light'
                    } cursor-pointer`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className="relative flex-shrink-0">
                        <img
                          src={user.profileImageUrl || "/default-avatar.png"}
                          alt={user.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        {/* {isSelected && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 text-white" />
                          </div>
                        )} */}
                      </div>

                      {/* User Info */}
                      <div className="flex-1 min-w-0 text-left">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="font-medium text-sm truncate">
                            {user.name}
                          </span>
                          {user.role && getRoleIcon(user.role)}
                        </div>
                        <p className="text-xs text-color-light truncate">{user.email}</p>
                      </div>
                    </div>

                    {/* Checkbox */}
                    <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                      isSelected
                        ? "bg-blue-600 border-blue-600"
                        : "border-gray-300 dark:border-gray-600"
                    }`}>
                      {isSelected && <Check className="w-3 h-3 text-white" />}
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <LucideUsers className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-color-light">
                  {searchTerm ? "No users found" : "No users available"}
                </p>
                <p className="text-xs text-color-light mt-1">
                  {searchTerm ? "Try adjusting your search" : "Check back later"}
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button 
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-medium text-color bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleAssign}
              className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              Assign ({tempSelectedUsers.length})
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SelectUsers;