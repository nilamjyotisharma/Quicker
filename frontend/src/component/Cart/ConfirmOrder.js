import React, { useState } from 'react'
import Metadata from '../layout/Header/Metadata'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CheckoutSteps from './CheckoutSteps'
import {Country, State} from 'country-state-city'
import { saveShippingDetails } from '../../redux/cart/cartSlice'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import ConfirmOrderItemCard from './ConfirmOrderItemCard'



const ConfirmOrder = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const Navigate = useNavigate();





    const { cartItems, shippingInfo } = useSelector(state => state.cart)
    const { userInfo } = useSelector(state => state.authentication)

    const [name, setName] = useState(shippingInfo.name)
    const [address, setAddress] = useState(shippingInfo.address)
    const [city, setCity] = useState(shippingInfo.city)
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode)
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)
    const [country, setCountry] = useState(shippingInfo.country)
    const [state, setState] = useState(shippingInfo.state)


    const subTotal = cartItems.reduce((acc, item) => acc + item.price*item.qty,0);
    const shippingCharges = subTotal > 599 ? 40 : 0;
    const tax = 18;
  
    const taxAmount = (tax/100)*subTotal;
    const totalPrice = subTotal + shippingCharges + taxAmount;
  


    const confirmShippingSubmit = (e) => {
        
      e.preventDefault();

      if(name === '' || address === '' || city === '' || pinCode === '' || phoneNo === '' || country === '' || state === '') {
          alert.error('Please fill all the fields')
      }

      if(phoneNo.length > 10 || phoneNo.length < 10) {
          alert.error('Please enter a valid phone number')
          return;
      }

      if(pinCode.length !== 6) {
          alert.error('Please enter a valid pin code')
          return;
      }

      else{
          dispatch(saveShippingDetails({ name, address, city, pinCode, phoneNo, country, state }));
          alert.success('Shipping details updated successfully')
      }



  }

  const proceedToPayment = () => {
    
    const data = {
        subTotal, 
        shippingCharges, 
        tax, 
        totalPrice
    }
    

    sessionStorage.setItem('orderInfo', JSON.stringify(data))
  }



  return (
    <>
    <Metadata title='Confirm Order' />
    <div className=''>
        <div>
            <CheckoutSteps activeStep={1} />
        </div>



        <div className='flex space-x-24 mt-12 mx-48'>

          <div className='w-2/3'>
            <div>
            <h1 className='text-4xl font-bold text-[#2FA674] py-2'>Shipping Info</h1>
              <div>


              <form onSubmit={confirmShippingSubmit}>


            <div className='flex space-x-4 justify-between mt-8'>
                <input type='text' placeholder='Name' className='w-full bg-[#fafffd] my-2 p-4 rounded-lg shadow-xl' value={name} onChange={(e) => setName(e.target.value)} />

                <input type='number' placeholder='Phone No.' className='w-2/3 bg-[#fafffd] my-2 p-4 rounded-lg shadow-xl' value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />

            </div>


                <input type='text' placeholder='Address' className='w-full bg-[#fafffd] my-2 p-4 rounded-lg shadow-xl' value={address} onChange={(e) => setAddress(e.target.value)} />


                <div className='flex space-x-4 justify-between'>

                <input type='text' placeholder='Locality/ Town' className='w-1/2 bg-[#fafffd] my-2 p-4 rounded-lg shadow-xl' value={city} onChange={(e) => setCity(e.target.value)} />

                <input type='number' placeholder='Pin Code' className='w-1/2 bg-[#fafffd] my-2 p-4 rounded-lg shadow-xl' value={pinCode} onChange={(e) => setPinCode(e.target.value)} />

                </div>

                

                <div className='flex space-x-4 justify-between'>

                <select className='w-2/3 bg-[#fafffd] my-2 p-4 rounded-lg shadow-xl' value={country} onChange={(e) => setCountry(e.target.value)}>
                    <option value=''>Select Country</option>
                    {Country && Country.getAllCountries().map((country) => (
                        <option key={country.isoCode} value={country.isoCode}>{country.name}</option>
                    ))}
                </select>


                {Country && 
                <select className='w-2/3 bg-[#fafffd] my-2 p-4 rounded-lg shadow-xl' value={state} onChange={(e) => setState(e.target.value)}>
                    <option value=''>Select State</option>
                        {State && State.getStatesOfCountry(country).map((state) => (
                        <option key={state.isoCode} value={state.isoCode}>{state.name}</option>
                    ))}
                </select>
                }

                    
                </div>

                

                <div className='flex justify-end'>

                <input className='w-1/3 my-4 p-4 rounded-lg bg-gradient-to-br from-[#2FA674] to-[#6EE5B3] text-white font-semibold cursor-pointer' type='submit' value='Confirm' disabled={state ? false : true} />

                </div>

                

                </form>
                



              </div>
            </div>
            <div>
            <h1 className='text-4xl font-bold text-[#2FA674] py-2'>Cart Items</h1>
                    {
                        cartItems && cartItems.map((item) => (
                                 <ConfirmOrderItemCard key={item.product} item={item} />
                            ))
                       }
            </div>
          </div>

          <div className='w-1/3'>

          <div className='shadow-xl bg-gradient-to-b from-[#beffe4] to-[#eafdf6] rounded-xl col-span-1 my-6 h-[28rem]'>
                        <div className='px-8 py-8'>
                            <div className='text-2xl py-4 font-bold text-neutral-700'>Order Summary</div>
                            <div className='text-neutral-500 font-medium space-y-4'>
                                <div className='flex justify-between'>
                                    <div>Subtotal</div>
                                    <div> {`₹${subTotal}`}</div>
                                </div>
                                <div className='flex justify-between'>
                                    <div>Shipping Charges</div>
                                    <div>{shippingCharges === 0 ? <p1 className='text-[#2FA674]'>Free</p1> : <p1>₹ {shippingCharges}</p1>}</div>
                                </div>
                                <div className='flex justify-between'>
                                    <div>GST</div>
                                    <div>{`${tax}%`}</div>
                                </div>
                                <div>
                                    <input className='w-full mt-4 h-12 rounded-xl bg-[#f1fffa] border-[#beffe4] border-[1px] px-4' type='text' placeholder='Enter Coupon Code' />
                                </div>
                                <div className='flex justify-between font-bold text-xl text-neutral-700'>
                                    <div>Total</div>
                                    <div>₹ {totalPrice}</div>
                                </div>
                                <div className='flex justify-end'>
                                    <Link to='/process/payment'><button className='h-12 mt-4 px-8 rounded-lg bg-gradient-to-br from-[#2FA674] to-[#6EE5B3] text-white font-semibold text-lg' onClick={proceedToPayment}>Proceed to Payment</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
          </div>

        </div>



    </div>
    </>
  )
}

export default ConfirmOrder