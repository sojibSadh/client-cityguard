import React, { Profiler, useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import useAuth from '../../../hooks/useAuth';
import SocialLogin from '../SocialLogin/SocialLogin';
import { NavLink, useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import useAxiosS from '../../../hooks/useAxiousS';
import Online from '../../../assets/login.png';
import toast from 'react-hot-toast';
import { Bars } from 'react-loader-spinner';

function Register() {
    const [loading, setLoading] = useState(false);
    const axiosS = useAxiosS();
    const location = useLocation();
    const navigate = useNavigate();
    const { registerUser, updateUserProfile2 } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleRegister = (data) => {
        // take img from photo upload 1
        const profileImg = data.photo[0];

        toast.loading("Creating user...", { id: "create-user" });
        // 2 register user to firebase email and password
        registerUser(data.email, data.password)
            .then(res => {
                setLoading(true);
                //store the image and get the photo url
                const formData = new FormData();
                formData.append('image', profileImg)
                // const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imageHost_key}`;

                axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imageHost_key}`, formData)
                    .then(res => {
                        const userInfo = {
                            email: data.email,
                            displayName: data.name,
                            photoURL: res.data.data.url,
                            blocked: false
                        }

                        axiosS.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    toast.success('SuccessFull create your Account', { id: "create-user" })
                                }
                            })

                        // update user profile
                        const userProfile = {
                            displayName: data.name,
                            photoURL: res.data.data.url
                        };
                        updateUserProfile2(userProfile)
                            .then(res => {
                                navigate(location.state || "/")
                            })
                            .catch(err => console.log(err))

                    })

            })
            .catch(err => {
                toast.error('Your Account did not  Created ')

            })
    }


    return (
        <div className='min-h-screen'>
            <div>
                <img className='w-[250px] mx-auto' src={Online} alt="" />
            </div>
            <div>
                <h2 className='title text-center pb-5'>Create Your Account </h2>
            </div>
            <div className='max-w-lg mx-auto shadow-2xl shadow-gray-500 p-5 rounded-2xl'>
                <form className='w-full -mb-4' onSubmit={handleSubmit(handleRegister)}>
                    <fieldset className="fieldset">
                        <label className="label text-gray-100 font-semibold">Photo</label>
                        <input type="file" {...register('photo', { required: true })} className="file-input border text-gray-800 font-medium w-full mb-3" placeholder="Photo" />
                        {errors.photo?.type === "required" && (
                            <p role="alert">Photo is required</p>
                        )}

                        <label className="label text-gray-100 font-semibold">Name</label>
                        <input type="text" {...register('name', { required: true })} className="input w-full text-gray-800 font-medium mb-3" placeholder="Name" />
                        {errors.name?.type === "required" && (
                            <p role="alert">Name is required</p>
                        )}

                        <label className="label text-gray-100 font-semibold">Email</label>
                        <input type="email" {...register('email', { required: true })} className="input w-full text-gray-800 font-medium mb-3" placeholder="Email" />
                        {errors.email?.type === "required" && (
                            <p role="alert">Email is required</p>
                        )}

                        <label className="label text-gray-100 font-semibold">Password</label>
                        <input type="password"  {...register('password', {
                            required: true,
                            minLength: 6,
                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

                        })} className="input w-full text-gray-800 font-medium mb-3" placeholder="Password" />
                        {errors.password?.type === "required" && (
                            <p role="alert">PassWord is required</p>
                        )}
                        {errors.password?.type === "minLength" && (
                            <p role="alert">PassWord must be 6 character or longer </p>
                        )}
                        {errors.password?.type === "pattern" && (
                            <p role="alert">password Must ar least one uppercase, at least one lowercase, at least one number, at least special characters </p>
                        )}

                        <div><a className="link link-hover text-orange-600 font-semibold">Forgot password?</a></div>
                        {loading ? (
                            <button className="btn-cusPrimary rounded-md py-3 mb-3 flex justify-center gap-3"> Updating<Bars height="20" width="20" /></button>
                        ) : (
                            <button className="btn-cusPrimary rounded-md py-3 mb-3">Register</button>
                        )}
                    </fieldset>
                </form>
                <SocialLogin />
                <p className='text-sm text-center'>Already have an account <NavLink className='text-blue-600' to='/login'> Login </NavLink> </p>
            </div>

        </div>
    )
}

export default Register
