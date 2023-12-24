import React from 'react'
import Metadata from '../layout/Header/Metadata'
import CartCard from './CartCard'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import emptycart from '../../Images/empty-cart.png'

const Cart = () => {

    const { cartItems } = useSelector(state => state.cart)


    const subTotal = cartItems.reduce((acc, item) => acc + item.price*item.qty,0);
    const discount = 0;
    const tax = 0;

    const discountValue = (discount/100)*subTotal;




  return (
    <>
    <Metadata title='Cart' />

    {
        cartItems.length === 0 ? 
        (
            <div className='bg-cartbg h-screen py-2 flex flex-reverse justify-evenly px-64 items-center'>
            
            <div className='w-1/2'>
                <h1 className='text-[5.6rem] font-extrabold text-[#2FA674] mb-12'>Your Cart is Empty !</h1>
                {/* <p1 className='text-4xl text-gray-500'>Quicker, The Grocery e-mart</p1> */}
                <Link to = '/products'><p1 className='w-72 justify-center text-2xl bg-gradient-to-br from-[#2FA674] to-[#6EE5B3] text-white font-bold px-6 py-3 rounded-xl flex-nowrap flex items-center duration-300 hover:scale-105'>Visit Our Store <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3.5" stroke="currentColor" class="w-10 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </p1></Link>
            </div>

            <div className='p-8 w-1/2 flex justify-end'>
                <img className='h-96 w-96' src={emptycart} alt='Image not found'/>
            </div>


        </div>) :

            (
                <div className="bg-cartbg h-screen px-32 py-2">
            <div className='px-16 flex justify-between items-center border-b-2 py-4'>

                <div>
                <h1 className='text-[4.6rem] font-extrabold text-[#2FA674]'>Cart</h1>
                <p1 className='text-lg text-gray-500'>- Quicker, The Grocery e-mart</p1>
                

                </div>

                <div>
                    <Link to = '/products'><p1 className='text-lg bg-gradient-to-br from-[#2FA674] to-[#6EE5B3] text-white font-bold px-6 py-3 rounded-xl flex-nowrap flex items-center duration-300 hover:scale-105'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-8 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg> Continue Shopping</p1></Link>
                </div>

                


                
            </div>

            <div className='my-8 px-8'>
                <div className='grid grid-cols-4 gap-4'>
                    <div className='col-span-3 px-8'>
                       {
                        cartItems && cartItems.map((item) => (
                                 <CartCard key={item.product} item={item} />
                            ))
                       }
                    </div>



                    <div className='shadow-xl bg-gradient-to-b from-[#beffe4] to-[#eafdf6] rounded-xl col-span-1 my-4 h-[28rem]'>
                        <div className='px-8 py-8'>
                            <div className='text-2xl py-4 font-bold text-neutral-700'>Order Summary</div>
                            <div className='text-neutral-500 font-medium space-y-4'>
                                <div className='flex justify-between'>
                                    <div>Subtotal</div>
                                    <div> {`₹${subTotal}`}</div>
                                </div>
                                <div className='flex justify-between'>
                                    <div>Discount</div>
                                    <div>{discount === 0 ? <p1 className='text-[#2FA674]'>Not available</p1> : <p1>₹ {discount}%</p1>}</div>
                                </div>
                                <div className='flex justify-between'>
                                    <div>Discount Amount</div>
                                    <div>{`₹${discountValue}`}</div>
                                </div>
                                <div>
                                    <input className='w-full mt-4 h-12 rounded-xl bg-[#f1fffa] border-[#beffe4] border-[1px] px-4' type='text' placeholder='Enter Coupon Code' />
                                </div>
                                <div className='flex justify-between font-bold text-xl text-neutral-700'>
                                    <div>Total</div>
                                    <div>₹ {subTotal-discountValue}</div>
                                </div>
                                <div className='flex justify-end'>
                                    <Link to='/checkout'><button className='right-0 h-12 mt-4 px-8 rounded-xl bg-gradient-to-br from-[#2FA674] to-[#6EE5B3] text-white font-bold text-xl'>Checkout</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            )

            
    }
        
    </>
  )
}

export default Cart