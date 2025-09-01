import React from 'react'

const AvatarGroup = ({avatars, maxVisible = 3}) => {
  const defaultImage = 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png';
  
  // Process avatars to use default image for empty/invalid URLs
  const processedAvatars = avatars.map(avatar => {
    return (!avatar || avatar.trim() === '') ? defaultImage : avatar;
  });

  return (
    <div className='flex items-center '>
        {processedAvatars.slice(0, maxVisible).map((avatar, index) => (
            <img 
              key={index} 
              src={avatar} 
              alt={`avatar ${index}`} 
              className='w-9 h-9 rounded-full border-2 border-surface -ml-3 first:ml-0'
            />
        ))}

        {processedAvatars.length > maxVisible && (
          <div className='w-9 h-9 flex items-center justify-center text-xs font-medium rounded-full bg-gray-200 border-2 border-surface -ml-3'>
            +{processedAvatars.length - maxVisible}
          </div>
        )}
    </div>
  )
}

export default AvatarGroup