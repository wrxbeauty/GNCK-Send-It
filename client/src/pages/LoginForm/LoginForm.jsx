import { useState, useEffect, React } from 'react';
import { Link, useNavigate, BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './LoginForm.css'
import { loginRoute } from "../../utils/APIRoutes";

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

      const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const validateForm = () => {
        const { username, password } = values;
        if (username === "") {
          toast.error("Email and Password is required.", toastError);
          return false;
        } else if (password === "") {
          toast.error("Email and Password is required.", toastError);
          return false;
        }
        return true;
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
          const { username, password } = values;
          const { data } = await axios.post(loginRoute, {
            username,
            password,
          });
          if (data.status === false) {
            toast.error(data.msg, toastError);
          }
          if (data.status === true) {
            localStorage.setItem(
              process.env.REACT_APP_LOCALHOST_KEY,
              JSON.stringify(data.user)
            );
    
            navigate("/");
          }
        }
      };
    

    return (
        
    <div className='login'>
        <ToastContainer />
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
    )
}
export default LoginForm;