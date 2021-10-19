import React, { useEffect, useState, useContext } from 'react';
import "../Styles/Navbar.css"
import logo from "../Image/travel.png"
import { Link } from 'react-router-dom'
import { UserContext } from '../App';


const Navbar = () => {


     const token = localStorage.getItem("token");


    

    return (
        <div className="navbar" >
            <img className="travlogo" src={logo} alt="" />

            <h2>TravFlight</h2>

            <div className="register-btn" style={{ position: "absolute", right: "0", marginRight: "1rem" }}>
            {token? 
                <>          
                    <Link to = "/userhistory"><button>Previous Flights</button></Link>
                    <Link to="/logout"><button>LogOut</button></Link>
                 </>
                :
                <>
                        <Link to="/register"><button>Register</button></Link>
                        <Link to="/login"><button>Login</button></Link>
                </>

            }           

            </div>

        </div>
    )
}

export default Navbar
