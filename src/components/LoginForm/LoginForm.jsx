import React from 'react';
import './LoginForm.css'

const LoginForm = (props) => {
    return <div className='login'>
        <form className='loginform'>
            <div className='top'>
                <h1>Login</h1>
                <p className='username'><input type="text" placeholder='Enter username' /></p>
                <p className='password'><input type="password" placeholder='Enter password' /></p>
                <input className="submit" type="submit" value="Log In"/>
            </div>
            <div className='bottom'>
                <input type="button" value="Sign up for a FREE account!" />
            </div>
        </form>
    </div>
}

export default LoginForm;