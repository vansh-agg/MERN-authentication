import React, { useContext, useState } from "react";
import { MenuItems } from "./MenuItems";
import "./Navbar.css";
import { FaBars } from "react-icons/fa"
import { ImCross } from "react-icons/im"
import { LoginContext } from '../contextprovider/Context'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [clicked, setclicked] = useState(false)
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
  const loginroute = () => {
    history("/")
  }
  const regroute = () => {
    history("/register")
  }

  const handlemenu = () => {
    setclicked(!clicked)
  };

  return (
    <nav className="navbarItems">
      <h1 className="navbar-logo">
        React
      </h1>
      <div className="menu-icon" onClick={handlemenu}>
        {clicked ? <ImCross /> : <FaBars />}

      </div>
      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        {MenuItems.map((item, index) => (
          <li key={index}>
            <a href={item.url} className={item.cName}>
              {item.title}
            </a>
          </li>
        ))}
      </ul>
      <li className='avtar'>
        {logindata.ValidUserOne ? <Avatar style={{ backgroundColor: "black" }} onClick={handleClick}>{logindata.ValidUserOne.fname[0].toUpperCase()}</Avatar>
          : <Avatar style={{ backgroundColor: "black" }} onClick={handleClick} />
        }
      </li>
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
          : (<><MenuItem onClick={() => {
            loginroute()
            handleClose()
          }}>Login</MenuItem>
            <MenuItem onClick={() => {
              regroute()
              handleClose()
            }}>Register</MenuItem></>
          )
        }

      </Menu>


    </nav>
  );

}

export default Navbar;
