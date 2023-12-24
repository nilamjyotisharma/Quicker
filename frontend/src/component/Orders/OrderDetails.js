import React, { useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import OrderItems from './OrderItems';
import Loader from '../Loader/Loader';
import { getOrderInfo } from '../../redux/orders/orderDetailsSlice';
import OrderTracking from './OrderTracking';
import Header from '../layout/Header/Header';
import Footer from '../layout/Footer/Footer';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import PaymentIcon from '@mui/icons-material/Payment';
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import DateRangeIcon from '@mui/icons-material/DateRange';



const OrderDetails = () => {

    const {error, orderInfo, loading } = useSelector(state => state.orderDetails);

    const alert = useAlert();
    const dispatch = useDispatch()
    const {id} = useParams();

    console.log('id', id)

    useEffect(() => {
        if(error) {
            alert.error(error);
        }
        
        dispatch(getOrderInfo(id));    
    }, [dispatch, alert, error, id])

    console.log(orderInfo.orderStatus)

  return (
    <>

    {loading ? <Loader /> : 
    (
        <>
        <Header />

        <div className='flex flex-col mt-12 mb-36 mx-32'>
            <div className='flex justify-between'>
                <div>
                    <h1 className='text-[1.7rem] font-bold text-neutral-700'>Order : #{orderInfo && orderInfo._id}</h1>
                    <h1 className='text-[1.2rem] text-[#2FA674]'><DateRangeIcon /> Order Date : {orderInfo && orderInfo.createdAt.split("", 10)}</h1>
                </div>
                <div>
                <Link to = '/orders'><p1 className='text-lg bg-gradient-to-br from-[#2FA674] to-[#6EE5B3] text-white font-bold px-6 py-3 rounded-xl flex-nowrap flex items-center duration-300 hover:scale-105'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-8 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg> All Orders</p1></Link>
                </div>
                
            </div>
            <div className='flex space-x-36 mt-16 text-neutral-700 items-start'>
                <div className='text-lg'>
                    <h1 className='text-2xl font-bold text-[#2FA674] mb-2'>Delivery</h1>
                    <h1 className='font-bold text-xl text-neutral-800'>{orderInfo && orderInfo.shippingInfo.name}</h1>
                    <h1>{orderInfo && orderInfo.shippingInfo.address}, {orderInfo && orderInfo.shippingInfo.pinCode}</h1>
                    <h1>{orderInfo && orderInfo.shippingInfo.city}, {orderInfo && orderInfo.shippingInfo.state}, {orderInfo && orderInfo.shippingInfo.country}</h1>
                    <h1>{orderInfo && orderInfo.shippingInfo.phoneNo}</h1>
                </div>
                <div>
                    <h1 className='text-2xl font-bold text-[#2FA674] mb-2'>Payment</h1>
                    <h1 className='text-xl'>Transaction id : #{orderInfo && orderInfo.paymentInfo.id}</h1>
                    <h1 className='text-xl'>Transaction status : {orderInfo && orderInfo.paymentInfo.status === "succeeded" ? <p1 className='text-green-600 font-medium'>Paid</p1> : <p1 className='text-red-500 font-medium'>Unpaid</p1>}</h1>
                </div>
            </div>
            <div className='flex space-x-4 my-16'>
                
                    <div className='w-1/2'>
                    <h1 className='text-2xl font-bold text-[#2FA674] mb-2'>Order Status</h1>
                        {
                            orderInfo && orderInfo.orderItems.map(item => (
                                <OrderItems item={item} />
                            ))
                        }
                    </div>
                    <div className='w-1/2'>
                        <h1 className='text-2xl font-bold text-[#2FA674] mb-2'>Order Status</h1>
                        <OrderTracking orderInfo={orderInfo} activeStep={orderInfo && orderInfo.orderStatus === 'Processing' ? 1 : orderInfo && orderInfo.orderStatus === 'Shipped' ? 2 : orderInfo && orderInfo.orderStatus === 'Delivered' ? 3 : 0} />
                    </div>
            </div>
            <div className='flex justify-between items-center'>

            <div className='w-1/2 px-16 text-left'>
                            <h1 className='text-2xl font-bold text-[#2FA674] mb-4'>Need Help</h1>
                            <div className='space-y-3'>
                                <div className='flex space-x-4 items-center'>
                                <ContactSupportIcon className='text-[#2FA674] text-9xl' />
                                <Link to='/contact' className='text-neutral-600 text-2xl font-bold'>Order issues</Link>
                                </div>
                                <div className='flex space-x-4 items-center'>
                                <PaymentIcon className='text-[#2FA674] text-9xl' />
                                <Link to='/contact' className='text-neutral-600 text-2xl font-bold'>Payment issues</Link>
                                </div>
                                <div className='flex space-x-4 items-center'>
                                <LocalShippingIcon className='text-[#2FA674] text-[8rem]' />
                                <Link to='/contact' className='text-neutral-600 text-2xl font-bold'>Delivery info</Link>
                                </div>
                            </div>
                        </div>
                    
                        <div className='text-neutral-600 text-xl font-medium w-1/2 space-y-2'>
                            <h1 className='text-[2rem] text-[#2FA674] font-bold py-4 border-b-2'>Order Summary</h1>
                            <div className='flex justify-between'><div>Subtotal :</div> <div>₹ {orderInfo && orderInfo.itemsPrice}</div></div>
                            <div className='flex justify-between'><div>Shipping :</div> <div>₹ {orderInfo && orderInfo.shippingPrice}</div></div>
                            <div className='flex justify-between'><div>GST :</div> <div>{orderInfo && orderInfo.taxPrice}%</div></div>
                            <div className='flex justify-between text-2xl text-[#2FA674] font-bold py-4 border-t-2'><div>Total :</div> <div>₹ {orderInfo && orderInfo.totalPrice}</div></div>
                        </div>
                        
                        

                    </div>
                    </div>
                
                
            
        <Footer />
        </>
    )
    }
        
    </>
  )
}

export default OrderDetails