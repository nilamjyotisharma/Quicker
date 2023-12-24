import React from 'react'


const CategoryItems = (props) => {
  return (
    <>
        <div className='mx-4'>
            <img className='h-[4rem] w-[4rem] drop-shadow-2xl rounded-full p-1' src={props.image} alt='image not found' />
            <h1 className='text-center text-sm font-semibold text-gray-600 mt-2'>{props.name}</h1>
        </div>
    </>
  )
}

export default CategoryItems