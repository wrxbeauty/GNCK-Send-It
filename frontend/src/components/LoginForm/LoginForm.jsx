import  { useState, React }  from 'react';
import { Link } from 'react-router-dom';
import './LoginForm.css'

const LoginForm = () => {
    const [userName, setUserName] = useState()
    const [password, setPassword] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()
        postMessage('', {userName, password})
    }

    return <div className='login'>
        <form className='loginform' onSubmit={handleSubmit}>
            <div className='top'>
                <h1>Please Sign In</h1>
                <p className='username'><input type="text" placeholder='Enter username' onChange={(e) => setUserName(e.target.value)} /></p>
                <p className='password'><input type="password" placeholder='Enter password' onChange={(e) => setPassword(e.target.value)} /></p>
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