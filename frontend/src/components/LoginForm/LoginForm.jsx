import React from 'react';
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
            <div className='bottom'>
                <input type="button" value="Sign up for a FREE account!" />
            </div>
        </form>
    </div>
}

export default LoginForm;