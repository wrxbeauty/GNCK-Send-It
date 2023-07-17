// State our dependencies.

import { useState, React } from 'react'
import './SignUp.css'
import axios from 'axios';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import { signupRoute } from "../../utilities/APIRoutes";

const SignUp = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [password, setPassword] = useState();
  
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

    const handleSubmit = async () => {
        
        if (!name || !email || !password || !confirmpassword) {
          toast.error("Please fill in all fields");
          
          return;
        }
        if (password !== confirmpassword) {
            toast.error("Passwords don't match", toastError);
          return;
        }
        console.log(name, email, password);
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
          const { data } = await axios.post(
            "/api/user",
            {
              name,
              email,
              password,
            },
            config
          );
          console.log(data);
          toast.success("Connection successful!", toastError);
          localStorage.setItem("userInfo", JSON.stringify(data));
          //history.push("/chats");
        } catch (error) {
            toast.error("Error occured", toastError);          
        }
      };
    
      

    return (

        <div>
            <ToastContainer />
            <div className='signup' >
                <form className='signupform' onSubmit={handleSubmit}>
                    <div className='top'>
                        <h1>Sign Up</h1>
                        <p className='input'><input type="text" name="username" placeholder='Enter your name' onChange={(e) => setName(e.target.value)} /></p>
                        <p className='input'><input type="email" name="email" placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} /></p>
                        <p className='input'><input type="password" name="passwword" placeholder='Enter password' onChange={(e) => setPassword(e.target.value)}/></p>
                        <p className='input'><input type="password" name="confirmPasswword" placeholder='Confirm password' onChange={(e) => setConfirmpassword(e.target.value)} /></p>
                        <button className="submit" type="submit" onClick={handleSubmit}>SIGN UP!!</button>

                    </div>
                    <p>
                        Already signed up? <Link to="/login">Click Here!</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default SignUp;




    // const [values, setValues] = useState({
    //     username: "",
    //     email: "",
    //     password: "",
    //     confirmPassword: "",
    // })

    

    // useEffect(() => {
    //     if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
    //         navigate("/");
    //     }
    // }, []);


    // const handleChange = (e) => {
    //     setValues({ ...values, [e.target.name]: e.target.value });
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     if (handleValidation()) {
    //         const { email, username, password } = values;
    //         const { data } = await axios.post(signupRoute, {
    //             username,
    //             email,
    //             password,
    //         });

    //         if (data.status === false) {
    //             toast.error(data.message, toastError);
    //         } else if (data.status === true) {
    //             localStorage.setItem(
    //                 process.env.REACT_APP_LOCALHOST_KEY,
    //                 JSON.stringify(data.user)
    //             );
    //             navigate("/");
    //         }
    //     }
    // };

    // const handleValidation = () => {
    //     const { password, confirmPassword, username, email } = values;
    //     if (password !== confirmPassword) {
    //         toast.error("Password and confirm password should be same.", toastError);
    //         return false;
    //     } else if (username === "") {
    //         toast.error("Please enter a username.", toastError)
    //     } else if (password.length < 8) {
    //         toast.error("Password needs to be 8 or more characters.", toastError);
    //         return false;
    //     } else if (email === "") {
    //         toast.error("Please enter a valid email.", toastError);
    //         return false;
    //     } else {
    //         return true;
    //     }
    // };