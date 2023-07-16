import { useState, useEffect, React } from 'react'
import './SignUp.css'
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signupRoute } from "../../utils/APIRoutes";

const SignUp = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const toastError = {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
            navigate("/");
        }
    }, []);

    const handleValidation = () => {
        const { password, confirmPassword, username, email } = values;
        if (password !== confirmPassword) {
            toast.error(
                "Password and confirm password should be same.",
                toastError
            );
            return false;
        } else if (password.length < 8) {
            toast.error(
                "Password needs to be 8 or more characters.",
                toastError
            );
            return false;
        } else if (email === "") {
            toast.error("Please enter a valid email.", toastError);
            return false;
        }

        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            const { email, username, password } = values;
            const { data } = await axios.post(signupRoute, {
                username,
                email,
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

        <div>
            <ToastContainer />
            <div className='signup' >
                <form className='signupform' onSubmit={handleSubmit}>
                    <div className='top'>
                        <h1>Sign Up</h1>
                        <p className='input'><input type="text" name="name" placeholder='Enter your name' onChange={handleChange} /></p>
                        <p className='input'><input type="email" name="email" placeholder='Enter your email' onChange={handleChange} /></p>
                        <p className='input'><input type="password" name="Passwword" placeholder='Enter password' onChange={handleChange} /></p>
                        <p className='input'><input type="password" name="confirmPasswword" placeholder='Confirm password' onChange={handleChange} /></p>
                        <button className="submit" type="submit" onClick={handleSubmit}>SUBMIT</button>

                    </div>
                    <span>
                        Already signed up? <Link to="/login">Click Here!</Link>
                    </span>
                </form>
            </div>
        </div>
    )
}

export default SignUp;
