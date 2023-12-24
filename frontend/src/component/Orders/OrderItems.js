import React from 'react'
import { Link } from 'react-router-dom'

const OrderItems = ({item}) => {
  return (
    <div className='border-b-2 my-6 duration-300'>
        <div className='px-16 py-4 flex items-center justify-between'>

            <div className='flex items-center space-x-8'>
                <img className='h-20 w-20 rounded-xl' src={item.image} alt="product" />
                <div className='w-72 space-y-2 flex flex-col'>
                <Link to={`/product/${item.product}`} target='_blank'><h1 className='text-lg w-72 font-bold text-neutral-700'>{item.name}</h1></Link>
                {/* <p1 className='text-sm text-gray-500'>#{item.product}</p1><br/> */}
                <p1 className='text-sm text-gray-500'>{item.desc}</p1>
            </div>
            </div>
            
            
            <div className='text-right'>
                <p1 className='text-sm text-gray-400 text-right'>{item.price} x {item.qty}</p1>

                <h1 className='text-xl font-medium text-neutral-800'>₹ {item.price * item.qty}</h1>
            </div>
            


        </div>
      
    </div>
  )
}

export default OrderItems