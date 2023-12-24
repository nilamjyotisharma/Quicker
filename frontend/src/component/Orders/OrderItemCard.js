import React from 'react'
import { Link } from 'react-router-dom'

const OrderItemCard = ({item}) => {
  return (
    <Link to={item._id}>
    <div className='border-b-2 my-6 duration-300'>
        <div className='px-16 py-4 flex items-center justify-between'>

            <div className='flex items-center space-x-8'>
                <img className='h-20 w-20 rounded-xl' src={item.orderItems[0].image} alt="product" />
                <div className='w-72 space-y-2 flex flex-col'>
                <Link to={`/product/${item._id}`} target='_blank'><h1 className='text-lg w-72 font-bold text-neutral-700'>{item.orderItems[0].name}</h1></Link>
                <p1 className='text-sm text-gray-500'>Quantity: {item.orderItems[0].qty}</p1>
                
            </div>
            </div>

            <div>
                <h1 className='text-lg text-neutral-700'>₹ {item.totalPrice}</h1>
            </div>
            
            
            <div className='text-right'>
                <p1 className='text-lg text-gray-500'>
                    {item.orderStatus === 'Processing' ? 
                        <p1 className='text-red-500 font-semibold'>{item.orderStatus}</p1> :  <p1 className='text-green-600 font-semibold'>{item.orderStatus}</p1>}
                </p1>
            </div>
            


        </div>
      
    </div>
    </Link>
  )
}

export default OrderItemCard