import React from 'react'
import appstore from '../../../Images/Appstore.png'
import playstore from '../../../Images/playstore.png'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <>
        <div className='grid grid-cols-1 grid-rows-4 gap-4 md:grid-cols-2 md:grid-rows-3 lg:grid-cols-4 lg:grid-rows-2 bg-slate-800 text-white p-16 space-8'>
            <div className='md:col-span-2 lg:col-span-2 lg:row-span-1 flex-row text-white mx-auto'>
                
                <div className='text-4xl font-bold mb-4'>DOWNLOAD OUR APP</div>
                <div className='text-xl'>Download app for IOS and Android</div>
                <div className='flex space-x-12 mt-8'>
                <div><img className='h-16' src={appstore} alt='image not found' /></div>
                <div><img className='h-16' src={playstore} alt='image not found' /></div>

                </div>
                
            </div>
            <div className='md:col-span-1 lg:col-span-1 lg:row-span-1 mx-auto'>
                <div className='text-4xl font-bold'>Important Links</div>
                <div className='text-xl mt-4'>
                    <ul className='space-y-2'>
                        <li>Payment history</li>
                        <li>Online payment</li>
                        <li>Orders</li>
                    </ul>
                </div>
            </div>
            <div className='md:col-span-1 lg:col-span-1 lg:row-span-1 mx-auto'>
            <div className='text-4xl font-bold'>Contact Us</div>
                <div className='text-xl mt-4'>
                    <ul className='space-y-2'>
                        <li><Link to='/'>Linkedin</Link></li>
                        <li><Link to='/'>Instagram</Link></li>
                        <li><Link to='/'>Facebook</Link></li>
                    </ul>
                </div></div>
            <div className='md:col-span-2 lg:col-span-4 lg:row-span-1 text-center text-neutral-400 text-lg flex-row space-y-16 my-16 mx-auto'>
                <div className='font-bold text-[6rem] lg:text-[8rem] text-white'>QUICKER</div>
                <div>&copy; All rights reserved by Nilam Jyoti Sharma</div>
            </div>
        </div>
    </>
  )
}

export default Footer