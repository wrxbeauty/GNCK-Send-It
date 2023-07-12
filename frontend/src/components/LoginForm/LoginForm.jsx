import React from 'react';
import { Link } from 'react-router-dom';
import './LoginForm.css'

const LoginForm = () => {
    return <div className='login'>
        <form className='loginform'>
            <div className='top'>
                <h1>Please Sign In</h1>
                <p className='username'><input type="text" placeholder='Enter username' /></p>
                <p className='password'><input type="password" placeholder='Enter password' /></p>
                <input className="submit" type="submit" value="Login" />
                <p><a href="" className='forgot'>Forgot Password</a></p>
            </div>
            </form>
            <div className='bottom'>
                <Link to='/SignUp' className='button'>
                    <p>Sign up for a FREE account!</p>
                </Link>
            </div>
        
    </div>
}

export default LoginForm;