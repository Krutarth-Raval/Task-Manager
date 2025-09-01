import React from 'react'

const InfoCard = ({icon, label, value, color}) => {
  return (
    <div className='flex items-center gap-4'>
        <div className={`w-2 md:w-2 md:h-5 h-3  ${color} rounded-full`}/>
            <p className='metadata-font-size font-extralight text-color-light'>
                <span className='metadata-font-size font-bold text-theme'>{value}</span> {label}
            </p>
        
    </div>
  )
}

export default InfoCard