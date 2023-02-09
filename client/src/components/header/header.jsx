import React, { useContext } from 'react'
import { LoginContext } from '../contextprovider/Context'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
const Header = () => {
    const history = useNavigate()
    const { logindata, setlogindata } = useContext(LoginContext)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logoutuser = async () => {
        let token = localStorage.getItem("usersdatatoken")
        const res = await fetch("/logout", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
                "Accept": "application/json"
            },
            credentials: "include"
        })
        const data = await res.json();
        if (data.status == 201) {
            localStorage.removeItem("usersdatatoken")
            setlogindata(false)
            history("/")

        }
        else {
            console.log("error");

        }
    }
    return (
        <>
            <div className='avtar'>
                {logindata.ValidUserOne ? <Avatar style={{ backgroundColor: "blue" }} onClick={handleClick}>{logindata.ValidUserOne.fname[0].toUpperCase()}</Avatar>
                    : <Avatar style={{ backgroundColor: "blue" }} onClick={handleClick} />
                }
            </div>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                {logindata.ValidUserOne ? (<MenuItem onClick={() => {
                    logoutuser()
                    handleClose()
                }}
                >Logout</MenuItem>)
                    : (<><MenuItem onClick={handleClose}>Login</MenuItem>
                        <MenuItem onClick={handleClose}>Register</MenuItem></>
                    )
                }

            </Menu>
        </>
    )
}

export default Header