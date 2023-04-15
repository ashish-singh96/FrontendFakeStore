import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { backendUrl } from "../env";
import axios from "axios";
import { toast } from "react-toastify";
const SignUp = () => {
    const history = useHistory();
    const [userDetails, setUserDetails] = useState({
        username: '',
        phone: '',
        email: '',
        password: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserDetails({ ...userDetails, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (userDetails.username && userDetails.phone && userDetails.email && userDetails.password) {
            await axios.post(`${backendUrl}/createUser`, userDetails)
                .then(res => {
                    if (res.status === 200) {
                        toast.success('User Register Successfully', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        });
                        history.push('/login');
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

                }).catch((err) => {
                    toast.error('Something Went Wrong', {
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
        }
    }

    return (
        <div className="signup">
            <div className="myForm">
                <form>
                    <div className="form-group">
                        <label >Username</label>
                        <input type="text" name="username" className="form-control" onChange={(event) => handleChange(event)} placeholder="Enter Username" />
                    </div>

                    <div className="form-group">
                        <label >Phone</label>
                        <input type="text" name="phone" className="form-control" onChange={(event) => handleChange(event)} placeholder="Enter Phone" />
                    </div>

                    <div className="form-group">
                        <label >Email address</label>
                        <input type="email" name="email" className="form-control" onChange={(event) => handleChange(event)} aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>

                    <div className="form-group">
                        <label >Password</label>
                        <input type="password" name="password" className="form-control" onChange={(event) => handleChange(event)} id="exampleInputPassword1" placeholder="Enter Password" />
                    </div>

                    <button onClick={(e) => handleSubmit(e)} className="btn btn-primary">SignUP</button>
                    <p><Link to={'/login'} > already have an account?</Link></p>
                </form>
            </div>
        </div>
    )
}

export default SignUp;