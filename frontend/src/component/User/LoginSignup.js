import React, { useState, useEffect } from 'react'
import bg1 from '../../Images/bg6.jpg'
import { Link } from 'react-router-dom';
import Metadata from '../layout/Header/Metadata';
import { useDispatch, useSelector } from 'react-redux';
import { login, signup } from '../../redux/users/authSlice';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';


const LoginSignup = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();


    const { loading, error, userInfo, isAuthenticated } = useSelector(state => state.authentication)



    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    });

    const { name, email, password } = user;

    const [avatar, setAvatar] = useState('/avatar.png');
    const [avatarPreview, setAvatarPreview] = useState('/avatar.png');



    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword))
        

    }

    const registerSubmit = (e) => {
        
        e.preventDefault();

        const formData = new FormData();

        formData.set('name', name);
        formData.set('email', email);
        formData.set('password', password);
        formData.set('avatar', avatar);
        dispatch(signup(formData));
        
    //    alert.success('Registered successfully');
    }

    const registerDataChange = (e) => {
        if(e.target.name === 'avatar'){
            const reader = new FileReader();

            reader.onload = () => {
                if(reader.readyState === 2){
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result)
                }
            }

            reader.readAsDataURL(e.target.files[0])
        }
        else{
            setUser({...user, [e.target.name]: e.target.value});
        }
    }

    // const redirect = location.search ? location.search.split("=")[1] : "/account";

    useEffect(() => {
        if(error){
            alert.error(error);
        }
        if(isAuthenticated){
            navigate('/')
            alert.success('Logged in successfully');
        }
    }, [dispatch, alert, error, isAuthenticated, navigate])


    const [isLogin, setIsLogin] = useState(true);
    const showSignup = () => {
        setIsLogin(!isLogin)
    }

    console.log("isLogin", isLogin)


  return (

    <>


<Metadata title='Login/Signup'/>
    <div className='flex'>
        <div className="secondary w-1/2">

            <img className='h-screen w-1/2 absolute' src={bg1} alt='image not found' />

            <div className={`fixed flex-col items-center justify-center text-center w-2/5 my-48 mx-16  text-white drop-shadow-2xl ${isLogin==true? 'hidden' : 'flex'}`}>

                <h1 className='text-[5rem] font-extrabold'>Welcome to Quicker</h1>
                <p className='text-[1.7rem] w-2/3'>Please create your account to use our services</p>


                
            </div>


            <div className={`fixed flex-col items-center justify-center text-center w-2/5 my-48 mx-16  text-white drop-shadow-2xl ${isLogin==true? 'flex' : 'hidden'}`}>

                <h1 className='text-[5rem] font-extrabold'>Welcome back to Quicker</h1>
                <p className='text-[1.7rem] w-2/3'>Please log in to your account to access all your informations</p>


                
            </div>


        </div>

        <div className='w-1/2 flex justify-center items-center text-center p-12 mt-16'>

            <div className={`${isLogin==true? 'inline' : 'hidden'}`}>

                <h1 className='text-[4rem] font-extrabold text-[#2FA674]'>Log In</h1>
                <p className='text-[1.5rem] my-4 text-neutral-500'>Get access to your Orders, Wishlist and Recommendations</p>

                <form className='flex flex-col items-center justify-center text-center text-[#64375B] drop-shadow-2xl' onSubmit={loginSubmit}>

                    <input className='w-2/3 my-4 p-4 rounded-lg' type='email' placeholder='Email' required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                    
                    <input className='w-2/3 my-4 p-4 rounded-lg' type='password' placeholder='Password' required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                    
                    <Link to = '/password/forgot' className='text-[1rem] text-[#2FA674] font-semibold mx-2 cursor-pointer'>Forgot Password?</Link>

                    <input className='w-2/3 my-4 p-4 rounded-lg bg-gradient-to-br from-[#2FA674] to-[#6EE5B3] text-white font-semibold cursor-pointer' type='submit' value='Login' />
                </form> 

                <div className='flex justify-center mt-4 items-center text-center'>
                    <p className='text-[1.2rem]'>Don't have an account?</p>
                    <Link to='#' className='text-[1.2rem] text-[#2FA674] font-semibold mx-2 cursor-pointer' onClick={showSignup}>Sign Up</Link>
                </div>
            </div>

            <div className={`${isLogin==true? 'hidden' : 'inline -mt-24'}`}>
                <h1 className='text-[4rem] font-extrabold text-[#2FA674]'>Sign Up</h1>
                <p className='text-[1.5rem] my-2 text-neutral-500'>Get access to your Orders, Wishlist and Recommendations</p>

                <form className='flex flex-col items-center justify-center text-center text-[#64375B] drop-shadow-2xl' encType="multipart/form-data" onSubmit={registerSubmit}>

                    <div className='registerImage flex flex-col items-center mx-8 space-x-4'>

                    <img className='h-24 w-24 rounded-full' src={avatarPreview} alt="Avatar Preview" />
                    <input className='w-2/3 my-2 p-2 rounded-lg bg-gradient-to-br from-[#2FA674] to-[#6EE5B3]'
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                    />

                    </div>

                    <input className='w-2/3 my-2 p-4 rounded-lg' type='text' placeholder='Full Name' required 
                    name="name" value={name} onChange={registerDataChange} />

                    <input className='w-2/3 my-2 p-4 rounded-lg' type='email' placeholder='Email' required name="email" value={email} onChange={registerDataChange} />

                    <input className='w-2/3 my-2 p-4 rounded-lg' type='password' placeholder='Password' required name="password" value={password} onChange={registerDataChange} />

                    

                    <input className='w-2/3 my-4 p-4 rounded-lg bg-gradient-to-br from-[#2FA674] to-[#6EE5B3] text-white font-semibold cursor-pointer' type='submit' value='Sign Up' />
                </form>

                <div className='flex justify-center mt-4 items-center text-center'>
                    <p className='text-[1.2rem]'>Already have an account?</p>
                    <Link to='#' className='text-[1.2rem] text-[#2FA674] font-semibold mx-2 cursor-pointer' onClick={showSignup}>Log In</Link>
                </div>

            </div>

            
        </div>
    </div>
        
    </>

    
  )
}

export default LoginSignup