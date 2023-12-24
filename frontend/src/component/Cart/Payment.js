import React, { useEffect, useRef } from 'react'
import axios from 'axios'
import { useAlert } from 'react-alert'
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js'
import Metadata from '../layout/Header/Metadata'
import CheckoutSteps from './CheckoutSteps'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import creditcard from '../../Images/cardFront.png'
import creditcard2 from '../../Images/cardBack.png'
import visa from '../../Images/visa.png'
import master from '../../Images/mastercard.png'
import rupay from '../../Images/rupay.png'
import Slider from 'react-slick'
import { createOrder } from '../../redux/orders/orderSlice'

const Payment = () => {

  const orderDetails = sessionStorage.getItem("orderInfo")

  const orderInfo = JSON.parse(orderDetails);


  console.log("orderInfo", orderInfo)
  console.log("orderInfo Type", typeof orderInfo)

  const stripe = useStripe()
  const elements = useElements()
  const alert = useAlert()
  const dispatch = useDispatch()
  const payBtn = useRef()
  const Navigate = useNavigate()

  const { shippingInfo, cartItems } = useSelector(state => state.cart)
  const { userInfo } = useSelector(state => state.authentication)
  const { error } = useSelector(state => state.order)


  const paymentData = {
    amount : Math.round(orderInfo.totalPrice * 100)
  }

  const order = {
    shippingInfo,
    orderItems : cartItems,
    itemsPrice : orderInfo.subTotal,
    taxPrice : orderInfo.tax,
    shippingPrice : orderInfo.shippingCharges,
    totalPrice : orderInfo.totalPrice,
  }

  const submitPayment = async (e) => {
    e.preventDefault()
    payBtn.current.disabled = true

    try {
      const config = {
        headers : {
          'Content-Type' : 'application/json'
        }
      };

      const { data } = await axios.post('/api/v1/payment/process', paymentData, config)

      const clientSecret = data.client_secret

      if(!stripe || !elements) {
        alert.info('Unable to access stripe')
      }

      else
      {
        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method : {
            card : elements.getElement(CardNumberElement),
            billing_details : {
              name : userInfo.name,
              email : userInfo.email,
              address : {
              line1 : shippingInfo.address,
              postal_code : shippingInfo.pinCode,
              city : shippingInfo.city,
              country : shippingInfo.country
            }
          }
          }
        })

        if(result.error) {
          payBtn.current.disabled = false
          alert.error(result.error.message)
        }
        else{
          if(result.paymentIntent.status === 'succeeded') {
            
            order.paymentInfo = {
              id : result.paymentIntent.id,
              status : result.paymentIntent.status
            };

            dispatch(createOrder(order))
            
            Navigate('/success')
          }
          else{
            alert.error('There is some issue while payment processing')
          }
        }
      }  
    } catch (error) {
      payBtn.current.disabled = false
      alert.error(error.response.data.message);
    }
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
  }, [dispatch, alert, error]);




  return (
    <>
      <Metadata title={'Payment'} />
      <div>
        <CheckoutSteps activeStep={2} />
      </div>

      <div className='mx-36 mt-8'>

      {/* this is the whole payment section */}
        <div className='flex space-x-16'>

          <div className='w-1/2'>
            <div className='mr-10'>
              <div className='rounded-xl col-span-1 my-6 h-[28rem]'>
                        <div className='px-8 py-8'>
                            <div className='text-2xl py-4 font-bold text-neutral-700'>Order Summary</div>
                            <div className='text-neutral-500 font-medium space-y-4 border-t-2 pt-4'>
                                <div className='flex justify-between'>
                                    <div>Subtotal</div>
                                    <div> {`₹${orderInfo && orderInfo.subTotal}`}</div>
                                </div>
                                <div className='flex justify-between'>
                                    <div>Shipping Charges</div>
                                    <div>{orderInfo && orderInfo.shippingCharges === 0 ? <p1 className='text-[#2FA674]'>Free</p1> : <p1>₹ {orderInfo && orderInfo.shippingCharges}</p1>}</div>
                                </div>
                                <div className='flex justify-between border-b-2 pb-4'>
                                    <div>GST</div>
                                    <div>{`${orderInfo && orderInfo.tax}%`}</div>
                                </div>
                                <div className='flex justify-between font-bold text-xl text-neutral-700'>
                                    <div>Total</div>
                                    <div>₹ {orderInfo && orderInfo.totalPrice}</div>
                                </div>     
                            </div>

                            <div className='flex items-center space-x-8 mt-16'>
                              <div className='text-center text-neutral-600'>We accept : </div>
                              <img className='h-20 bg-gradient-to-b from-[#beffe4] to-[#eafdf6] p-4 rounded-full' src={visa} alt='no found' />
                              <img className='h-20 bg-gradient-to-b from-[#beffe4] to-[#eafdf6] p-4 rounded-full' src={master} alt='no found' />
                              <img className='h-20 bg-gradient-to-b from-[#beffe4] to-[#eafdf6] p-4 rounded-full' src={rupay} alt='no found' />
                              
                            </div>
                        </div>
                    </div>
            </div>

          </div>




          <div className='w-1/2'>
              {/* for form section */}

                <div className='text-[#2FA674] drop-shadow-2xl mx-8 my-24 bg-gradient-to-b from-[#beffe4] to-[#eafdf6] px-8 pt-4 pb-8 rounded-xl'> 

                      
                        

                        <div className='text-center flex justify-center'>
                          <img className='drop-shadow-2xl -mt-24 animate-bounce' src={creditcard} alt='not found' />
                        </div>
                        
                      
          
                

                        <p className='text-center -mt-12 pb-4 text-neutral-600'>Please ensure your card can be used for online transactions.</p>
                
                  

                 

                  <form onSubmit={(e) => submitPayment(e)}>

                    <div className='bg-neutral-100 shadow-xl rounded-xl text-3xl w-full my-4 flex items-center px-2 space-x-2'>

                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-slot="icon" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" /></svg>

                      <CardNumberElement id='cardNumber' className='h-16 py-6 px-2 text-3xl inline w-5/6' />

                      <img className='h-12 w-20' src={creditcard} alt='image not found' />
                    </div>
                    
                    <div className='flex space-x-6'>

                        <div className='bg-neutral-100 shadow-xl rounded-xl text-3xl w-1/2 flex items-center px-2 space-x-2'>

                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-slot="icon" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" /></svg>

                          <CardExpiryElement id='cardNumber' className='h-16 py-6 px-2 text-3xl inline w-5/6' />
                        </div>

                        <div className='bg-neutral-100 shadow-xl rounded-xl text-3xl w-1/2 flex items-center px-2 space-x-2'>

                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-slot="icon" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>

                          <CardCvcElement id='cardNumber' className='h-16 py-6 px-2 text-3xl inline w-5/6' />
                        </div>
                    </div>
                    <div className='flex justify-end'>
                    <input className='w-1/2 mb-2 px-6 py-4 rounded-lg bg-gradient-to-br from-[#2FA674] to-[#6EE5B3] text-white font-bold cursor-pointer mt-8'
                      type="submit"
                      value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                      ref={payBtn}
                    />

                    </div>
                    

                  </form>

                </div>



          </div>



        </div>
        


        
      </div>

      
    </>
  )
}

export default Payment