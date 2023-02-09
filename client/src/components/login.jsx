import React, { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; import "./mix.css"
import { LoginContext } from './contextprovider/Context';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useEffect, useContext } from 'react';

const Login = () => {
    const [data, setdata] = useState(false)
    const history = useNavigate();
    const { logindata, setlogindata } = useContext(LoginContext)
    const dashboardvalid = async () => {
        let token = localStorage.getItem("usersdatatoken")
        const res = await fetch("/validuser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })
        const data = await res.json();
        if (data.status == 401 || !data) {
            history("/")

        }
        else {
            setlogindata(data)
            history("/dashboard")
        }
    }
    useEffect(() => {
        setTimeout(() => {
            dashboardvalid()
            setdata(true)
        }, 1000);

    }, [])

    const [passShow, setPassShow] = useState(false);

    const [inpval, setInpval] = useState({
        email: "",
        password: "",
    });

    const setVal = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target;

        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    };

    const loginuser = async (e) => {
        e.preventDefault();

        const { email, password } = inpval;

        if (email === "") {
            toast.error("email is required!", {
                position: "top-center"
            });
        } else if (!email.includes("@")) {
            toast.warning("Please include @ in your email!", {
                position: "top-center"
            });
        } else if (password === "") {
            toast.error("Password is required!", {
                position: "top-center"
            });
        } else if (password.length < 6) {
            toast.error("Password must be 6 char!", {
                position: "top-center"
            });
        } else {


            const data = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            });

            const res = await data.json();
            if (res.status === 201) {
                localStorage.setItem("usersdatatoken", res.result.token);
                history("/dashboard")
                setInpval({ ...inpval, email: "", password: "" });
            }
        }
    }


    return (
        <>
            {data ? (

                <section>
                    <div className="form_data">
                        <div className="form_heading">
                            <h1>Welcome Back, Log In</h1>
                        </div>

                        <form>
                            <div className="form_input">
                                <label htmlFor="email">Email</label>
                                <input type="email" value={inpval.email} onChange={setVal} name="email" id="email" placeholder='Enter Your Email Address' />
                            </div>
                            <div className="form_input">
                                <label htmlFor="password">Password</label>
                                <div className="two">
                                    <input type={!passShow ? "password" : "text"} value={inpval.password} onChange={(e) => {
                                        setVal(e)
                                    }} name="password" id="password" placeholder='Enter Your password' />
                                    <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                        {!passShow ? "Show" : "Hide"}
                                    </div>
                                </div>
                            </div>

                            <button className='btn' onClick={loginuser}>Login</button>
                            <p>Don't have an Account? <NavLink to="/register">Sign Up</NavLink> </p>
                        </form>
                        <ToastContainer />

                    </div>
                </section>) : (<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    Loading...
                    <CircularProgress />
                </Box>)

            }
        </>
    )
}

export default Login