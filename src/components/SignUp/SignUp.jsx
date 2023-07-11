import React from 'react'

const SignUp = () => {
    return (
        <div>
            return <div className='signup'>
                <form className='signupform'>
                    <div className='top'>
                        <h1>Sign Up</h1>
                        <p className='firstname'><input type="text" placeholder='Enter your first name' /></p>
                        <p className='lastname'><input type="text" placeholder='Enter your last name' /></p>
                        <p className='email'><input type="text" placeholder='Enter your email' /></p>
                        <p className='password'><input type="password" placeholder='Enter password' /></p>
                        <p className='password'><input type="text" placeholder='Confirm password' /></p>
                        <input className="submit" type="submit" value="Enter" />

                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp;
