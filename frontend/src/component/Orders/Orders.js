import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { myOrders } from '../../redux/orders/orderSlice'
import { DataGrid } from '@mui/x-data-grid';
import Metadata from '../layout/Header/Metadata';
import Header from '../layout/Header/Header';
import Footer from '../layout/Footer/Footer';
import OrderItemCard from './OrderItemCard';
import { Link } from 'react-router-dom';



const Orders = () => {

    const dispatch = useDispatch()

    const { loading, error, orders } = useSelector(state => state.order)
    const { userInfo } = useSelector(state => state.authentication)
    console.log(orders);
    console.log('userInfo', userInfo)

    

    useEffect(() => {
        if(error){
            alert.error(error)
        }
        dispatch(myOrders())
    }, [dispatch])

    

  return (
    <>
    <Metadata title='My Orders' />
    <Header />



      <div className='bg-cartbg min-h-screen px-16 py-24 -mt-20'>
      <div className='px-16 flex justify-between items-center border-b-2 py-4'>

                <div>
                <h1 className='text-[4rem] font-extrabold text-[#2FA674]'>My Orders</h1>
                <p1 className='text-lg text-gray-500'>{userInfo.name}</p1>
                

                </div>

                <div>
                    <Link to = '/'><p1 className='text-lg bg-gradient-to-br from-[#2FA674] to-[#6EE5B3] text-white font-bold px-6 py-3 rounded-xl flex-nowrap flex items-center duration-300 hover:scale-105'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-8 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg> Home</p1></Link>
                </div>

                


                
            </div>

        {
            orders && orders.toReversed().map((item) => (
                <OrderItemCard key={item._id} item = {item} />
            ))
        }
        
      </div>

    <Footer />
    </>
  )
}

export default Orders