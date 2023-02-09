import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginContext } from '../contextprovider/Context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Home = () => {
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
            toast.error("Login first!", {
                position: "top-center"
            })
            history("/")

        }
        else {
            setlogindata(data)
            history("/home")
        }
    }
    useEffect(() => {
        dashboardvalid()
    }, [])
    return (
        <div>Home</div>
    )
}

export default Home