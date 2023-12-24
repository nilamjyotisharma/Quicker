import React from 'react'
import CheckoutSteps from './CheckoutSteps'
import { Link } from 'react-router-dom'


const OrderPlaced = () => {
  return (
    <> 
        <div>
            <CheckoutSteps activeStep={3} />
        </div>
        <div className='flex justify-center mt-10'>
            <div className='text-center'>
                <div className='text-[#4cca95] flex justify-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" data-slot="icon" class="w-52 h-52"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" /></svg>

                </div>
                <div className='text-neutral-600 font-bold text-[4.5rem]'>
                    Order Placed Successfully
                </div>
                <div className='text-neutral-500 text-lg mt-12'>
                    Go to my order section to check your orders
                </div>
                <div className='mt-8 cursor-pointer'>
                    <Link to='/orders'><div className='inline px-16 py-3 duration-150 hover:scale-110 bg-gradient-to-br from-[#2FA674] to-[#6EE5B3] text-white font-bold text-xl rounded-xl'>
                        My Order
                    </div></Link>
                </div>
            </div>
        </div>
    </>
  )
}

export default OrderPlaced