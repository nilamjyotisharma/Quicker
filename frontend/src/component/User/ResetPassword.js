import React, { useState, useEffect } from 'react'
import Metadata from '../layout/Header/Metadata';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { resetPassword } from '../../redux/users/forgotPasswordSlice';

const ResetPassword = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { token } = useParams();

    console.log('token', token)


    const { error, success, loading } = useSelector(state => state.forgotPassword)


    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const resetPasswordSubmit = (e) => {
        
        e.preventDefault();

        const formData = new FormData();

        formData.set('password', password);
        formData.set('confirmPassword', confirmPassword);
        dispatch(resetPassword(token, formData));
    }



    // const redirect = location.search ? location.search.split("=")[1] : "/account";


    useEffect(() => {
        if(error){
            alert.error(error);
        }
        if(success){  
            alert.success('Password updated successfully');
            
            navigate('/login');
        }
    }, [dispatch, alert, success, navigate])


  return (

    <>
        {loading ? <Loader /> : (

            <div className='text-center my-8'>

        <Metadata title='Change Password' />
        <div className='my-12'>

        <h1 className='text-4xl font-bold text-[#2FA674] border-b-[1.2px] border-[#2FA674] py-2 mx-48'>Reset Password</h1>
        
        <form className='my-12 flex flex-col items-center justify-center text-center text-[#64375B] drop-shadow-2xl' encType="multipart/form-data" onSubmit={resetPasswordSubmit}>
        {/* <p1 className='text-neutral-500 text-lg my-4'>Hello <span className='font-bold text-[#2FA674] uppercase'>{userInfo ? userInfo.name : 'user'}</span>, Please enter your Old Password and New Password to change your account password.</p1> */}

                    {/* <input className='w-2/3 my-2 p-4 rounded-lg' type='password' placeholder='Old Password' required name="name" value={oldPassword} onChange= {(e) => setOldPassword(e.target.value)} /> */}

                    <input className='w-2/3 my-2 p-4 rounded-lg' type='password' placeholder='New Password' required name="password" value={password} onChange= {(e) => setPassword(e.target.value)} />

                    <input className='w-2/3 my-2 p-4 rounded-lg' type='password' placeholder='Confirm Password' required name="password" value={confirmPassword} onChange= {(e) => setConfirmPassword(e.target.value)} />


                    <input className='w-2/3 my-4 p-4 rounded-lg bg-gradient-to-br from-[#2FA674] to-[#6EE5B3] text-white font-semibold cursor-pointer' type='submit' value='Reset Password' />
                </form>
            
        </div>
        
    </div>

        )}
    </>
        
    )
}

export default ResetPassword