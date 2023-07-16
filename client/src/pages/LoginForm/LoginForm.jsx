import { useState, React } from 'react';
import { Link, BrowserRouter } from 'react-router-dom';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './LoginForm.css'

const LoginForm = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({ username: "", password: "" });
    const toastError = {
        position: "top-center",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    }
    
    useEffect(() => {
        if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
          navigate("/");
        }
      }, [])
      
    const handleChange = ({currentTarget: input}) => {
        setData({...data, [input.name]: input.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = "https://localhost:3005/api/auth";
            const { data:res } = await axios.get(url, data);
            localStorage.setItem("token", res.data);
            console.log(res.message)
        } catch(error) {
            console.error(error)
        }
    }

    return <div className='login'>
        <form className='loginform' onSubmit={handleSubmit}>
            <div className='top'>
                <h1>Please Sign In</h1>
                <p className='username'><input type="email" placeholder='Enter email' onChange={handleChange} required /></p>
                <p className='password'><input type="password" placeholder='Enter password' onChange={handleChange} required /></p>
                <button className="submit" type="submit" onClick={handleSubmit}>Login</button>
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