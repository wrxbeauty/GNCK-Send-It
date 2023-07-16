import { useState, React } from 'react'
import './SignUp.css'
import axios from 'axios';

const SignUp = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    })

    const handleChange = ({currentTarget: input}) => {
        setData({...data, [input.name]: input.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = "https://localhost:3005/api/users";
            const { data:res } = await axios.post(url, data);
            console.log(res.message)
        } catch(error) {
            console.error(error)
        }
    }

    return (
        <div>
            <div className='signup' >
                <form className='signupform' onSubmit={handleSubmit}>
                    <div className='top'>
                        <h1>Sign Up</h1>
                        <p className='input'><input type="text" name="name" value={data.name} placeholder='Enter your name'  onChange={handleChange} /></p>
                        <p className='input'><input type="email" name="email" placeholder='Enter your email' value={data.email} onChange={handleChange} /></p>
                        <p className='input'><input type="password" name="paswword" placeholder='Enter password' value={data.password} onChange={handleChange} /></p>
                        <button className="submit" type="submit" onClick={handleSubmit}>SUBMIT</button>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp;
