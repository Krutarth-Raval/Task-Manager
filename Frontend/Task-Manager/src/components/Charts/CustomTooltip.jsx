import React from 'react'

const CustomTooltip = ({active, payload}) => {
    if (active && payload && payload.length) {
  return (
    <div className='bg-color shadow-mc rounded-lg p-2 border border-gray-300'>
        <p className='metadata-font-size font-semibold text-purple-800 mb-1'>{payload[0].name}</p>
        <p className='metadata-font-size text-color-light'>Count: <span className='metadata-font-size font-medium text-color-light'>{payload[0].value}</span></p>
    </div>
  )
}
return null
}

export default CustomTooltip