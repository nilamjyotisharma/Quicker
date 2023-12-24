import React from 'react'
import { Link } from 'react-router-dom'
import { addToCart, removeFromCart } from '../../redux/cart/cartSlice';
import { useDispatch } from 'react-redux';

const CartCard = ({item}) => {

    const dispatch = useDispatch();



    
    const increamentQuantity = () => {
        const newQuantiy = item.qty + 1;

        if(item.stock <= item.qty) return;

        dispatch(addToCart(item.product, newQuantiy));
    }

    const decreamentQuantity = () => {
        const newQuantiy = item.qty - 1;

        if(1 >= item.qty) return;

        dispatch(addToCart(item.product, newQuantiy));
    }

    const removeItem = () => {
        dispatch(removeFromCart(item.product));
    }



    
  return (
    <div className='border-b-2 my-6 duration-300 hover:scale-105'>
        <div className='px-16 py-4 flex items-center justify-between'>

            <div className='flex items-center space-x-8'>
                <img className='h-20 w-20 rounded-xl' src={item.image} alt="product" />
                <div className='w-72 space-y-2 flex flex-col'>
                <Link to={`/product/${item.product}`} target='_blank'><h1 className='text-lg w-72 font-bold text-neutral-700'>{item.name}</h1></Link>
                {/* <p1 className='text-sm text-gray-500'>#{item.product}</p1><br/> */}
                <p1 className='text-sm text-gray-500'>{item.desc}</p1>
            </div>
            </div>
            
            <div>
                <button className='h-8 w-8 bg-gradient-to-br from-[#2FA674] to-[#6EE5B3] text-white shadow-xl font-bold text-lg rounded-full' onClick={decreamentQuantity}>-</button>
                  
                <input className='w-8 text-center font-semibold text-neutral-700 bg-transparent' type='number' value={item.qty} />

                <button className='h-8 w-8 bg-gradient-to-br from-[#2FA674] to-[#6EE5B3] text-white shadow-xl font-bold text-lg rounded-full' onClick={increamentQuantity}>+</button>
            </div>
            <div className='text-right'>
                <p1 className='text-sm text-gray-400 text-right'>{item.price} x {item.qty}</p1>

                <h1 className='text-xl font-medium text-neutral-800'>₹ {item.price * item.qty}</h1>
            </div>
            <div className='duration-200 bg-gradient-to-br from-[#2FA674] to-[#6EE5B3] cursor-pointer text-white font-bold p-2 rounded-full' onClick={removeItem}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>

            </div>


        </div>
      
    </div>
  )
}

export default CartCard