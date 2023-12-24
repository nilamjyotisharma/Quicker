import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Metadata from '../layout/Header/Metadata';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../../redux/users/authSlice';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import { resetUpdateProfile, updateProfile } from '../../redux/profile/profileSlice';
import Loader from '../Loader/Loader';

const UpdateProfile = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();


    const { userInfo } = useSelector(state => state.authentication)
    const { error, isUpdated, loading } = useSelector(state => state.profile)

    const [avatar, setAvatar] = useState('/avatar.png');
    const [avatarPreview, setAvatarPreview] = useState('/avatar.png');

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    const updateProfileSubmit = (e) => {
        
        e.preventDefault();

        const formData = new FormData();

        formData.set('name', name);
        formData.set('email', email);
        formData.set('avatar', avatar);
        dispatch(updateProfile(formData));
        // navigate('/account')
        
    //    alert.success('Registered successfully');
    }

    const updateProfileDataChange = (e) => {
            const reader = new FileReader();

            reader.onload = () => {
                if(reader.readyState === 2){
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result)
                }
            }

            reader.readAsDataURL(e.target.files[0])
        
    }

    // const redirect = location.search ? location.search.split("=")[1] : "/account";


    useEffect(() => {

        if(userInfo){
            setName(userInfo.name)
            setEmail(userInfo.email)
            setAvatarPreview(userInfo.avatar.url)
        }

        if(error){
            alert.error(error);
        }
        if(isUpdated === true){  
            alert.success('Profile updated successfully');
            dispatch(loadUser());
            navigate('/account');
            dispatch(resetUpdateProfile());
        }
    }, [dispatch, alert, error, isUpdated, userInfo, navigate])


  return (

    <>
        {loading ? <Loader /> : (

            <div className='text-center my-8'>

        <Metadata title='Update Profile' />
        <div className='my-12'>

        <h1 className='text-4xl font-bold text-[#2FA674] border-b-[1.2px] border-[#2FA674] py-2 mx-48 mb-2'>Update Profile</h1>
        <p1 className='text-neutral-500 text-lg'>Hello <span className='font-bold text-[#2FA674] uppercase'>{userInfo ? userInfo.name : 'user'}</span>, Please enter your required details to update your profile.</p1>
        <form className='my-12 flex flex-col items-center justify-center text-center text-[#64375B] drop-shadow-2xl' encType="multipart/form-data" onSubmit={updateProfileSubmit}>

        

                    <div className='registerImage flex flex-col items-center mx-8 space-x-4'>

                    <img className='h-24 w-24 rounded-full' src={avatarPreview} alt="Avatar Preview" />
                    <input className='w-2/3 my-2 p-2 rounded-lg bg-gradient-to-br from-[#2FA674] to-[#6EE5B3]'
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                    />

                    </div>

                    <input className='w-2/3 my-2 p-4 rounded-lg' type='text' placeholder='Full Name' required 
                    name="name" value={name} onChange= {(e) => setName(e.target.value)} />

                    <input className='w-2/3 my-2 p-4 rounded-lg' type='email' placeholder='Email' required name="email" value={email} onChange= {(e) => setEmail(e.target.value)} />

                    {/* <input className='w-2/3 my-2 p-4 rounded-lg' type='password' placeholder='Password' required name="password" value={password} onChange={registerDataChange} /> */}

                    

                    <input className='w-2/3 my-4 p-4 rounded-lg bg-gradient-to-br from-[#2FA674] to-[#6EE5B3] text-white font-semibold cursor-pointer' type='submit' value='Update Profile' />
                </form>
            
        </div>
        
    </div>

        )}
    </>
    
  )
}

export default UpdateProfile