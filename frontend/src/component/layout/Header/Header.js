import React from 'react'
import logoMain from '../../../Images/logoBG2.png'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from '../../Loader/Loader'


const Header = () => {

    const { isAuthenticated, loading, userInfo } = useSelector(state => state.authentication)
    const { cartItems } = useSelector(state => state.cart)
    console.log('isAuthenticated',isAuthenticated)
    console.log('userInfo', userInfo)

    const navItems = [
        {
            name: 'Home',
            link: '/'
        },
        {
            name: 'Products',
            link: '/products'
        },
        {
            name: 'About',
            link: '/about'
        },
        {
            name: 'Contact',
            link: '/contact'
        }
    ]

  return (

    <>
        {loading ? <Loader /> : 
            (
                <div className='sticky top-0 z-40'>
        <div className='flex justify-between pt-4 pb-2 px-32 items-center bg-transparent'>
            <div><Link to='/'><img className='h-12 px-2' src={logoMain} alt='logo not found'/></Link></div>


            <div>
                <ul className='flex text-neutral-600'>
                    {navItems.map((item, index) => {
                        return(

                            <li className={`mx-8 text-[1.1rem] drop-shadow-2xl hover:text-[#2FA674] hover:scale-110 duration-300`} key={index}>
                            <Link to={item.link}>
                            {item.name}
                            </Link>
                            
                            </li>
                        )
                    })
                        }
                </ul>
            </div>

            <div className='flex items-center'>

            <Link to='/login'><div className={`${isAuthenticated==true? 'hidden' : 'px-12 py-2 text-lg rounded-2xl bg-gradient-to-br from-[#2FA674] to-[#6EE5B3] text-white font-bold cursor-pointer hover:scale-105 duration-200'}`}>Get Started</div></Link>

            

            <Link to='/cart'><div className={`${isAuthenticated==true? 'p-2 text-lg rounded-full  cursor-pointer hover:scale-105 duration-200 flex mr-6 text-neutral-700' : 'hidden'}`}>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" /></svg>

            {cartItems.length > 0 && <span className='flex justify-center items-center -mt-2 -ml-2 top-0 right-0 bg-[#2FA674] text-white rounded-full text-[0.7rem] font-bold h-4 w-4 text-center'>{cartItems.length}</span>}

            </div></Link>

            <Link to='/account'><div className={`${isAuthenticated==true? 'mx-4 text-lg rounded-2xl  cursor-pointer hover:scale-105 duration-200 flex' : 'hidden'}`}>
                
                <img className='h-12 w-12 shadow-xl rounded-full inline' src={userInfo ? userInfo.avatar.url : "/avatar.png"} alt='avatar not found' />
                {/* <div className=''>

                <p1 className = 'py-2 text-[#2FA674] font-medium'>{userInfo ? userInfo.name : 'User'}</p1> <br/>
                <p1 className = 'py-2 text-sm text-neutral-600'>{userInfo ? userInfo.email : 'User'}</p1>

                </div> */}
                
            </div></Link>

                
            </div>
            
        </div>
    </div>
            )
            }
    </>



    
    
  )
}

export default Header