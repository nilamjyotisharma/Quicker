import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Metadata from '../layout/Header/Metadata';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../../redux/users/authSlice';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import { updatePassword, resetUpdatePassword } from '../../redux/profile/profileSlice';
import Loader from '../Loader/Loader';

const UpdatePassword = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();


    const { userInfo } = useSelector(state => state.authentication)
    const { error, isUpdated, loading } = useSelector(state => state.profile)


    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const updatePasswordSubmit = (e) => {
        
        e.preventDefault();

        const formData = new FormData();

        formData.set('oldPassword', oldPassword);
        formData.set('newPassword', newPassword);
        formData.set('confirmPassword', confirmPassword);
        dispatch(updatePassword(formData));
    }



    // const redirect = location.search ? location.search.split("=")[1] : "/account";


    useEffect(() => {
        if(error){
            alert.error(error);
        }
        if(isUpdated){  
            alert.success('Password updated successfully');
            dispatch(loadUser());
            navigate('/account');
            dispatch(resetUpdatePassword());
        }
    }, [dispatch, alert, error, isUpdated, userInfo, navigate])


  return (

    <>
        {loading ? <Loader /> : (

            <div className='text-center my-8'>

        <Metadata title='Change Password' />
        <div className='my-12'>

        <h1 className='text-4xl font-bold text-[#2FA674] border-b-[1.2px] border-[#2FA674] py-2 mx-48'>Change Password</h1>
        
        <form className='my-12 flex flex-col items-center justify-center text-center text-[#64375B] drop-shadow-2xl' encType="multipart/form-data" onSubmit={updatePasswordSubmit}>
        <p1 className='text-neutral-500 text-lg my-4'>Hello <span className='font-bold text-[#2FA674] uppercase'>{userInfo ? userInfo.name : 'user'}</span>, Please enter your Old Password and New Password to change your account password.</p1>

                    <input className='w-2/3 my-2 p-4 rounded-lg' type='password' placeholder='Old Password' required 
                    name="name" value={oldPassword} onChange= {(e) => setOldPassword(e.target.value)} />

                    <input className='w-2/3 my-2 p-4 rounded-lg' type='password' placeholder='New Password' required name="email" value={newPassword} onChange= {(e) => setNewPassword(e.target.value)} />

                    <input className='w-2/3 my-2 p-4 rounded-lg' type='password' placeholder='Confirm Password' required name="password" value={confirmPassword} onChange= {(e) => setConfirmPassword(e.target.value)} />


                    <input className='w-2/3 my-4 p-4 rounded-lg bg-gradient-to-br from-[#2FA674] to-[#6EE5B3] text-white font-semibold cursor-pointer' type='submit' value='Change Password' />
                </form>
            
        </div>
        
    </div>

        )}
    </>
    
  )
}

export default UpdatePassword