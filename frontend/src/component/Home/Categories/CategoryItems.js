import React from 'react'


const CategoryItems = (props) => {
  return (
    <>
        <div className='mx-4'>
            <img className='h-[5rem] w-[5rem] drop-shadow-2xl bg-gradient-to-br from-[#2FA674] to-[#6EE5B3] rounded-full p-1 border-2 border-green-100' src={props.image} alt='image not found' />
            <h1 className='text-center text-sm font-semibold text-gray-600 mt-2'>{props.name}</h1>
        </div>
    </>
  )
}

export default CategoryItems