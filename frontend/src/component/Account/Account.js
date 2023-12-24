import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader/Loader'
import { Link, useNavigate } from 'react-router-dom'
import bg7 from '../../Images/bg7.jpg'
import { logOut } from '../../redux/users/authSlice'
import { useAlert } from 'react-alert'
import Header from '../layout/Header/Header'
import Footer from '../layout/Footer/Footer'


const Account = () => {

    const { isAuthenticated, loading, userInfo } = useSelector(state => state.authentication)
    console.log('isAuthenticated',isAuthenticated)
    console.log('userInfo', userInfo)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();


    const profileOptions = [
        
        {
            name: 'My Orders',
            link: '/orders'
        },
        {
            name: 'Change Password',
            link: '/password/update'
        },
        {
            name: 'Edit Profile',
            link: '/profile/update'
        },
        {
            name: 'My Wishlist',
            link: '/wishlist'
        },
        {
            name: 'Log out',
            link: '/',
            function: logout
        }
    ]

    if(userInfo && userInfo.role === 'admin'){
        profileOptions.unshift({
            name: 'Dashboard',
            link: '/dashboard'
        })
    }
    if(userInfo && userInfo.role === 'user'){
        profileOptions.unshift({
            name: 'Upgrade Role',
            link: '/upgraderole'
        })
    }

    function logout(){
        dispatch(logOut());
        // navigate(`/`);
        alert.success('Logged out successfully');
        
    }


  return (
    <>
    {/* <Header /> */}
        {loading ? <Loader /> : (<div>

            <div>
                <div>
                    <div>

                        <img className='w-full h-64 object-cover' src={bg7} alt='bg not found' />

                    </div>
                    
                    <div className='px-24'>
                        <div className='flex space-x-4 items-start -mt-10'>
                            <div className='w-40 h-36 rounded-full border-4 border-white overflow-hidden'>
                                <img className='w-full h-full object-cover' src={userInfo ? userInfo.avatar.url : "/avatar.png"} alt='avatar not found' />
                            </div>
                            <div className='mt-12 flex w-full justify-between'>
                                <div className='text-left'>
                                    <h2 className='text-3xl font-bold text-neutral-700'>{userInfo ? userInfo.name : "User"}</h2>
                                    <p className='text-neutral-500 font-medium'>{userInfo ? userInfo.email : "Email"}</p>
                                    <span class="relative flex flex-col h-3 w-3 mt-2">
                                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2FA674] opacity-75"></span>
                                        <span class="relative inline-flex rounded-full h-3 w-3 bg-[#2FA674]">
                                        <span className='text-[#2FA674] text-lg mx-5 -mt-2 font-medium capitalize'>{userInfo ? userInfo.role : "User"}</span>
                                        </span>
                                    </span>


                                    {/* <p className='text-[#2FA674] font-medium capitalize animate-pulse'>{userInfo ? userInfo.role : "User"}</p> */}
                                </div>
                                <div className='flex space-x-2 mt-2 font-semibold drop-shadow-2xl'>

                                    {profileOptions.map((item, index) => {
                                        return(
                                            <Link to={item.link} key={index}>
                                                <button className='px-4 py-2 bg-gradient-to-br from-[#2FA674] to-[#6EE5B3] text-white rounded-lg' onClick={item.function}>{item.name}</button>
                                            </Link>
                                        )
                                    }
                                    )}

                                </div>
                            
                            </div>
                        </div>
                        
                    </div>

                    <div>

                    </div>

                    <div className='px-24 mt-12'>
                        <div className='text-neutral-500 text-lg flex flex-col space-y-4'>
                            <p1>
                                Hello, <span className='font-bold text-[#2FA674] uppercase'>{userInfo ? userInfo.name : 'user'}</span>,<br/></p1>
                                <p1> Welcome to Quicker
                                – your one-stop destination for all your grocery needs!  You are currently logged in as <span className='font-bold text-[#2FA674] uppercase'>{userInfo ? userInfo.role : 'user'}</span>. You joined our plateform on <span className='font-bold text-[#2FA674] uppercase'>{userInfo ? userInfo.createdAt.split("", 10) : 'user'}</span>
                                .<br/>
                            </p1>

                            <p1> 

                                At Quicker, we understand the importance of convenience and quality when it comes to your everyday essentials. That's why we have curated a diverse range of products to make your shopping experience simple, efficient, and enjoyable.<br/>
                            </p1>

                            <p1>
                            Join the Quicker community and experience the future of grocery shopping. We look forward to being your trusted partner in providing high-quality, convenient, and affordable grocery solutions. Welcome to a new era of shopping – welcome to Quicker!

                            </p1>
                            
                            
                        </div>
                    </div>
                </div>
            </div>

            
        </div>)}
        {/* <Footer /> */}
    </>
  )
}

export default Account