import React, { useContext, useState } from 'react'
import { useForm } from "react-hook-form"
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa6";
import useAuth from '../../../hooks/useAuth';
import SocialLogin from '../SocialLogin/SocialLogin';
import { NavLink, useLocation, useNavigate } from 'react-router';
import Online from '../../../assets/login.png'
import toast from 'react-hot-toast';


function Login() {
    const [showPass, setShowPass] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { signInUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleLogin = (data) => {

        signInUser(data.email, data.password)
            .then(res => {
                toast.success('Successfully login your account')
                navigate(location.state || "/")
            })
            .catch(err => {
                toast.success('Email and password not match, try again')
            })
    }

    return (
        <div className='h-full min-h-screen py-10  gap-6'>
            <div>
                <img className='w-[250px] mx-auto' src={Online} alt="" />
            </div>
            <div>
                <h2 className='title text-center pb-5'>Login To Your Account</h2>
            </div>
            <div className='max-w-lg mx-auto shadow-2xl shadow-gray-500 p-5 rounded-2xl'>

                <form className='w-full' onSubmit={handleSubmit(handleLogin)}>
                    <fieldset className="fieldset">
                        <label className="label text-gray-100 font-semibold">Email</label>
                        <input type="email"  {...register('email', { required: true })} className="input w-full my-3 text-gray-500 font-medium" placeholder="Email" />
                        {errors.email?.type === "required" && (
                            <p role="alert">Email is required</p>
                        )}

                        <div className='relative'>
                            <label className="label text-gray-100 font-semibold">Password</label>
                            <input type={showPass ? "text" : "password"}  {...register('password', {
                                required: true,
                                minLength: 6,
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

                            })} className="input w-full my-3 text-gray-500 font-medium" placeholder="Password" />
                            <button
                                type="button"
                                onClick={() => setShowPass(!showPass)}
                                className="absolute right-6 top-11 text-purple-600"
                            >
                                {showPass ? <FaEyeSlash /> : <FaEye />}
                            </button>
                            {errors.password?.type === "required" && (
                                <p role="alert">PassWord is required</p>
                            )}
                            {errors.password?.type === "minLength" && (
                                <p role="alert">PassWord must be 6 character or longer </p>
                            )}
                            {errors.password?.type === "pattern" && (
                                <p role="alert">password Must ar least one uppercase, at least one lowercase, at least one number, at least special characters </p>
                            )}
                        </div>
                        <div><a className="link link-hover font-semibold text-orange-600">Forgot password?</a></div>
                        <button className="btn-cusPrimary rounded-md py-3 ">Login</button>
                    </fieldset>
                </form>
                <SocialLogin />
                <p className='text-sm text-center'>Create a New account <NavLink className='text-blue-600 ' to='/register' state={location.state}> Register </NavLink>    </p>
            </div>

        </div>
    )
}

export default Login
