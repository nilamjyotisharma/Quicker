import React from 'react'
import ReactStars from "react-rating-stars-component";

const ReviewCard = ({review}) => {
    
    const options = {
        value: review.rating,
        edit: false,
        size: window.innerWidth < 600 ? 20:20,
        activeColor: "tomato",
        isHalf: true
    };
  return (
    <div className='mx-4'>
        <div className='flex justify-start space-x-2 w-full my-4'>
            <div className='flex flex-col justify-center items-center border-r-4 border-green-200 w-48 bg-green-200 py-2 rounded-l-xl'>

                <img className='h-14 w-14 rounded-full' src='https://cdn-icons-png.flaticon.com/512/6596/6596121.png' alt='image not found' />

                <h1 className='text-[1rem] font-medium text-gray-700'>{review.name}</h1>

            </div>


            <div className='flex flex-col justify-center items-start bg-green-50 w-full px-8 rounded-r-xl'>

                <ReactStars {...options} />

                <h1 className='text-[1.2rem] text-gray-700'>{review.comment}</h1>
                        
            </div>
        </div>
    </div>
  )
}

export default ReviewCard