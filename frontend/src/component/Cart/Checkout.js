import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { Country, State } from 'country-state-city'
import { saveShippingDetails } from '../../redux/cart/cartSlice'
import { useNavigate } from 'react-router-dom'
import Metadata from '../layout/Header/Metadata'
import CheckoutSteps from './CheckoutSteps'


const Checkout = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const Navigate = useNavigate();
    const { shippingInfo } = useSelector(state => state.cart)


    const [name, setName] = useState(shippingInfo.name)
    const [address, setAddress] = useState(shippingInfo.address)
    const [city, setCity] = useState(shippingInfo.city)
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode)
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)
    const [country, setCountry] = useState(shippingInfo.country)
    const [state, setState] = useState(shippingInfo.state)


    const shippingSubmit = (e) => {
        
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
            alert.success('Shipping Details Saved')
            dispatch(saveShippingDetails({ name, address, city, pinCode, phoneNo, country, state }));
            Navigate('/checkout/confirm')
        }

    
    }


  return (
    <div className='bg-checkoutbg h-screen w-full'>
    <Metadata title='Shipping Details' />
    <div className=''>
        <CheckoutSteps activeStep={0} />
    </div>
    <div className='mx-64 my-8'>
    <h1 className='text-4xl font-bold text-[#2FA674] border-b-[1.2px] border-[#2FA674] py-2'>Shipping Details</h1>
        <div className='my-12'>
            <form onSubmit={shippingSubmit}>


            <div className='flex space-x-4 justify-between'>
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

                <input className='w-1/3 my-4 p-4 rounded-lg bg-gradient-to-br from-[#2FA674] to-[#6EE5B3] text-white font-semibold cursor-pointer' type='submit' value='Continue' />

                </div>

                

                </form>
                
        </div>
    </div>

    </div>
  )
}

export default Checkout