import React from 'react';

const AvatarGroup = ({ avatars, maxVisible = 3 }) => {
  const defaultImage =
    'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png';

  // Replace empty/invalid with default
  const processedAvatars = avatars.map((avatar) =>
    !avatar || avatar.trim() === '' ? defaultImage : avatar
  );

  return (
    <div className="flex items-center">
      {processedAvatars.slice(0, maxVisible).map((avatar, index) => (
        <img
          key={index}
          src={avatar}
          alt={`avatar ${index}`}
          className="w-9 h-9 rounded-full border-2 border-gray-200 dark:border-gray-700 -ml-3 first:ml-0"
        />
      ))}

      {processedAvatars.length > maxVisible && (
        <div className="w-9 h-9 flex items-center justify-center text-xs font-medium rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-2 border-gray-200 dark:border-gray-700 -ml-3">
          +{processedAvatars.length - maxVisible}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
