import React from 'react'
import logoMain from '../../../Images/logoBG2.png'
import { Link } from 'react-router-dom'



const Header = () => {

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
    <div className='sticky top-0 z-40'>
        <div className='flex justify-between py-2 px-32 items-center bg-white shadow-xl'>
            <div><Link to='/'><img className='h-12 px-2' src={logoMain} alt='logo not found'/></Link></div>

            <div>
                <input className='bg-slate-100 rounded-lg w-80 px-6 py-2 focus:border-transparent' type='text' placeholder='Search groceries' />
            </div>

            <div>
                <ul className='flex text-neutral-600 font-medium'>
                    {navItems.map((item, index) => {
                        return(

                            <li className={`mx-8 text-sm hover:text-[#2FA674] hover:scale-110 duration-300`} key={index}>
                            <Link to={item.link}>
                            {item.name}
                            </Link>
                            
                            </li>
                        )
                    })
                        }
                </ul>
            </div>
            
            <div className='px-12 py-2 text-lg rounded-2xl bg-gradient-to-br from-[#2FA674] to-[#6EE5B3] text-white font-bold cursor-pointer hover:scale-105 duration-200'><Link to='/login'>Get Started</Link></div>
        </div>
    </div>
  )
}

export default Header