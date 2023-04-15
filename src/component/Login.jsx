import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { backendUrl } from "../env";
import { toast } from "react-toastify";

const Login = (props) => {

    const history = useHistory();
    const [loginDetails, setLoginDetails] = useState({
        email: '',
        password: ''

    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLoginDetails({ ...loginDetails, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log(loginDetails);

        if (loginDetails.email && loginDetails.password) {
            await axios.post(`${backendUrl}/getUser`, loginDetails)
                .then((res) => {
                    if (res.status === 200) {
                        localStorage.setItem("username", loginDetails.email);
                        props.setUser(loginDetails.email);
                        history.push('/');
                    } else {
                        toast.error(res.data.msg, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        });
                    }
                }).catch((err)=>{
                    toast.error("something went wrong", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                })
        } else {
            alert("Please fill all details");
        }
    }

    return (
        <div className="signup">
            <div className="myForm">
                <div className="form-group">
                    <label >Email</label>
                    <input type="text" name="email" className="form-control" onChange={event => handleChange(event)} placeholder="Enter Username" />
                </div>

                <div className="form-group">
                    <label >Password</label>
                    <input type="password" name="password" className="form-control" id="exampleInputPassword1" onChange={event => handleChange(event)} placeholder="Enter Password" />
                </div>

                <button onClick={event => handleSubmit(event)} className="btn btn-primary">Login</button>
                <p><Link to='/signUp' >new user registration?</Link></p>
            </div>
        </div>
    )
}

export default Login;