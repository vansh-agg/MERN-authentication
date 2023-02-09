import React, { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginContext } from '../contextprovider/Context';
import { ToastContainer, toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import 'react-toastify/dist/ReactToastify.css';
const Home = () => {
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
        setTimeout(() => {
            dashboardvalid()
            setdata(true)
        }, 1000);

    }, [])
    return (
        <>
            {data ?
                (<div>Home</div>) : ((<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    Loading...
                    <CircularProgress />
                </Box>))
            }
        </>
    )
}

export default Home