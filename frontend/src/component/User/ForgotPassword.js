import React, { useState, useEffect } from 'react'
import Metadata from '../layout/Header/Metadata';
import { useDispatch, useSelector } from 'react-redux';
// import { loadUser } from '../../redux/users/authSlice';
import { useAlert } from 'react-alert';
// import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../redux/users/forgotPasswordSlice';
import Loader from '../Loader/Loader';

const ForgotPassword = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    // const navigate = useNavigate();

    const { error, message, loading } = useSelector(state => state.forgotPassword);

    const[email, setEmail] = useState('');

    const forgotPasswordSubmit = (e) => {
        
        e.preventDefault();

        const formData = new FormData();

        formData.set('email', email);
        dispatch(forgotPassword(formData));

    }

    useEffect(() => {

        if(error){
            alert.error(error);
        }
        if(message){  
            alert.success(message);
        }
    }, [dispatch, alert, error, message])



  return (
    <>
        {loading ? <Loader /> : (

            <div className='text-center my-8'>

        <Metadata title='Change Password' />
        <div className='my-12'>

        <h1 className='text-4xl font-bold text-[#2FA674] border-b-[1.2px] border-[#2FA674] py-2 mx-48'>Reset Password</h1>
        
            <form className='my-12 flex flex-col items-center justify-center text-center text-[#64375B] drop-shadow-2xl' onSubmit={forgotPasswordSubmit}>

                <p1 className='text-neutral-500 text-lg my-4'>Please enter your registered email to reset your account password.</p1>

                    <input className='w-2/3 my-2 p-4 rounded-lg' type='email' placeholder='Enter Your Registered Email' required name="name" value={email} onChange= {(e) => setEmail(e.target.value)} />


                    <input className='w-2/3 my-4 p-4 rounded-lg bg-gradient-to-br from-[#2FA674] to-[#6EE5B3] text-white font-semibold cursor-pointer' type='submit' value='Send' />
                </form>
            
        </div>
        
    </div>

        )}
    </>
  )
}

export default ForgotPassword