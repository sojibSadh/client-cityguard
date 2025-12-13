import React, { useContext } from 'react'
import { useForm } from "react-hook-form"
import useAuth from '../../../hooks/useAuth';
import SocialLogin from '../SocialLogin/SocialLogin';
import { NavLink, useLocation, useNavigate } from 'react-router';


function Login() {
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location);
    const { signInUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleLogin = (data) => {

        signInUser(data.email, data.password)
            .then(res => {
                console.log(res.user);
                navigate(location.state || "/")
            })
            .catch(err => {
                console.log(err)
            })
    }




    return (
        <div>
            <form className='w-full' onSubmit={handleSubmit(handleLogin)}>
                <fieldset className="fieldset">
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
                    <button className="btn-primary  py-3 ">Login</button>
                </fieldset>
                <p className='text-center'>Create a New account <NavLink className='text-blue-600 '  to='/register' state={location.state}> Register </NavLink>    </p>
            </form>
            <SocialLogin />
        </div>
    )
}

export default Login
