import React, { Profiler, useContext } from 'react';
import { useForm } from "react-hook-form";
import useAuth from '../../../hooks/useAuth';
import SocialLogin from '../SocialLogin/SocialLogin';
import { NavLink, useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import useAxiosS from '../../../hooks/useAxiousS';


function Register() {
    const axiosS = useAxiosS();
    const location = useLocation();
    const navigate = useNavigate();
    const { registerUser, updateUserProfile2 } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();


    const handleRegister = (data) => {
        // console.log('after', data);
        // take img from photo upload 1
        const profileImg = data.photo[0];
        console.log('profileImg', profileImg);

        // 2 register user to firebase email and password
        registerUser(data.email, data.password)
            .then(res => {
                console.log("registerUser inside", res);
                //store the image and get the photo url
                const formData = new FormData();
                formData.append('image', profileImg)
                // const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imageHost_key}`;
                // console.log("image_API_URL", image_API_URL);

                axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imageHost_key}`, formData)
                    .then(res => {
                        console.log('after image upload', res);
                        const userInfo = {
                            email: data.email,
                            displayName: data.name,
                            photoURL: res.data.data.url,
                            blocked: false
                        }

                        axiosS.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user created in the data user')
                                }
                            })

                        // update user profile
                        const userProfile = {
                            displayName: data.name,
                            photoURL: res.data.data.url
                        };
                        updateUserProfile2(userProfile)
                            .then(res => {
                                console.log('update profile');
                                navigate(location.state || "/")
                            })
                            .catch(err => console.log(err))

                    })

            })
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <div>
            <form className='w-full' onSubmit={handleSubmit(handleRegister)}>
                <fieldset className="fieldset">
                    <label className="label">Photo</label>
                    <input type="file" {...register('photo', { required: true })} className="file-input border w-full" placeholder="Photo" />
                    {errors.photo?.type === "required" && (
                        <p role="alert">Photo is required</p>
                    )}

                    <label className="label">Name</label>
                    <input type="text" {...register('name', { required: true })} className="input w-full" placeholder="Name" />
                    {errors.name?.type === "required" && (
                        <p role="alert">Name is required</p>
                    )}

                    <label className="label">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input w-full" placeholder="Email" />
                    {errors.email?.type === "required" && (
                        <p role="alert">Email is required</p>
                    )}

                    <label className="label">Password</label>
                    <input type="password"  {...register('password', {
                        required: true,
                        minLength: 6,
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

                    })} className="input w-full" placeholder="Password" />
                    {errors.password?.type === "required" && (
                        <p role="alert">PassWord is required</p>
                    )}
                    {errors.password?.type === "minLength" && (
                        <p role="alert">PassWord must be 6 character or longer </p>
                    )}
                    {errors.password?.type === "pattern" && (
                        <p role="alert">password Must ar least one uppercase, at least one lowercase, at least one number, at least special characters </p>
                    )}

                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn-primary py-3 text-[16px] btn-neutral mt-4">Register</button>
                </fieldset>
                <p>Already have an account <NavLink className='text-blue-600' to='/login'> Login </NavLink>    </p>
            </form>
            <SocialLogin />
        </div>
    )
}

export default Register
